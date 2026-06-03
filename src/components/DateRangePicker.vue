<script setup>
import { ref, computed, onMounted, onBeforeUnmount, inject } from 'vue';
import { dateToString } from '@svar-ui/lib-dom';

import Text from './Text.vue';
import Dropdown from './Dropdown.vue';
import RangeCalendar from './RangeCalendar.vue';
import { defaultLocale } from './helpers/locale';
import { toDateDropdown } from './helpers/dropdown';

defineOptions({ name: 'CoreDateRangePicker', inheritAttrs: false });

const value = defineModel('value');

const props = defineProps({
  id: {},
  disabled: { default: false },
  error: { default: false },
  placeholder: { default: '' },
  css: { default: '' },
  title: { default: '' },
  tooltip: {},
  format: { default: '' },
  months: { default: 2 },
  buttons: { default: () => ['clear', 'today'] },
  editable: { default: false },
  clear: { default: false },
  onchange: {},
  dropdown: {},
});

const i18n = inject('wx-i18n', null);
const { calendar: calendarLocale, formats } = (i18n || defaultLocale()).getRaw();
const f = props.format || formats?.dateFormat;
let dateFormat = typeof f === 'function' ? f : dateToString(f, calendarLocale);

const popup = ref();

function oncancel() {
  if (value.value && value.value.start && !value.value.end) props.onchange && props.onchange({ value: value.value });
  popup.value = false;
}

const formattedValue = computed(() => {
  const v = value.value;
  return v
    ? v.start
      ? dateFormat(v.start) + (v.end ? ` - ${dateFormat(v.end)}` : '')
      : dateFormat(v)
    : '';
});

function doChange(d) {
  value.value = d.start || d.end ? { start: d.start, end: d.end } : null;
  if ((d.start && d.end) || (!d.start && !d.end)) {
    props.onchange && props.onchange({ value: value.value });
    setTimeout(oncancel, 1);
  }
}

function doInputChange(ev) {
  if (!props.editable && !props.clear) return;

  const { value: v, input } = ev;
  if (input) return;

  const parts = v.split(' -').map((a, i) => {
    const av = a.trim();
    let date =
      typeof props.editable === 'function'
        ? props.editable(av)
        : av
          ? new Date(av)
          : null;

    let fallback = i === 0 ? start.value : end.value;
    return isNaN(date) ? (fallback ? fallback : null) : date || null;
  });

  const s = parts[0];
  const e = parts[1];

  doChange({ start: s, end: e });
}

const start = computed(() => (value.value ? value.value.start || null : null));
const end = computed(() => (value.value ? value.value.end || null : null));

onMounted(() => {
  window.addEventListener('scroll', oncancel);
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', oncancel);
});
</script>

<template>
  <div
    class="wx-daterangepicker"
    :class="{ 'wx-disabled': props.disabled, 'wx-error': props.error }"
    @click="popup = true"
  >
    <Text
      :css="`wx-date-input ${props.css}`"
      :title="props.title"
      :tooltip="props.tooltip"
      :value="formattedValue"
      :id="props.id"
      :readonly="!props.editable"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :error="props.error"
      :onchange="doInputChange"
      icon="wxi-calendar"
      :clear="props.clear"
    />

    <Dropdown v-if="popup && !props.disabled" :oncancel="oncancel" v-bind="toDateDropdown(props.dropdown)">
      <RangeCalendar
        :oncancel="oncancel"
        :buttons="props.buttons"
        :start="start"
        :end="end"
        :months="props.months"
        :onchange="doChange"
      />
    </Dropdown>
  </div>
</template>


<style scoped>

	.wx-daterangepicker {
		position: relative;
		width: var(--wx-input-width);
	}

</style>