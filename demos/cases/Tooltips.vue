<script setup>
defineOptions({ name: "CoreCasesTooltips" });
import { ref, computed } from "vue";
import {
  Button,
  Checkbox,
  Combo,
  Field,
  Icon,
  Modal,
  Segmented,
  Slider,
  Tooltip,
} from "../../src";
import MyTooltipContent from "../custom/MyTooltipContent.vue";
import { users } from "../data/userlist";

const SEGMENTED_SIDE_OPTIONS = [
  { id: "point", label: "Point" },
  { id: "top", label: "Top" },
  { id: "bottom", label: "Bottom" },
  { id: "left", label: "Left" },
  { id: "right", label: "Right" },
];

const SEGMENTED_ALIGN_OPTIONS = [
  { id: "start", label: "Start" },
  { id: "center", label: "Center" },
  { id: "end", label: "End" },
];

function getAt(side, align) {
  if (side === "point") return "point";
  return `${side}-${align}`;
}

const side = ref("point");
const align = ref("center");
const at = computed(() => getAt(side.value, align.value));
const arrow = ref(true);
const touch = ref(false);
const overflow = ref(false);
const delay = ref(200);
const isModalOpen = ref(false);

const resolver = element =>
  element.matches(".grid > div")
    ? {
        x: Number(element.dataset.x),
        y: Number(element.dataset.y),
        value: Number(element.textContent),
      }
    : null;
</script>

<template>
  <div class="demo-box properties">
    <h3>Tooltip Properties</h3>
    <Field label="Side">
      <Segmented v-model:value="side" :options="SEGMENTED_SIDE_OPTIONS" />
    </Field>
    <Field label="Align">
      <Segmented v-model:value="align" :options="SEGMENTED_ALIGN_OPTIONS" />
    </Field>
    <Field label="Delay">
      <Slider
        v-model:value="delay"
        :min="0"
        :max="500"
        :step="25"
        :label="`${delay} ms`"
      />
    </Field>
    <div style="display: flex; align-items: center; gap: 16px;">
      <Checkbox v-model:value="arrow" label="Arrow" />
      <Checkbox v-model:value="touch" label="Enable on Touch Devices" />
      <Checkbox v-model:value="overflow" label="Overflow Only" />
    </div>
  </div>

  <div class="demo-box">
    <h3>Tooltip Area</h3>
    <Tooltip :at="at" :arrow="arrow" :delay="delay" :touch="touch" :overflow="overflow">
      <div class="item margin" data-tooltip-text="This is a tooltip!">
        Hover to see the tooltip
      </div>
    </Tooltip>
  </div>

  <div class="demo-box">
    <h3>Controls with Tooltip</h3>
    <Tooltip :at="at" :arrow="arrow" :delay="delay" :touch="touch" :overflow="overflow">
      <div class="controls">
        <div>
          <Button type="primary" tooltip="I am a button">Button</Button>
          <Icon css="wxi-star" tooltip="I am an icon" />
        </div>
        <Combo tooltip="I am a combo box" :options="users" :value="87" />
        <Button
          css="button-overflow"
          tooltip="With overflow=true, this is the only visible tooltip in this section"
          >
Overflowing text in button
</Button>
      </div>
    </Tooltip>
  </div>

  <div class="demo-box">
    <h3>Tooltips in Modals</h3>
    <Button :onclick="() => (isModalOpen = true)">Open Modal</Button>
    <Modal v-if="isModalOpen" :buttons="['ok']" :onconfirm="() => (isModalOpen = false)">
      <div class="modal-content">
        <h3>Modal Content</h3>
        <p>This is a modal with a tooltip.</p>
        <Tooltip :at="at" :arrow="arrow" :delay="delay" :touch="touch" :overflow="overflow">
          <div
            class="item"
            data-tooltip-text="This is a tooltip inside a modal!"
          >
            Hover to see the tooltip
          </div>
        </Tooltip>
      </div>
    </Modal>
  </div>

  <div class="demo-box">
    <h3>Custom Tooltip Content and Resolver</h3>
    <Tooltip
      :at="at"
      :arrow="arrow"
      :touch="touch"
      :delay="delay"
      :overflow="overflow"
      :content="MyTooltipContent"
      :resolver="resolver"
    >
      <div class="grid">
        <div data-x="0" data-y="0">10</div>
        <div data-x="1" data-y="0">20</div>
        <div data-x="2" data-y="0">30</div>
        <div data-x="0" data-y="1">40</div>
        <div data-x="1" data-y="1">50</div>
        <div data-x="2" data-y="1">60</div>
        <div data-x="0" data-y="2">70</div>
        <div data-x="1" data-y="2">80</div>
        <div data-x="2" data-y="2">90</div>
      </div>
    </Tooltip>
  </div>

  <div class="demo-box">
    <h3>Nested Tooltips</h3>
    <Tooltip at="top-center" :arrow="true">
      <div class="item" data-tooltip-text="Outer Tooltip">
        <div style="margin-bottom: 20px;">Outer Tooltip</div>
        <Tooltip at="right-center" :arrow="true">
          <div
            class="item"
            style="margin: 0;"
            data-tooltip-text="Inner Tooltip"
          >
            Inner Tooltip
          </div>
        </Tooltip>
      </div>
    </Tooltip>
  </div>
</template>

<style scoped>
.item {
  border: var(--wx-border);
  text-align: center;
  margin: 20px 0px 20px;
  padding: 20px 40px;
  white-space: nowrap;
  width: max-content;

  &.margin {
    margin-left: 130px;
  }
}

.properties {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
}

.controls {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: start;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: max-content;
  cursor: default;

  div {
    border: var(--wx-border);
    padding: 10px;
    text-align: center;
  }
}

:global(.button-overflow) {
  width: 150px;
}
</style>
