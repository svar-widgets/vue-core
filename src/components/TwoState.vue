<script setup>
import { computed, useSlots } from 'vue'
import Button from './Button.vue'

defineOptions({ name: 'CoreTwoState', inheritAttrs: false })

const props = defineProps({
  type: { default: '' },
  icon: { default: '' },
  disabled: { default: false },
  iconActive: { default: '' },
  onclick: {},
  title: { default: '' },
  css: { default: '' },
  text: { default: '' },
  textActive: { default: '' },
  onchange: {}
})

const slots = useSlots()

const value = defineModel("value", { default: false });

const typeStr = computed(
  () => (value.value ? 'pressed' : '') + (props.type ? ' ' + props.type : '')
)

function handleClick(ev) {
  const next = !value.value
  if (props.onclick) props.onclick(ev)
  if (!ev.defaultPrevented) {
    value.value = next
    props.onchange && props.onchange({ value: value.value })
  }
}
</script>

<template>
  <Button
    v-if="value && $slots.active"
    :title="props.title"
    :text="(value && props.textActive) || props.text"
    :css="props.css"
    :type="typeStr"
    :icon="(value && props.iconActive) || props.icon"
    :onclick="handleClick"
    :disabled="props.disabled"
  >
    <slot name="active" />
  </Button>
  <Button
    v-else-if="$slots.default"
    :title="props.title"
    :text="(value && props.textActive) || props.text"
    :css="props.css"
    :type="typeStr"
    :icon="(value && props.iconActive) || props.icon"
    :onclick="handleClick"
    :disabled="props.disabled"
  >
    <slot />
  </Button>
  <Button
    v-else
    :title="props.title"
    :text="(value && props.textActive) || props.text"
    :css="props.css"
    :type="typeStr"
    :icon="(value && props.iconActive) || props.icon"
    :onclick="handleClick"
    :disabled="props.disabled"
  />
</template>