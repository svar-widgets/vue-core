<script setup>
import { ref, computed, inject } from "vue";

import Field from "./Field.vue";
import Text from "./Text.vue";
import Dropdown from "./Dropdown.vue";
import Slider from "./Slider.vue";
import TwoState from "./TwoState.vue";

import { dateToString } from "@svar-ui/lib-dom";
import { defaultLocale } from "./helpers/locale";
import { getInputId } from "./helpers/getInputId";
import { toDateDropdown } from "./helpers/dropdown";

defineOptions({ name: "CoreTimePicker", inheritAttrs: false });

const props = defineProps({
  id: {},
  title: { default: "" },
  css: { default: "" },
  disabled: { default: false },
  error: { default: false },
  format: { default: "" },
  onchange: {},
  dropdown: {},
});

const inputId = getInputId(props.id);

const value = defineModel("value", { default: () => new Date(0, 0, 0, 0, 0) });

const i18n = inject("wx-i18n") || defaultLocale();
const { calendar: calendarLocale, formats } = i18n.getRaw();
const h12 = calendarLocale.clockFormat == 12;

const maxH = 23;
const maxM = 59;

const update = (v, max) => {
  v = getNumber(v);
  return Math.min(v, max);
};

const popup = ref();

const timeFormat = computed(() => {
  const f = props.format || formats.timeFormat;
  return typeof f === "function" ? f : dateToString(f, calendarLocale);
});
const zeroBased = computed(() => timeFormat.value(new Date(0, 0, 0, 1)).indexOf("01") != -1);

const safeValue = computed(() => value.value || new Date(0, 0, 0, 0, 0));
const h = computed(() => update(safeValue.value.getHours(), maxH));
const m = computed(() => update(safeValue.value.getMinutes(), maxM));

const pm = computed(() => h.value > 12);
const hText = computed(() => formatH(h.value));
const mText = computed(() => formatM(m.value));
const textValue = computed(() => timeFormat.value(new Date(0, 0, 0, h.value, m.value)));

function click() {
  popup.value = true;
}

function togglePM() {
  const next = new Date(safeValue.value);
  next.setHours(next.getHours() + (pm.value ? -12 : 12));
  value.value = next;
  props.onchange && props.onchange({ value: value.value });
}
function setHours({ value: v }) {
  if (safeValue.value.getHours() === v) return;

  const next = new Date(safeValue.value);
  next.setHours(v);
  value.value = next;
  props.onchange && props.onchange({ value: value.value });
}
function setMinutes({ value: v }) {
  if (safeValue.value.getMinutes() === v) return;

  const next = new Date(safeValue.value);
  next.setMinutes(v);
  value.value = next;
  props.onchange && props.onchange({ value: value.value });
}
function formatH(v) {
  if (h12) {
    v = v % 12;
    if (v === 0) return "12";
  }
  return formatTime(v, zeroBased.value);
}

function formatM(v) {
  return formatTime(v, true);
}
function updateH(v) {
  v = update(v, maxH);
  if (h12) {
    v = v * 1;
    if (v === 12) v = 0;
    if (pm.value) v += 12;
  }
  return v;
}

function getNumber(v) {
  return `${v}`.replace(/[^\d]/g, "") || 0;
}

function formatTime(v, zero) {
  return (v < 10 && zero ? `0${v}` : `${v}`).slice(-2);
}

function oncancel() {
  popup.value = null;
}
</script>

<template>
  <div
    class="wx-timepicker"
    :class="{ 'wx-error': props.error, 'wx-disabled': props.disabled }"
    @click="click"
  >
    <Text
      :id="inputId"
      :css="props.css"
      :title="props.title"
      :value="textValue"
      :readonly="true"
      :disabled="props.disabled"
      :error="props.error"
      icon="wxi-clock"
      input-style="cursor: pointer; width: 100%; padding-right: calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2);"
    />

    <Dropdown v-if="popup && !props.disabled" :oncancel="oncancel" v-bind="toDateDropdown(props.dropdown)">
      <div class="wx-wrapper">
        <div class="wx-timer">
          <input
            class="wx-digit"
            :value="hText"
            @blur="(e) => setHours({ value: updateH(e.target.value) })"
          />
          <div class="wx-separator">:</div>
          <input
            class="wx-digit"
            :value="mText"
            @blur="(e) => setMinutes({ value: update(e.target.value, maxM) })"
          />
          <TwoState v-if="h12" :value="pm" :onclick="togglePM">
            <span>am</span>
            <template #active>
              <span>pm</span>
            </template>
          </TwoState>
        </div>
        <Field width="unset">
          <Slider
            :label="calendarLocale.hours"
            width="unset"
            :value="h"
            :onchange="setHours"
            :max="maxH"
          />
        </Field>
        <Field width="unset">
          <Slider
            :label="calendarLocale.minutes"
            width="unset"
            :value="m"
            :onchange="setMinutes"
            :max="maxM"
          />
        </Field>
      </div>
    </Dropdown>
  </div>
</template>


<style scoped>

	.wx-timepicker {
		position: relative;
		width: var(--wx-input-width);
	}

	.wx-wrapper {
		padding: 10px 20px;
	}

	.wx-timer {
		display: flex;
		text-align: center;
		justify-content: center;
		margin-bottom: 10px;
	}

	.wx-digit {
		display: block;
		width: 50px;
		height: 38px;
		border: none;
		border-bottom: var(--wx-input-border);
		font-family: var(--wx-input-font-family);
		font-size: 24px;
		line-height: 28px;
		padding: 5px;
		text-align: center;
		color: var(--wx-input-font-color);
		background-color: transparent;
		outline: none;
	}

	.wx-digit:focus {
		border-bottom: var(--wx-input-border-focus);
	}

	.wx-separator {
		font-size: 24px;
		line-height: 38px;
	}

</style>