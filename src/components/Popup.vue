<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { clickOutside, calculatePosition, getAbsParent } from '@svar-ui/lib-dom'
import { asDirective } from '@svar-ui/lib-vue'

defineOptions({ name: 'CorePopup' })

const props = defineProps({
  left: { default: 0 },
  top: { default: 0 },
  at: { default: 'bottom' },
  parent: { default: null },
  width: { default: 'auto' },
  css: { default: '' },
  oncancel: { type: Function },
  trackScroll: { default: false },
})

const vClickOutside = asDirective(clickOutside)
const self = ref(null)
const x = ref(0)
const y = ref(0)
const w = ref('auto')
let portal
let resizeObserver

function getWidth(calcWidth) {
  if (props.parent && (props.width + '').indexOf('%') > -1) {
    return props.width.replace(/(\d+)%/, (match, value) => {
      value = (value * props.parent.offsetWidth) / 100 + 'px'
      return props.width.replace(match, value)
    })
  }
  return props.width && props.width !== 'auto' ? props.width : calcWidth
}

function updatePosition() {
  if (!self.value) return
  const result = calculatePosition(self.value, props.parent, props.at, props.left, props.top)
  if (result) {
    x.value = result.x
    y.value = result.y
    w.value = getWidth(result.width)
  }
}

function onScroll(e) {
  if (props.oncancel && e.target !== portal && self.value && !self.value.contains(e.target))
    props.oncancel(e)
}

onMounted(() => {
  requestAnimationFrame(() => {
    updatePosition()
    if (props.trackScroll) {
      portal = getAbsParent(self.value)
      if (portal) portal.addEventListener('scroll', onScroll, true)
    }
    if (props.parent) {
      resizeObserver = new ResizeObserver(updatePosition)
      resizeObserver.observe(props.parent)
    }
  })
})

onUnmounted(() => {
  if (props.trackScroll && portal)
    portal.removeEventListener('scroll', onScroll, true)
  if (resizeObserver) resizeObserver.disconnect()
})

watchEffect(() => {
  updatePosition()
})

function down(e) {
  if (props.oncancel) props.oncancel(e)
}
</script>

<template>
  <div
    v-click-outside="{ callback: down, parent: () => props.parent }"
    ref="self"
    :class="['wx-popup', css]"
    :style="{ position: 'absolute', top: y + 'px', left: x + 'px', width: w }"
  >
    <slot />
  </div>
</template>


<style scoped>

	.wx-popup {
		z-index: var(--wx-popup-z-index);
		background: var(--wx-popup-background);
		box-shadow: var(--wx-popup-shadow);
		border: var(--wx-popup-border);
		border-radius: var(--wx-popup-border-radius);
		overflow: hidden;
	}

</style>
