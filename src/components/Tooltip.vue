<script setup>
import { ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
import { calculatePosition, getAbsParent } from "@svar-ui/lib-dom";
import Portal from "./Portal.vue";

defineOptions({ name: "CoreTooltip" });

const props = defineProps({
  at: { default: "top-center" },
  arrow: { default: false },
  touch: { default: false },
  overflow: { default: false },
  delay: { default: 300 },
  content: { default: null },
  resolver: { type: Function, default: null },
  css: { default: "" },
});

const side = computed(() => getSide(props.at));
const align = computed(() => getAlign(props.at));
const resolvedAt = computed(() => {
  if (props.at === "point") return "point";
  return `${side.value}-${align.value}`;
});

const areaNode = ref(null);
let isHovered = false;
const tooltipNode = ref(null);
const match = ref(null); // { result, anchor, mouseX, mouseY }
const position = ref(null); // { x, y, z, side, arrowOffset }
const firstAnchor = ref(false);

// render only when there is displayable content
const shouldRender = computed(
  () => match.value !== null && (!!match.value.result || props.content != null)
);

function getSide(at) {
  if (at === "point") return "point";
  const split = at.split("-");
  return split[0];
}

function getAlign(at) {
  if (at === "point") return "center";
  const split = at.split("-");
  return split.length === 1 ? "center" : split[1];
}

function readCSSPropertyInt(node, property, defaultValue) {
  const value = getComputedStyle(node).getPropertyValue(property);
  return parseInt(value) || defaultValue;
}

function getPointOffset() {
  return readCSSPropertyInt(tooltipNode.value, "--wx-tooltip-point-offset", 14);
}

function getArrowSize() {
  return readCSSPropertyInt(tooltipNode.value, "--wx-tooltip-arrow-size", 6);
}

// Compute the CSS arrow offset relative to the anchor
function getArrowOffset(arrowSize, result, rect, body) {
  if (side.value === "point") return "50%";
  const bodyRect = body?.getBoundingClientRect() ?? { top: 0, left: 0 };
  const h = arrowSize / 2;

  let anchorPoint;
  let tooltipEdge;
  if (side.value === "top" || side.value === "bottom") {
    tooltipEdge = result.x - (body?.scrollLeft ?? 0) + bodyRect.left;
    if (align.value === "start") anchorPoint = rect.left + arrowSize + h;
    else if (align.value === "end") anchorPoint = rect.right - arrowSize - h;
    else anchorPoint = rect.left + rect.width / 2;
  } else {
    tooltipEdge = result.y - (body?.scrollTop ?? 0) + bodyRect.top;
    if (align.value === "start") anchorPoint = rect.top + arrowSize + h;
    else if (align.value === "end") anchorPoint = rect.bottom - arrowSize - h;
    else anchorPoint = rect.top + rect.height / 2;
  }

  return `${anchorPoint - tooltipEdge}px`;
}

// Positioning of the tooltip
watchEffect(() => {
  if (!tooltipNode.value || !match.value) {
    position.value = null;
    return;
  }

  // Offset from the mouse cursor when at="point"
  const offset = props.at === "point" ? getPointOffset() : 0;

  // Calculate the position of the tooltip
  const result = calculatePosition(
    tooltipNode.value,
    match.value.anchor,
    resolvedAt.value,
    match.value.mouseX + offset,
    match.value.mouseY + offset
  );

  if (result === null) {
    position.value = null;
    return;
  }

  // Detect if calculatePosition flipped to the opposite side
  const anchorRect = match.value.anchor.getBoundingClientRect();
  const body = getAbsParent(tooltipNode.value);
  const realSide = getSide(result.at);

  // Add gap for the arrow if needed, using realSide for direction
  let arrowOffset = "50%";
  if (result && props.arrow && props.at !== "point") {
    const arrowSize = getArrowSize();
    if (realSide === "top") result.y -= arrowSize;
    else if (realSide === "bottom") result.y += arrowSize;
    else if (realSide === "left") result.x -= arrowSize;
    else if (realSide === "right") result.x += arrowSize;
    arrowOffset = getArrowOffset(arrowSize, result, anchorRect, body);
  }

  // Submit the result to the position state
  const minZ = readCSSPropertyInt(
    tooltipNode.value,
    "--wx-tooltip-z-index",
    1002
  );

  position.value = {
    x: Math.round(result.x),
    y: Math.round(result.y),
    z: Math.max(result.z, minZ),
    side: realSide,
    arrowOffset,
  };
});

function defaultResolver(element) {
  if (props.overflow && element.scrollWidth <= element.clientWidth) return null;
  const text = element.getAttribute?.("data-tooltip-text");
  return text ? text : null;
}

function resolve(node, ev) {
  const fn = props.resolver || defaultResolver;
  return fn(node, ev);
}

function walk(node, ev) {
  if (!isHovered) return null;

  // Disable tooltip on touch devices if prop touch == false
  const touchD = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (touchD && !props.touch) return null;

  for (; node && node !== areaNode.value; node = node.parentNode) {
    if (node.nodeType !== Node.ELEMENT_NODE) continue;

    const result = resolve(node, ev);
    if (result == null) continue;

    return {
      result,
      anchor: node,
      mouseX: ev.clientX,
      mouseY: ev.clientY,
    };
  }

  return null;
}

let timer;
let hiding = false;
function debounce(fn, ...args) {
  clearTimeout(timer);
  timer = setTimeout(fn, props.delay, ...args);
}

function onmousemove(ev) {
  // (1) Ignore if the most closely hovered tooltip area is not this one (in case of nested tooltips)
  if (ev.target.closest(".wx-tooltip-area") !== areaNode.value) {
    isHovered = false;
    match.value = null;
    clearTimeout(timer);
    return;
  }
  isHovered = true;

  // (2) If the cursor is still within the anchor element
  if (match.value?.anchor?.contains(ev.target)) {
    clearTimeout(timer);
    hiding = false;
    const result = resolve(ev.target, ev);
    if (result != null) {
      match.value = {
        result,
        anchor: ev.target,
        mouseX: ev.clientX,
        mouseY: ev.clientY,
      };
      return;
    }
  }

  // (3) Cursor left the anchor - walk for a new anchor
  if (match.value !== null) {
    const result = walk(ev.target, ev);
    if (!result) {
      if (!hiding) {
        hiding = true;
        debounce(() => {
          hiding = false;
          match.value = null;
        });
      }
    } else {
      clearTimeout(timer);
      hiding = false;
      match.value = result;
      firstAnchor.value = false;
    }
  } else {
    debounce(() => {
      match.value = walk(ev.target, ev);
      firstAnchor.value = true;
    });
  }
}

function onmouseleave() {
  debounce(() => {
    hiding = false;
    isHovered = false;
    match.value = null;
  });
}

function onscroll() {
  clearTimeout(timer);
  match.value = null;
}

onMounted(() => {
  window.addEventListener("scroll", onscroll, {
    capture: true,
    passive: true,
  });
});

onUnmounted(() => {
  clearTimeout(timer);
  window.removeEventListener("scroll", onscroll, { capture: true });
});
</script>

<template>
  <div
    ref="areaNode"
    class="wx-tooltip-area"
    role="none"
    :onmousemove="onmousemove"
    :onmouseleave="onmouseleave"
  >
    <Portal v-if="shouldRender">
      <div
        :class="[
          'wx-tooltip',
          css,
          {
            'wx-arrow-top': arrow && position?.side === 'top',
            'wx-arrow-bottom': arrow && position?.side === 'bottom',
            'wx-arrow-left': arrow && position?.side === 'left',
            'wx-arrow-right': arrow && position?.side === 'right',
            'wx-tooltip-transition': !firstAnchor,
          },
        ]"
        role="tooltip"
        ref="tooltipNode"
        :style="{
          translate: `${position?.x ?? 0}px ${position?.y ?? 0}px`,
          zIndex: position?.z ?? 20,
          visibility: !position ? 'hidden' : undefined,
          '--wx-arrow-offset': position?.arrowOffset ?? '50%',
        }"
      >
        <div class="wx-tooltip-wrapper">
          <div class="wx-tooltip-inner">
            <template v-if="typeof match.result === 'string'">
              <component
                v-if="props.content"
                :is="props.content"
                :data="match.result"
              />
              <div v-else class="wx-tooltip-text">
                {{ match.result }}
              </div>
            </template>
            <component
              v-else-if="props.content"
              :is="props.content"
              v-bind="match.result"
            />
            <div v-else class="wx-tooltip-text">
              {{ match.result?.data }}
            </div>
          </div>
        </div>
      </div>
    </Portal>

    <slot />
  </div>
</template>

<style scoped>
.wx-tooltip-area {
  position: relative;
  height: 100%;
  width: 100%;
}

.wx-tooltip {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid var(--wx-tooltip-border, transparent);
  border-radius: var(--wx-border-radius);
  background-color: var(--wx-tooltip-background);
  color: var(--wx-tooltip-font-color);
  animation: wx-tooltip-appear 100ms ease-out;
}

.wx-tooltip-transition {
  transition: translate 50ms ease;
}

@keyframes wx-tooltip-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.wx-tooltip-inner {
  border-radius: var(--wx-border-radius);
  overflow: hidden;
}

.wx-tooltip-text {
  padding: var(--wx-tooltip-padding);
  font: var(--wx-tooltip-font);
  color: var(--wx-tooltip-font-color);
}

.wx-tooltip.wx-arrow-top::before,
.wx-tooltip.wx-arrow-bottom::before,
.wx-tooltip.wx-arrow-left::before,
.wx-tooltip.wx-arrow-right::before {
  content: "";
  position: absolute;
  border: var(--wx-tooltip-arrow-size, 6px) solid transparent;
}

.wx-tooltip.wx-arrow-top::before {
  top: 100%;
  left: var(--wx-arrow-offset, 50%);
  transform: translateX(-50%);
  border-top-color: var(--wx-tooltip-background);
  filter: drop-shadow(0 1px 0 var(--wx-tooltip-border, transparent));
}

.wx-tooltip.wx-arrow-bottom::before {
  bottom: 100%;
  left: var(--wx-arrow-offset, 50%);
  transform: translateX(-50%);
  border-bottom-color: var(--wx-tooltip-background);
  filter: drop-shadow(0 -1px 0 var(--wx-tooltip-border, transparent));
}

.wx-tooltip.wx-arrow-left::before {
  top: var(--wx-arrow-offset, 50%);
  left: 100%;
  transform: translateY(-50%);
  border-left-color: var(--wx-tooltip-background);
  filter: drop-shadow(1px 0 0 var(--wx-tooltip-border, transparent));
}

.wx-tooltip.wx-arrow-right::before {
  top: var(--wx-arrow-offset, 50%);
  right: 100%;
  transform: translateY(-50%);
  border-right-color: var(--wx-tooltip-background);
  filter: drop-shadow(-1px 0 0 var(--wx-tooltip-border, transparent));
}
</style>
