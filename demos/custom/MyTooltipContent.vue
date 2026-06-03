<script setup>
defineOptions({ name: 'CoreCustomMyTooltipContent' });

const props = defineProps({
  x: {},
  y: {},
  value: {}
});
</script>

<template>
  <div style="padding: 4px 8px; color: #8df;">
    <div><b>Value</b>: {{ props.value }}</div>
    <div><b>X</b>: {{ props.x }}</div>
    <div><b>Y</b>: {{ props.y }}</div>
  </div>
</template>
