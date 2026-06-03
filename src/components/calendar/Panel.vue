<script setup>
defineOptions({ name: "CoreCalendarPanel" });

import { ref, computed, inject } from 'vue'
import Header from './Header.vue'
import Button from './Button.vue'
import { configs } from './helpers'

const i18n = inject('wx-i18n')
const _ = i18n.getGroup('calendar')

const props = defineProps({
  value: {},
  part: { default: 'normal' },
  markers: { default: null },
  buttons: { default: () => ['clear', 'today'] },
  css: { default: '' },
  onshift: {},
  onchange: {},
})

const current = defineModel('current')

const type = ref('month')

const buttonList = computed(() => {
  if (Array.isArray(props.buttons)) return props.buttons
  return props.buttons ? ['clear', 'today'] : []
})

function selectDate(ev, date) {
  ev.preventDefault()
  props.onchange && props.onchange({ value: date })
}

function oncancel() {
  if (type.value === 'duodecade') type.value = 'year'
  else if (type.value === 'year') type.value = 'month'
}

function handleShift(ev) {
  const { diff } = ev

  if (diff === 0) {
    if (type.value === 'month') type.value = 'year'
    else if (type.value === 'year') type.value = 'duodecade'
    return
  }
  if (diff) {
    const obj = configs[type.value]
    current.value = diff > 0 ? obj.next(current.value) : obj.prev(current.value)
  }
  props.onshift && props.onshift()
}

function handleChange(value) {
  type.value = 'month'
  props.onchange && props.onchange({ select: true, value })
}

function getButtonValue(btn) {
  if (btn === 'done') return -1
  if (btn === 'clear') return null
  if (btn === 'today') return new Date()
}

const ActiveComponent = computed(() => configs[type.value].component)
</script>

<template>
  <div class="wx-calendar" :class="[props.part !== 'normal' && props.part !== 'both' ? 'wx-part' : '', props.css]">
    <div class="wx-wrap">
      <Header :date="current" :part="props.part" :type="type" :onshift="handleShift" />
      <div>
        <component
          :is="ActiveComponent"
          :value="props.value"
          v-model:current="current"
          :part="props.part"
          :markers="props.markers"
          :onchange="handleChange"
          :oncancel="oncancel"
          :onshift="handleShift"
        />

        <div v-if="type === 'month' && buttonList.length > 0" class="wx-buttons">
          <div v-for="btn in buttonList" :key="btn" class="wx-button-item">
            <Button :onclick="e => selectDate(e, getButtonValue(btn))">
              {{ _(btn) }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

	.wx-calendar {
		height: auto;
		width: 100%;
		padding: var(--wx-calendar-padding);
		cursor: default;
		font-family: var(--wx-calendar-font-family);
		font-size: var(--wx-calendar-font-size);
		line-height: var(--wx-calendar-line-height);
		font-weight: var(--wx-calendar-font-weight);
		color: var(--wx-calendar-font-color);
	}
	.wx-calendar.wx-part {
		padding-bottom: 0;
	}
	.wx-wrap {
		width: calc(var(--wx-calendar-cell-size) * 7);
		margin: 0 auto;
	}
	.wx-buttons {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-end;
		margin-top: calc(var(--wx-calendar-gap) * 2);
	}
	.wx-button-item + .wx-button-item {
		margin-left: calc(var(--wx-calendar-gap) * 3);
	}

</style>