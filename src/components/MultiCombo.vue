<script setup>
import { ref, computed, useSlots } from 'vue';
import List from './helpers/SuggestDropdown.vue';
import { getInputId } from './helpers/getInputId';

defineOptions({ name: 'CoreMultiCombo', inheritAttrs: false });

const props = defineProps({
  id: {},
  options: { default: () => [] },
  textOptions: { default: null },
  textField: { default: 'label' },
  placeholder: { default: '' },
  title: { default: '' },
  disabled: { default: false },
  error: { default: false },
  checkboxes: { default: false },
  onchange: {},
  dropdown: { default: () => ({}) },
});

const inputId = getInputId(props.id);

const value = defineModel('value', { default: [] });

const slots = useSlots();
const hasDefaultSlot = computed(() => !!slots.default);

const text = ref('');
const selected = computed(() =>
  value.value ? (props.textOptions || props.options).filter(i => value.value.includes(i.id)) : []
);
const filterOptions = computed(() => {
  const o = props.options;
  return text.value
    ? o.filter(i => String(i[props.textField]).toLowerCase().includes(text.value.toLowerCase()))
    : o;
});
const focus = ref(false);
const inputElement = ref();

let navigate = null;
let keydownFn = null;
function onready(ev) {
  navigate = ev.navigate;
  keydownFn = ev.keydown;
}

function input() {
  if (filterOptions.value.length) navigate(0);
  else navigate(null);
}
function onselect(ev) {
  const { id } = ev;
  if (id) {
    value.value = id;
    props.onchange && props.onchange({ value: id });
    inputElement.value.focus();
  }
}

function remove(id, ev) {
  if (ev) ev.stopPropagation();

  value.value = value.value.filter(i => i !== id);
  props.onchange && props.onchange({ value: value.value });
}

function index() {
  return value.value && value.value.length
    ? filterOptions.value.findIndex(i => i.id === value.value[0])
    : 0;
}

function onclick() {
  if (!props.disabled) {
    inputElement.value.focus();
    navigate(index());
  }
}
</script>

<template>
  <div
    :title="props.title"
    class="wx-multicombo"
    :class="{
      'wx-error': props.error,
      'wx-disabled': props.disabled,
      'wx-not-empty': selected.length,
      'wx-focus': focus && !props.disabled
    }"
    @click="onclick"
    @keydown="ev => keydownFn(ev, index())"
  >
    <div class="wx-wrapper">
      <div class="wx-tags">
        <div class="wx-tag" v-for="tag in selected" :key="tag.id">
          <template v-if="hasDefaultSlot">
            <slot :option="tag" />
          </template>
          <template v-else>
            {{ tag[props.textField] }}
          </template>
          <template v-if="!props.disabled">
            <i class="wx-icon wxi-close" @click="ev => remove(tag.id, ev)"></i>
          </template>
        </div>
      </div>
      <div class="wx-select">
        <input
          :id="inputId"
          type="text"
          ref="inputElement"
          v-model="text"
          @input="input"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          @focus="() => (focus = true)"
          @blur="() => (focus = false)"
        />
        <i class="wx-icon wxi-angle-down"></i>
      </div>
    </div>

    <List
      v-if="!props.disabled"
      :items="filterOptions"
      :multiselect="true"
      :onready="onready"
      :onselect="onselect"
      :checkboxes="props.checkboxes"
      :value="value"
      v-bind="props.dropdown"
    >
      <template #default="{ option }">
        <template v-if="hasDefaultSlot">
          <slot :option="option" />
        </template>
        <template v-else>
          {{ option[props.textField] }}
        </template>
      </template>
    </List>
  </div>
</template>


<style scoped>

	.wx-multicombo {
		position: relative;
		width: var(--wx-input-width);
	}
	.wx-multicombo.wx-focus .wx-wrapper {
		border: var(--wx-input-border-focus);
	}
	.wx-multicombo.wx-disabled .wx-wrapper {
		border: var(--wx-input-border-disabled);
		background: var(--wx-input-background-disabled);
	}
	.wx-multicombo.wx-disabled .wx-tag {
		background: var(--wx-color-disabled);
		color: var(--wx-color-font-disabled);
	}
	.wx-multicombo:not(.wx-disabled) .wx-tag {
		padding-right: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
	}
	.wx-multicombo.wx-disabled input {
		cursor: not-allowed;
		color: var(--wx-color-font-disabled);
	}
	.wx-multicombo.wx-disabled .wx-icon.wxi-angle-down {
		color: var(--wx-color-font-disabled);
	}
	.wx-multicombo.wx-error .wx-wrapper {
		border-color: var(--wx-color-danger);
	}
	.wx-multicombo.wx-error input {
		color: var(--wx-color-danger);
	}
	.wx-multicombo.wx-error .wx-icon.wxi-angle-down {
		color: var(--wx-color-danger);
	}
	.wx-multicombo.wx-not-empty .wx-tags {
		gap: var(--wx-multicombo-tag-gap);
		padding: var(--wx-multicombo-tag-gap);
	}
	.wx-multicombo.wx-not-empty input {
		border-top: var(--wx-input-border);
	}
	.wx-multicombo.wx-not-empty.wx-focus input {
		border-top: var(--wx-input-border-focus);
	}
	.wx-multicombo.wx-not-empty.wx-disabled input {
		border-top: var(--wx-input-border-disabled);
	}
	.wx-multicombo.wx-not-empty.wx-error input {
		border-top-color: var(--wx-color-danger);
	}

	.wx-wrapper {
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		background: var(--wx-input-background);
	}

	.wx-tags {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		overflow: hidden;
	}

	.wx-tag {
		position: relative;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-font-color);
		border: var(--wx-multicombo-tag-border);
		border-radius: var(--wx-multicombo-tag-border-radius);
		background: var(--wx-multicombo-tag-background);
		padding: var(--wx-multicombo-tag-pading);
	}
	.wx-icon {
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
		pointer-events: none;
		user-select: none;
		color: var(--wx-input-icon-color);
	}
	.wx-icon:before {
		display: block;
	}

	.wxi-close {
		pointer-events: all;
		cursor: pointer;
	}
	.wxi-close:hover {
		background: var(--wx-background-hover);
		border-radius: var(--wx-icon-border-radius);
	}

	.wx-select {
		position: relative;
	}

	input {
		display: block;
		width: 100%;
		height: var(--wx-input-height);
		outline: none;
		background: transparent;
		border: none;
		border-radius: 0;
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
		text-overflow: ellipsis;
		cursor: pointer;
	}

</style>