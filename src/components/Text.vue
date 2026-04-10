<script setup>
import { ref, computed, onMounted } from "vue";
import { getInputId } from "./helpers/getInputId";

defineOptions({ name: "CoreText", inheritAttrs: false });

const props = defineProps({
  id: {},
  readonly: { default: false },
  focus: { default: false },
  select: { default: false },
  type: { default: "text" },
  placeholder: { default: "" },
  disabled: { default: false },
  error: { default: false },
  inputStyle: { default: "" },
  title: { default: "" },
  css: { default: "" },
  icon: { default: "" },
  clear: { default: false },
  onchange: {}
});

const inputId = getInputId(props.id);

const value = defineModel("value", { default: "" });

const cssString = computed(() =>
  props.icon && props.css.indexOf("wx-icon-left") === -1
    ? "wx-icon-right " + props.css
    : props.css
);
const hasLeftIcon = computed(() => props.icon && props.css.indexOf("wx-icon-left") !== -1);

const input = ref();

onMounted(() => {
  setTimeout(() => {
    if (props.focus && input.value) input.value.focus();
    if (props.select && input.value) input.value.select();
  }, 1);
});

const oninput = () => props.onchange && props.onchange({ value: value.value, input: true });
const change = () => props.onchange && props.onchange({ value: value.value });

function clearValue(ev) {
  ev.stopPropagation();
  value.value = "";
  props.onchange && props.onchange({ value: value.value });
}
</script>

<template>
  <div
    :class="[
      'wx-text',
      cssString,
      {
        'wx-error': props.error,
        'wx-disabled': props.disabled,
        'wx-clear': props.clear
      }
    ]"
  >
    <template v-if="props.type == 'password'">
      <input
        ref="input"
        :id="inputId"
        :readonly="props.readonly"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        type="password"
        :style="props.inputStyle"
        :title="props.title"
        v-model="value"
        @input="oninput"
        @change="change"
      />
    </template>
    <template v-else-if="props.type == 'number'">
      <input
        ref="input"
        :id="inputId"
        :readonly="props.readonly"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        type="number"
        :style="props.inputStyle"
        :title="props.title"
        v-model="value"
        @input="oninput"
        @change="change"
      />
    </template>
    <template v-else>
      <input
        ref="input"
        :id="inputId"
        :readonly="props.readonly"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        :title="props.title"
        :style="props.inputStyle"
        v-model="value"
        @input="oninput"
        @change="change"
      />
    </template>

    <template v-if="props.clear && !props.disabled && value">
      <i class="wx-icon wxi-close" @click="clearValue"></i>
      <i v-if="hasLeftIcon" :class="['wx-icon', props.icon]"></i>
    </template>
    <i v-else-if="props.icon" :class="['wx-icon', props.icon]"></i>
  </div>
</template>


<style scoped>

	.wx-text {
		position: relative;
		width: var(--wx-input-width);
	}
	.wx-text.wx-disabled .wx-icon {
		color: var(--wx-color-font-disabled);
	}
	.wx-text.wx-error .wx-icon {
		color: var(--wx-color-danger);
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

	.wx-icon-left .wx-icon:not(.wxi-close) {
		right: auto;
		left: var(--wx-input-icon-indent);
	}

	.wx-icon.wxi-close {
		pointer-events: all;
		cursor: pointer;
	}
	.wx-icon.wxi-close:hover {
		background: var(--wx-background-hover);
		border-radius: var(--wx-icon-border-radius);
	}

	input {
		display: block;
		width: var(--wx-input-width);
		height: var(--wx-input-height);
		max-width: 100%;
		padding: var(--wx-input-padding);
		outline: none;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-font-color);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		background: var(--wx-input-background);
		overflow: hidden;
		text-overflow: ellipsis;
	}
	input:focus {
		border: var(--wx-input-border-focus);
	}
	input::placeholder {
		color: var(--wx-input-placeholder-color);
	}

	.wx-icon-left input {
		padding-left: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
	}
	.wx-icon-right input,
	.wx-text.wx-clear input {
		padding-right: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
	}

	input[disabled] {
		cursor: not-allowed !important;
		border: var(--wx-input-border-disabled);
		color: var(--wx-color-font-disabled);
		background: var(--wx-input-background-disabled);
		pointer-events: none;
	}
	input[disabled]::placeholder {
		color: var(--wx-color-font-disabled);
	}

	.wx-error input {
		border-color: var(--wx-color-danger);
		color: var(--wx-color-danger);
	}

</style>