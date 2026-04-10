<script setup>
defineOptions({ name: "CoreCalendarYear" });

import { inject, computed } from 'vue';
import { delegateClick } from '@svar-ui/lib-dom';
import { asDirective } from '@svar-ui/lib-vue';
import Button from './Button.vue';
import { getPartValue } from './helpers';

const vDelegateClick = asDirective(delegateClick);

const value = defineModel('value');
const current = defineModel('current');

const props = defineProps({
  part: {},
  oncancel: {},
  onchange: {},
  onshift: {},
});

const locale = inject('wx-i18n').getRaw().calendar;
const months = locale.monthShort;

const monthNum = computed(() => current.value.getMonth());

function selectMonth(month, e) {
  if (month || month === 0) {
    e.stopPropagation();
    current.value.setMonth(month);
    current.value = new Date(current.value);

    props.onshift && props.onshift({});
  }

  if (props.part === 'normal') value.value = new Date(current.value);

  props.oncancel && props.oncancel();
}

const selectMonths = {
  click: selectMonth,
};

function done() {
  const date = new Date(getPartValue(value.value, props.part) || current.value);

  date.setMonth(current.value.getMonth());
  date.setFullYear(current.value.getFullYear());

  props.onchange && props.onchange(date);
}
</script>

<template>
  <div class="wx-months" v-delegate-click="selectMonths">
    <div
      class="wx-month"
      :class="{ 'wx-current': monthNum === i }"
      v-for="(month, i) in months" :key="i"
      :data-id="i"
    >
      {{ month }}
    </div>
  </div>
  <div class="wx-buttons">
    <Button :onclick="done">{{ locale.done }}</Button>
  </div>
</template>


<style scoped>

	.wx-months {
		display: flex;
		flex-wrap: wrap;
		margin: var(--wx-calendar-gap);
	}

	.wx-month {
		flex: 0 0 calc(100% / 4 - var(--wx-calendar-gap) * 2);
		max-width: calc(100% / 4 - var(--wx-calendar-gap) * 2);
		margin: calc(var(--wx-calendar-gap) * 2) var(--wx-calendar-gap);
		text-align: center;
		cursor: pointer;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		height: var(--wx-calendar-cell-size);
		border-radius: var(--wx-calendar-border-radius);
	}
	.wx-month.wx-current {
		background: var(--wx-color-primary);
		color: var(--wx-color-primary-font);
	}
	.wx-month:not(.wx-current):hover {
		background-color: var(--wx-background-hover);
	}

	.wx-buttons {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		margin-top: var(--wx-calendar-gap);
	}

</style>