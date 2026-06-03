<script setup>
import { inject, computed } from 'vue';
import { asDirective } from '@svar-ui/lib-vue';
import { delegateClick } from '@svar-ui/lib-dom';
import { defaultLocale } from '../helpers/locale';

defineOptions({ name: 'CoreMonth', inheritAttrs: false });

const props = defineProps({
  value: {},
  part: { default: '' },
  markers: { default: null },
  css: { default: '' },
  oncancel: {},
  onchange: {},
});

const current = defineModel('current');

const locale = (inject('wx-i18n') || defaultLocale()).getRaw().calendar;
const weekStart = (locale.weekStart || 7) % 7;
const weekdays = locale.dayShort
  .slice(weekStart)
  .concat(locale.dayShort.slice(0, weekStart));

const dv = (d, dm, dd) =>
  new Date(d.getFullYear(), d.getMonth() + (dm || 0), d.getDate() + (dd || 0));

const ranges = props.part !== 'normal';

function isWeekEnd(date) {
  const d = date.getDay();
  return d === 0 || d === 6;
}

function getStart() {
  const start = dv(current.value, 0, 1 - current.value.getDate());
  start.setDate(start.getDate() - ((start.getDay() - (weekStart - 7)) % 7));
  return start;
}
function getEnd() {
  const end = dv(current.value, 1, -current.value.getDate());
  end.setDate(end.getDate() + ((6 - end.getDay() + weekStart) % 7));
  return end;
}

const selectDates = {
  click: selectDate,
};

function selectDate(date, e) {
  e.stopPropagation();
  props.onchange && props.onchange(new Date(date));
  props.oncancel && props.oncancel();
}

const date = computed(() => {
  if (props.part == 'normal') return [props.value ? dv(props.value).valueOf() : 0];
  return props.value
    ? [
        props.value.start ? dv(props.value.start).valueOf() : 0,
        props.value.end ? dv(props.value.end).valueOf() : 0,
      ]
    : [0, 0];
});

const days = computed(() => {
  const start = getStart();
  const end = getEnd();
  const curMonth = current.value.getMonth();

  const list = [];
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const day = {
      day: d.getDate(),
      in: d.getMonth() === curMonth,
      date: d.valueOf(),
    };

    let css = '';
    css += !day.in ? ' wx-inactive' : '';
    css += date.value.indexOf(day.date) > -1 ? ' wx-selected' : '';

    if (ranges) {
      const s = day.date == date.value[0];
      const e = day.date == date.value[1];
      if (s && !e) css += ' wx-left';
      else if (e && !s) css += ' wx-right';

      if (day.date > date.value[0] && day.date < date.value[1]) css += ' wx-inrange';
    }

    css += isWeekEnd(d) ? ' wx-weekend' : '';
    if (props.markers) {
      const mark = props.markers(d);
      if (mark) css += ' ' + mark;
    }

    list.push({ ...day, css });
  }
  return list;
});

const vDelegateClick = asDirective(delegateClick);
</script>

<template>
  <div :class="['wx-month', css]">
    <div class="wx-weekdays">
      <div class="wx-weekday" v-for="day in weekdays" :key="day">{{ day }}</div>
    </div>
    <div class="wx-days" v-delegate-click="selectDates">
      <div
        v-for="day in days"
        :key="day.date"
        class="wx-day"
        :class="[day.css, { 'wx-out': !day.in }]"
        :data-id="day.date"
      >
        {{ day.day }}
      </div>
    </div>
  </div>
</template>


<style scoped>

	.wx-weekdays {
		display: flex;
		flex-wrap: nowrap;
		margin-bottom: calc(var(--wx-calendar-gap) * 1.5);
	}

	.wx-weekday {
		flex: 0 0 calc(100% / 7);
		max-width: calc(100% / 7);
		font-size: var(--wx-font-size-sm);
		line-height: var(--wx-line-height-sm);
		color: var(--wx-color-font-alt);
		text-align: center;
	}

	.wx-days {
		display: flex;
		flex-wrap: wrap;
	}

	.wx-day {
		border-radius: var(--wx-calendar-border-radius);
		flex: 0 0 calc(100% / 7);
		max-width: calc(100% / 7);
		height: calc(
			var(--wx-calendar-cell-size) - var(--wx-calendar-line-gap) * 2
		);
		margin: calc(var(--wx-calendar-line-gap) / 2) 0;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.wx-day:not(.wx-out):not(.wx-selected) {
		cursor: pointer;
	}
	.wx-day:not(.wx-out):not(.wx-selected):hover {
		background: var(--wx-background-hover);
	}
	.wx-day.wx-out {
		color: var(--wx-color-font-disabled);
	}
	.wx-day.wx-selected:not(.wx-out) {
		background: var(--wx-color-primary);
		color: var(--wx-color-primary-font);
	}
	.wx-day.wx-selected.wx-left:not(.wx-out) {
		border-radius: calc(var(--wx-calendar-border-radius)) 0 0
			calc(var(--wx-calendar-border-radius));
	}
	.wx-day.wx-selected.wx-right:not(.wx-out) {
		border-radius: 0 calc(var(--wx-calendar-border-radius))
			calc(var(--wx-calendar-border-radius)) 0;
	}
	.wx-day.wx-inrange:not(.wx-out) {
		border-radius: 0;
		background: var(--wx-color-primary-selected);
	}
	.wx-day.wx-weekend:not(.wx-selected):not(.wx-out) {
		color: var(--wx-color-primary);
	}
	.wx-day.wx-inactive {
		pointer-events: none;
	}

</style>