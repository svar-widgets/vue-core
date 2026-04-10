<script setup>
import { inject, ref, computed, onMounted, onBeforeUnmount } from "vue";
import { dateToString } from "@svar-ui/lib-dom";

import Text from "./Text.vue";
import Dropdown from "./Dropdown.vue";
import Calendar from "./Calendar.vue";
import { defaultLocale } from "./helpers/locale";
import { toDateDropdown } from "./helpers/dropdown";

defineOptions({ name: "CoreDatePicker", inheritAttrs: false });

const props = defineProps({
  id: {},
  disabled: { default: false },
  error: { default: false },
  placeholder: { default: "" },
  format: { default: "" },
  buttons: { default: () => ["clear", "today"] },
  css: { default: "" },
  title: { default: "" },
  editable: { default: false },
  clear: { default: false },
  onchange: {},
  dropdown: { default: () => ({}) }
});

const value = defineModel('value');

const i18n = inject("wx-i18n");
const { calendar: calendarLocale, formats } = (i18n || defaultLocale()).getRaw();
const f = props.format || formats.dateFormat;
const dateFormat = typeof f === "function" ? f : dateToString(f, calendarLocale);

const popup = ref();

function oncancel() {
  popup.value = false;
}

function doChange(v) {
  const skipEvent =
    v === value.value ||
    (v && value.value && v.valueOf() === value.value.valueOf()) ||
    (!v && !value.value);

  value.value = v;
  if (!skipEvent) {
    props.onchange && props.onchange({ value: value.value });
  }

  setTimeout(oncancel, 1);
}

const formattedValue = computed(() => (value.value ? dateFormat(value.value) : ""));

function change({ value: v, input }) {
  if (!props.editable && !props.clear) return;
  if (input) return;

  let date =
    typeof props.editable === "function"
      ? props.editable(v)
      : v
        ? new Date(v)
        : null;

  date = isNaN(date) ? value.value || null : date || null;
  doChange(date);
}

onMounted(() => {
  window.addEventListener("scroll", oncancel);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", oncancel);
});
</script>

<template>
  <div class="wx-datepicker" @click="popup = true">
    <Text
      :css="props.css"
      :title="props.title"
      :value="formattedValue"
      :id="props.id"
      :readonly="!props.editable"
      :disabled="props.disabled"
      :error="props.error"
      :placeholder="props.placeholder"
      :oninput="oncancel"
      :onchange="change"
      icon="wxi-calendar"
      input-style="cursor: pointer; width: 100%; padding-right: calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2);"
      :clear="props.clear"
    />

    <Dropdown v-if="popup && !props.disabled" :oncancel="oncancel" v-bind="toDateDropdown(props.dropdown)">
      <Calendar :buttons="props.buttons" :value="value" :onchange="e => doChange(e.value)" />
    </Dropdown>
  </div>
</template>


<style scoped>

	.wx-datepicker {
		position: relative;
		width: var(--wx-input-width);
	}

</style>