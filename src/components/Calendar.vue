<script setup>
import { watch } from "vue";
import Panel from "./calendar/Panel.vue";
import Locale from "../Locale.vue";

defineOptions({ name: "CoreCalendar", inheritAttrs: false  });

const value = defineModel("value");
const current = defineModel("current");

const props = defineProps({
  markers: { default: null },
  buttons: { default: () => ["clear", "today"] },
  onchange: {}
});

function fixCurrent(force) {
  if (!current.value || force) current.value = value.value ? new Date(value.value) : new Date();
  current.value.setDate(1);
}

watch(() => value.value, () => {
  fixCurrent(true);
}, { immediate: true });

function change(v) {
  const x = v.value;
  if (x) {
    value.value = new Date(x);
  } else {
    value.value = null;
  }

  if (props.onchange) props.onchange({ value: value.value });
}
</script>

<template>
  <Locale>
    <Panel
      :value="value"
      v-model:current="current"
      :markers="props.markers"
      :buttons="props.buttons"
      :onchange="change"
    />
  </Locale>
</template>