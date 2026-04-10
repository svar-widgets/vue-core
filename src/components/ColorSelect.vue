<script>
const defaultColors = [
  "#00a037",
  "#37a9ef",
  "#f5a623",
  "#ff4c3b",
  "#a0a0a0",
  "#000000",
  "#ffffff",
];
</script>

<script setup>
import { ref } from "vue";
import Dropdown from "./Dropdown.vue";
import { getInputId } from "./helpers/getInputId";

defineOptions({ name: "CoreColorSelect", inheritAttrs: false  });

const props = defineProps({
  colors: { default: defaultColors },
  id: {},
  clear: { default: false },
  placeholder: { default: "" },
  title: { default: "" },
  disabled: { default: false },
  error: { default: false },
  onchange: {},
  dropdown: { default: () => ({}) },
});

const inputId = getInputId(props.id);

const value = defineModel('value', { default: "" });

const popup = ref(false);

function selectColor(ev, color) {
  ev.stopPropagation();
  value.value = color;
  popup.value = false;
  props.onchange && props.onchange({ value: value.value });
}
function unselectColor(ev) {
  ev.stopPropagation();
  value.value = "";
  props.onchange && props.onchange({ value: value.value });
}
function handlePopup() {
  if (props.disabled) return false;
  popup.value = true;
}
function closePopup() {
  popup.value = false;
}
</script>

<template>
  <div class="wx-colorselect" @click="handlePopup">
    <input
      :title="props.title"
      :value="value"
      readonly
      :id="inputId"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :class="{ 'wx-error': props.error, 'wx-focus': popup }"
    />

    <i
      v-if="props.clear && value && !props.disabled"
      class="wx-clear wxi-close"
      @click="unselectColor"
    ></i>

    <div
      v-if="value"
      class="wx-color wx-selected"
      :style="{ backgroundColor: value || '#00a037' }"
    ></div>
    <div v-else class="wx-empty wx-selected"></div>

    <Dropdown v-if="popup" :oncancel="closePopup" v-bind="props.dropdown">
      <div class="wx-colors">
        <div class="wx-empty" @click="ev => selectColor(ev, '')"></div>
        <div
          v-for="color in props.colors" :key="color"
          class="wx-color"
          :style="{ backgroundColor: color }"
          @click="ev => selectColor(ev, color)"
        ></div>
      </div>
    </Dropdown>
  </div>
</template>


<style scoped>

	.wx-colorselect {
		position: relative;
		width: var(--wx-input-width);
	}

	.wx-selected {
		position: absolute;
		left: var(--wx-input-icon-indent);
		top: 50%;
		transform: translateY(-50%);
	}

	.wx-colors {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 8px;
	}

	.wx-color {
		width: var(--wx-input-icon-size);
		height: var(--wx-input-icon-size);
		border-radius: var(--wx-input-border-radius);
		cursor: pointer;
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
	input[disabled] ~ .wx-color,
	input[disabled] ~ .wx-empty {
		cursor: not-allowed;
	}
	input.wx-error {
		border-color: var(--wx-color-danger);
		color: var(--wx-color-danger);
	}

	.wx-empty {
		width: var(--wx-input-icon-size);
		height: var(--wx-input-icon-size);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		background: linear-gradient(
			to top left,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0) calc(50% - 1px),
			rgb(255, 0, 0) 50%,
			rgba(0, 0, 0, 0) calc(50% + 1px),
			rgba(0, 0, 0, 0) 100%
		);
		cursor: pointer;
		user-select: none;
	}

	.wxi-close {
		position: absolute;
		right: var(--wx-input-icon-indent);
		top: 50%;
		transform: translateY(-50%);
		font-size: var(--wx-input-icon-size);
		line-height: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--wx-input-icon-size);
		height: var(--wx-input-icon-size);
		border-radius: var(--wx-input-border-radius);
		color: var(--wx-input-icon-color);
		cursor: pointer;
	}
	.wxi-close:hover {
		background: var(--wx-background-hover);
		border-radius: var(--wx-icon-border-radius);
	}

</style>