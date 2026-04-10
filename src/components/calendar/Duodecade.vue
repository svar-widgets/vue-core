<script setup>
import { inject, computed } from "vue";
import { asDirective } from "@svar-ui/lib-vue";
import { getDuodecade, delegateClick } from "@svar-ui/lib-dom";
import Button from "./Button.vue";
import { getPartValue } from "./helpers";

defineOptions({ name: "CoreDuodecade" });

const props = defineProps({
  oncancel: { default: undefined },
  onchange: { default: undefined },
  onshift: { default: undefined },
  part: { default: undefined },
});

const _ = inject("wx-i18n").getRaw().calendar;

const value = defineModel("value", { default: undefined });
const current = defineModel("current", { default: undefined });

const year = computed(() => current.value.getFullYear());
const years = computed(() => {
  const { start, end } = getDuodecade(year.value);
  const yearsArr = [];
  for (let y = start; y <= end; ++y) {
    yearsArr.push(y);
  }
  return yearsArr;
});

function selectYear(year, e) {
  if (year) {
    e.stopPropagation();
    current.value.setFullYear(year);
    current.value = new Date(current.value);

    props.onshift && props.onshift({});
  }

  if (props.part === "normal") value.value = new Date(current.value);

  props.oncancel && props.oncancel();
}

function done() {
  const date = new Date(getPartValue(value.value, props.part) || current.value);

  date.setFullYear(current.value.getFullYear());

  props.onchange && props.onchange(date);
}

const selectYears = {
  click: selectYear,
};

const vDelegateClick = asDirective(delegateClick);
</script>

<template>
  <div class="wx-years" v-delegate-click="selectYears">
    <div
      v-for="(y, i) in years" :key="y"
      class="wx-year"
      :class="{ 'wx-current': year === y, 'wx-prev-decade': i === 0, 'wx-next-decade': i === 11 }"
      :data-id="y"
    >
      {{ y }}
    </div>
  </div>
  <div class="wx-buttons">
    <Button :onclick="done">{{ _.done }}</Button>
  </div>
</template>


<style scoped>

	.wx-years {
		display: flex;
		flex-wrap: wrap;
		margin: var(--wx-calendar-gap);
	}

	.wx-year {
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
	.wx-year.wx-current {
		background: var(--wx-color-primary);
		color: var(--wx-color-primary-font);
	}
	.wx-year:not(.wx-current):hover {
		background-color: var(--wx-background-hover);
	}
	.wx-prev-decade,
	.wx-next-decade {
		color: var(--wx-color-font-disabled);
	}
	.wx-buttons {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		margin-top: var(--wx-calendar-gap);
	}

</style>