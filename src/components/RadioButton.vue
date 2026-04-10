<script setup>
import { getInputId } from "./helpers/getInputId";

defineOptions({ name: "CoreRadioButton", inheritAttrs: false });

const props = defineProps({
  id: {},
  label: { default: "" },
  name: { default: "" },
  inputValue: { default: "" },
  disabled: { default: false },
  onchange: {},
});

const inputId = getInputId(props.id);

const value = defineModel('value');

function handlerChange(ev) {
  value.value = ev.target.checked;
  if (value.value) props.onchange && props.onchange({ value: true, inputValue: props.inputValue });
}


</script>

<template>
  <div class="wx-radio">
    <input
      type="radio"
      :id="inputId"
      :disabled="props.disabled"
      :name="props.name"
      :value="props.inputValue"
      :checked="value"
      @change="handlerChange"
    />
    <label :for="inputId">
      <span></span>
      <span v-if="props.label">{{ props.label }}</span>
    </label>
  </div>
</template>


<style scoped>

	.wx-radio {
		position: relative;
		display: inline-block;
		vertical-align: top;
		max-width: var(--wx-input-width);
	}
	input {
		appearance: none;
		width: 0;
		height: 0;
		opacity: 0;
		position: absolute;
		left: 0;
		top: 0;
		margin: 0;
		padding: 0;
	}
	label {
		display: flex;
		flex-wrap: nowrap;
		align-items: flex-start;
		font-family: var(--wx-checkbox-font-family);
		font-size: var(--wx-checkbox-font-size);
		line-height: var(--wx-checkbox-line-height);
		font-weight: var(--wx-checkbox-font-weight);
		color: var(--wx-checkbox-font-color);
		cursor: pointer;
	}
	span {
		display: block;
	}
	span + span {
		margin-left: 8px;
		padding-top: calc(
			(var(--wx-checkbox-height) - var(--wx-checkbox-line-height)) / 2
		);
		padding-bottom: calc(
			(var(--wx-checkbox-height) - var(--wx-checkbox-line-height)) / 2
		);
	}
	span:first-child {
		position: relative;
		flex-shrink: 0;
		padding-top: calc(
			(var(--wx-checkbox-height) - var(--wx-checkbox-size)) / 2
		);
		padding-bottom: calc(
			(var(--wx-checkbox-height) - var(--wx-checkbox-size)) / 2
		);
	}
	span:first-child:before {
		content: "";
		display: block;
		width: var(--wx-checkbox-size);
		height: var(--wx-checkbox-size);
		border: var(--wx-checkbox-border-width) solid
			var(--wx-checkbox-border-color);
		border-radius: 50%;
		background: var(--wx-input-background);
	}
	span:first-child:after {
		content: "";
		position: absolute;
		display: none;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: calc(
			var(--wx-checkbox-size) - var(--wx-checkbox-border-width) * 2
		);
		height: calc(
			var(--wx-checkbox-size) - var(--wx-checkbox-border-width) * 2
		);
		border-style: solid;
		border-color: var(--wx-input-background);
		border-width: calc(var(--wx-checkbox-size) * 0.2);
		border-radius: 50%;
	}
	input:checked ~ label span:first-child:before {
		background: var(--wx-color-primary);
		border-color: transparent;
	}
	input:checked ~ label span:first-child:after {
		display: block;
	}
	input[disabled] ~ label {
		color: var(--wx-checkbox-border-color-disabled);
		cursor: not-allowed;
	}
	input[disabled]:not(:checked) ~ label span:first-child:before {
		border-color: var(--wx-checkbox-border-color-disabled);
	}
	input[disabled]:checked ~ label span:first-child:before {
		background: var(--wx-checkbox-border-color-disabled);
	}

</style>