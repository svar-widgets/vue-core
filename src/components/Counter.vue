<script setup>
import { getInputId } from "./helpers/getInputId";

defineOptions({ name: "CoreCounter", inheritAttrs: false });

const props = defineProps({
  id: {},
  step: { default: 1 },
  min: { default: 0 },
  max: { default: Infinity },
  error: { default: false },
  disabled: { default: false },
  readonly: { default: false },
  onchange: { default: undefined }
});

const inputId = getInputId(props.id);

const value = defineModel('value', { default: 0 });

function dec() {
  if (props.readonly || value.value <= props.min) return;
  value.value -= props.step;
  props.onchange && props.onchange({ value: value.value });
}

function inc() {
  if (props.readonly || value.value >= props.max) return;
  value.value += props.step;
  props.onchange && props.onchange({ value: value.value });
}

function blur() {
  if (!props.readonly) {
    const tValue =
      Math.round(Math.min(props.max, Math.max(value.value, props.min)) / props.step) * props.step;
    value.value = isNaN(tValue) ? Math.max(props.min, 0) : tValue;
    props.onchange && props.onchange({ value: value.value });
  }
}

function input(e) {
  props.onchange && props.onchange({ value: e.target.value * 1, input: true });
}
</script>

<template>
  <div
    class="wx-counter"
    :class="{
      'wx-disabled': props.disabled,
      'wx-readonly': props.readonly,
      'wx-error': props.error
    }"
  >
    <button aria-label="-" class="wx-btn wx-btn-dec" :disabled="props.disabled" @click="dec">
      <svg
        class="wx-dec"
        width="12"
        height="2"
        viewBox="0 0 12 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.2501 1.74994H0.750092V0.249939H11.2501V1.74994Z" />
      </svg>
    </button>
    <input
      :id="inputId"
      type="text"
      class="wx-input"
      :disabled="props.disabled"
      :readonly="props.readonly"
      required
      v-model="value"
      @blur="blur"
      @input="input"
    />
    <button aria-label="-" class="wx-btn wx-btn-inc" :disabled="props.disabled" @click="inc">
      <svg
        class="wx-inc"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.2501
                6.74994H6.75009V11.2499H5.25009V6.74994H0.750092V5.24994H5.25009V0.749939H6.75009V5.24994H11.2501V6.74994Z"
        />
      </svg>
    </button>
  </div>
</template>


<style scoped>

	.wx-counter {
		display: flex;
		border: var(--wx-input-border);
		width: max-content;
		border-radius: var(--wx-input-border-radius);
	}

	.wx-counter:not(:deep(.wx-readonly)):has(:deep(.wx-input:focus)) {
		border: var(--wx-input-border-focus);
	}

	.wx-input {
		box-sizing: border-box;
		background: var(--wx-background);
		width: 40px;
		height: 30px;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		color: var(--wx-input-font-color);
		padding-left: 8px;
		padding-right: 8px;
		outline: none;
		border: none;
		border-left: var(--wx-input-border);
		border-right: var(--wx-input-border);
	}

	.wx-btn {
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 32px;
		height: 30px;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		color: var(--wx-input-font-color);
		background-color: var(--wx-background-alt);
		outline: none;
		border: none;
		cursor: pointer;
	}

	.wx-counter:not(:deep(.wx-readonly)):not(:deep(.wx-disabled))
		.wx-btn:active {
		background-color: var(--wx-background-hover);
	}

	.wx-dec,
	.wx-inc {
		fill: var(--wx-color-primary);
	}

	.wx-btn-dec {
		border-radius: 2px 0 0 2px;
	}
	.wx-btn-inc {
		border-radius: 0 2px 2px 0;
	}

	.wx-error,
	.wx-counter.wx-error:has(:deep(.wx-input:focus)) {
		border: 1px solid var(--wx-color-danger);
	}

	.wx-error .wx-input {
		color: var(--wx-color-danger);
	}

	.wx-disabled .wx-input,
	.wx-disabled .wx-btn {
		cursor: not-allowed;
		color: var(--wx-color-font-disabled);
	}

	.wx-disabled .wx-btn {
		background: var(--wx-color-disabled-alt);
	}

	.wx-disabled .wx-btn .wx-dec,
	.wx-disabled .wx-btn .wx-inc,
	.wx-readonly .wx-btn .wx-dec,
	.wx-readonly .wx-btn .wx-inc {
		fill: var(--wx-color-font-disabled);
	}

	.wx-readonly .wx-btn {
		cursor: default;
	}

</style>