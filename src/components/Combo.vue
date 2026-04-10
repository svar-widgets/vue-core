<script setup>
defineOptions({ name: 'CoreCombo', inheritAttrs: false })

import { ref, computed } from 'vue'
import List from './helpers/SuggestDropdown.vue'
import { getInputId } from './helpers/getInputId'

const props = defineProps({
  id: {},
  options: { default: () => [] },
  textOptions: { default: null },
  textField: { default: 'label' },
  placeholder: { default: '' },
  title: { default: '' },
  disabled: { default: false },
  error: { default: false },
  clear: { default: false },
  onchange: {},
  dropdown: { default: () => ({}) }
})

const inputId = getInputId(props.id)

const value = defineModel('value', { default: '' })

const filterActive = ref(false)
const textInput = ref('')

const text = computed(() => {
  if (filterActive.value) return textInput.value
  if (value.value || value.value === 0) {
    const option = (props.textOptions || props.options).find(a => a.id === value.value)
    if (option) return option[props.textField]
  }
  return ''
})

const filteredOptions = computed(() => {
  if (!text.value || !filterActive.value) return props.options

  return props.options.filter(i =>
    String(i[props.textField]).toLowerCase().includes(String(text.value).toLowerCase())
  )
})

let navigate = null
let keydown = null
function ready(ev) {
  navigate = ev.navigate
  keydown = ev.keydown
}
const index = () => filteredOptions.value.findIndex(a => a.id === value.value)
const onclick = () => navigate && navigate(index())
const onkeydown = e => keydown && keydown(e, index())

function selectByEvent({ id }) {
  doSelect(id, true)
}

function selectByText(chunk) {
  if (!props.options.length) return
  if (chunk === '' && props.clear) {
    doUnselect()
    return
  }

  let res = props.options.find(i => i[props.textField] === chunk)
  if (!res) {
    res = props.options.find(i =>
      String(i[props.textField]).toLowerCase().includes(String(chunk).toLowerCase())
    )
  }

  const id = res ? res.id : (value.value || props.options[0].id)
  doSelect(id, false)
}

function doSelect(id, effects) {
  if (id || id === 0) {
    const selected = props.options.find(a => a.id === id)
    filterActive.value = false

    if (effects && navigate) navigate(null)

    if (selected && value.value !== selected.id) {
      value.value = selected.id
      if (props.onchange) props.onchange({ value: value.value })
    }
  }

  if (!hasFocus && effects && inputElement.value) inputElement.value.focus()
}

function doUnselect(ev) {
  if (ev) ev.stopPropagation()

  value.value = ''
  filterActive.value = false
  if (props.onchange) props.onchange({ value: value.value })
}

function oninput() {
  if (inputElement.value) {
    textInput.value = inputElement.value.value
  } else {
    textInput.value = ''
  }
  filterActive.value = true

  if (filteredOptions.value.length && navigate) navigate(0)
}

const inputElement = ref(null)
let hasFocus = false
function onfocus() {
  hasFocus = true
}
function onblur() {
  hasFocus = false
  setTimeout(() => {
    if (!hasFocus) selectByText(text.value)
  }, 200)
}
</script>

<template>
  <div class="wx-combo" @click="onclick" @keydown="onkeydown" :title="props.title">
    <input
      :id="inputId"
      ref="inputElement"
      :value="text"
      :class="{ 'wx-error': props.error }"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      @focus="onfocus"
      @blur="onblur"
      @input="oninput"
    />

    <i v-if="props.clear && !props.disabled && value" class="wx-icon wxi-close" @click="doUnselect"></i>
    <i v-else class="wx-icon wxi-angle-down"></i>

    <List v-if="!props.disabled" :items="filteredOptions" :onready="ready" :onselect="selectByEvent" v-bind="props.dropdown">
      <template #default="{ option }">
        <slot :option="option">
          {{ option[props.textField] }}
        </slot>
      </template>
    </List>
  </div>
</template>


<style scoped>

	.wx-combo {
		position: relative;
		width: var(--wx-input-width);
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
		overflow: hidden;
		text-overflow: ellipsis;
		cursor: pointer;
	}
	input:focus {
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
	input[disabled] ~ .wx-icon {
		color: var(--wx-color-font-disabled);
	}
	input.wx-error {
		border-color: var(--wx-color-danger);
		color: var(--wx-color-danger);
	}
	input.wx-error ~ .wx-icon {
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

	.wx-icon.wxi-close {
		pointer-events: all;
		cursor: pointer;
	}

	.wx-icon.wxi-close:hover {
		background: var(--wx-background-hover);
		border-radius: var(--wx-icon-border-radius);
	}

</style>