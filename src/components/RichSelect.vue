<script setup>
import { computed, useSlots } from 'vue';
import List from "./helpers/SuggestDropdown.vue";

defineOptions({ name: 'CoreRichSelect', inheritAttrs: false });

const props = defineProps({
  options: { default: () => [] },
  textOptions: { default: null },
  placeholder: { default: "" },
  disabled: { default: false },
  error: { default: false },
  title: { default: "" },
  tooltip: {},
  textField: { default: "label" },
  clear: { default: false },
  css: { default: "" },
  onchange: {},
  dropdown: { default: () => ({}) }
});

const value = defineModel('value', { default: "" });

let navigate = null;
let keydown = null;
function ready(ev) {
  navigate = ev.navigate;
  keydown = ev.keydown;
}

const selected = computed(() => {
  const v = value.value;
  if (v || v === 0) {
    const list = props.textOptions || props.options;
    return list.find(a => a.id === v) || null;
  }
  return null;
});

function select({ id }) {
  if (id || id === 0) {
    value.value = id;
    navigate?.(null);
    props.onchange && props.onchange({ value: value.value });
  }
}

function unselect(ev) {
  ev.stopPropagation();
  value.value = "";
  props.onchange && props.onchange({ value: value.value });
}

function index() {
  return props.options.findIndex(a => a.id === value.value);
}

const slots = useSlots();
const hasKids = computed(() => !!slots.default);
</script>

<template>
  <div
    :class="['wx-richselect', props.css, { 'wx-error': props.error, 'wx-disabled': props.disabled, 'wx-nowrap': !hasKids }]"
    :title="props.title"
    @click="navigate?.(index())"
    @keydown="ev => keydown?.(ev, index())"
    tabindex="0"
    :data-tooltip-text="props.tooltip"
  >
    <div class="wx-label">
      <template v-if="selected">
        <template v-if="hasKids">
          <slot :option="selected" />
        </template>
        <template v-else>{{ selected[props.textField] }}</template>
      </template>
      <template v-else-if="props.placeholder">
        <span class="wx-placeholder">{{ props.placeholder }}</span>
      </template>
      <template v-else>&nbsp;</template>
    </div>

    <template v-if="props.clear && !props.disabled && value">
      <i class="wx-icon wxi-close" @click="unselect"></i>
    </template>
    <template v-else>
      <i class="wx-icon wxi-angle-down"></i>
    </template>

    <template v-if="!props.disabled">
      <List :items="props.options" :onready="ready" :onselect="select" v-bind="props.dropdown">
        <template #default="{ option }">
          <template v-if="hasKids">
            <slot :option="option" />
          </template>
          <template v-else>{{ option[props.textField] }}</template>
        </template>
      </List>
    </template>
  </div>
</template>


<style scoped>

	.wx-richselect {
		position: relative;
		outline: none;
		width: var(--wx-input-width);
		min-height: var(--wx-input-height);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		background: var(--wx-input-background);
		cursor: pointer;
	}
	.wx-richselect:focus {
		border: var(--wx-input-border-focus);
	}
	.wx-richselect.wx-disabled {
		cursor: not-allowed;
		border: var(--wx-input-border-disabled);
		background: var(--wx-input-background-disabled);
	}
	.wx-richselect.wx-disabled .wx-label {
		color: var(--wx-color-font-disabled);
	}
	.wx-richselect.wx-disabled .wx-icon {
		color: var(--wx-color-font-disabled);
	}
	.wx-richselect.wx-error {
		border-color: var(--wx-color-danger);
	}
	.wx-richselect.wx-error .wx-label {
		color: var(--wx-color-danger);
	}
	.wx-richselect.wx-error .wx-icon {
		color: var(--wx-color-danger);
	}

	.wx-label {
		display: block;
		width: 100%;
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
		overflow: hidden;
	}

	.wx-placeholder {
		color: var(--wx-input-placeholder-color);
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
	}
	.wx-icon.wxi-close:hover {
		background: var(--wx-background-hover);
		border-radius: var(--wx-icon-border-radius);
	}

	.wx-nowrap .wx-label {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

</style>