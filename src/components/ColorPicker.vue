<script setup>
import Dropdown from "./Dropdown.vue";
import ColorBoard from "./ColorBoard.vue";
import { ref } from "vue";
import { getInputId } from "./helpers/getInputId";

defineOptions({ name: "CoreColorPicker", inheritAttrs: false  });

const props = defineProps({
  id: {},
  placeholder: { default: "" },
  title: { default: "" },
  tooltip: {},
  disabled: { default: false },
  error: { default: false },
  clear: { default: false },
  css: { default: "" },
  onchange: {},
  dropdown: { default: () => ({}) }
});

const inputId = getInputId(props.id);

const value = defineModel('value', { default: "" });

const popup = ref(false);

function handlePopup() {
  if (props.disabled) return false;
  popup.value = true;
}

function selectColor(ev) {
  if (ev.input) return;

  popup.value = false;
  value.value = ev.value;
  props.onchange && props.onchange({ value: value.value });
}

function unselectColor(ev) {
  ev.stopPropagation();
  value.value = "";
  props.onchange && props.onchange({ value: value.value });
}

function closePopup() {
  popup.value = false;
}
</script>

<template>
  <div
    :class="['wx-colorpicker', props.css]"
    @click="handlePopup"
    :data-tooltip-text="props.tooltip"
  >
    <input
      :title="props.title"
      :value="value"
      readonly
      :id="inputId"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :class="{ 'wx-error': props.error, 'wx-focus': popup }"
    />
    <div class="wx-color" :style="{ background: value }"></div>

    <i
      v-if="props.clear && !props.disabled && value"
      class="wxi-close"
      @click="unselectColor"
    ></i>

    <Dropdown v-if="popup" :oncancel="closePopup" v-bind="props.dropdown">
      <ColorBoard :value="value" button="true" :onchange="selectColor" />
    </Dropdown>
  </div>
</template>


<style scoped>

	.wx-colorpicker {
		position: relative;
		width: var(--wx-input-width);
	}

	.wx-color {
		width: var(--wx-input-icon-size);
		height: var(--wx-input-icon-size);
		border-radius: var(--wx-input-border-radius);
		cursor: pointer;
		position: absolute;
		left: var(--wx-input-icon-indent);
		top: 50%;
		transform: translateY(-50%);
	}

	input {
		display: block;
		width: 100%;
		height: var(--wx-input-height);
		outline: none;
		background: var(--wx-input-background);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-font-color);
		padding: var(--wx-input-padding);
		padding-right: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
		padding-left: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
		overflow: hidden;
		text-overflow: ellipsis;
	}
	input.wx-focus {
		border: var(--wx-input-border-focus);
	}
	input::placeholder {
		color: var(--wx-input-placeholder-color);
	}
	input[disabled] {
		cursor: not-allowed;
		border: var(--wx-input-border-disabled);
		color: var(--wx-color-font-disabled);
		background: var(--wx-input-background-disabled);
	}
	input[disabled]::placeholder {
		color: var(--wx-color-font-disabled);
	}
	input[disabled] ~ .wx-color {
		cursor: not-allowed;
	}
	input.wx-error {
		border-color: var(--wx-color-danger);
		color: var(--wx-color-danger);
	}

	.wxi-close {
		position: absolute;
		right: var(--wx-input-icon-indent);
		top: 50%;
		transform: translateY(-50%);
		font-size: var(--wx-input-icon-size);
		line-height: 1;
		width: var(--wx-input-icon-size);
		height: var(--wx-input-icon-size);
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: none;
		color: var(--wx-input-icon-color);
		cursor: pointer;
	}
	.wxi-close:before {
		display: block;
	}
	.wxi-close:hover {
		background: var(--wx-background-hover);
		border-radius: var(--wx-icon-border-radius);
	}

</style>