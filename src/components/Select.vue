<script setup>
import { getInputId } from "./helpers/getInputId";

defineOptions({ name: "CoreSelect", inheritAttrs: false });

const props = defineProps({
  options: { default: () => [] },
  placeholder: { default: "" },
  title: { default: "" },
  tooltip: {},
  disabled: { default: false },
  error: { default: false },
  textField: { default: "label" },
  clear: { default: false },
  id: {},
  css: { default: "" },
  onchange: {},
});

const inputId = getInputId(props.id);

const value = defineModel("value", { default: "" });

function unselect() {
  value.value = "";
  if (props.onchange) props.onchange({ value: value.value });
}

function handleChange() {
  if (props.onchange) props.onchange({ value: value.value });
}
</script>

<template>
  <div :class="['wx-select', props.css]" :data-tooltip-text="props.tooltip">
    <select
      :id="inputId"
      v-model="value"
      :disabled="props.disabled"
      :class="{ 'wx-error': props.error }"
      :title="props.title"
      @change="handleChange"
    >
      <option v-for="option in props.options" :key="option.id" :value="option.id">
        {{ option[props.textField] }}
      </option>
    </select>
    <div v-if="!value && value !== 0" class="wx-placeholder">{{ props.placeholder }}</div>

    <i
      v-if="props.clear && !props.disabled && value"
      class="wx-icon wxi-close"
      @click="unselect"
    ></i>
    <i v-else class="wx-icon wxi-angle-down"></i>
  </div>
</template>


<style scoped>

	.wx-select {
		position: relative;
		width: var(--wx-input-width);
	}

	select {
		appearance: none;
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
		overflow: hidden !important;
		text-overflow: ellipsis;
		cursor: pointer;
	}
	select:focus {
		border: var(--wx-input-border-focus);
	}
	select[disabled] {
		cursor: not-allowed;
		border: var(--wx-input-border-disabled);
		color: var(--wx-color-font-disabled);
		background: var(--wx-input-background-disabled);
	}
	select[disabled] ~ .wx-placeholder {
		color: var(--wx-color-font-disabled);
	}
	select[disabled] ~ .wx-icon {
		color: var(--wx-color-font-disabled);
	}
	select.wx-error {
		border-color: var(--wx-color-danger);
		color: var(--wx-color-danger);
	}
	select.wx-error option {
		color: var(--wx-input-font-color);
	}
	select.wx-error ~ .wx-icon {
		color: var(--wx-color-danger);
	}

	.wx-placeholder {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		border: var(--wx-input-border);
		border-color: transparent;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-placeholder-color);
		padding: var(--wx-input-padding);
		padding-right: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
		white-space: nowrap;
		overflow: hidden !important;
		text-overflow: ellipsis;
		cursor: pointer;
		pointer-events: none;
	}

	.wx-icon {
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
		pointer-events: none;
		user-select: none;
		color: var(--wx-input-icon-color);
	}
	.wx-icon:before {
		display: block;
	}
	.wx-icon.wxi-close {
		pointer-events: all;
		cursor: pointer;
	}
	.wx-icon.wxi-close:hover {
		background: var(--wx-background-hover);
		border-radius: var(--wx-icon-border-radius);
	}

</style>