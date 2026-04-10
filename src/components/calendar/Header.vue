<script setup>
import { dateToString, getDuodecade } from "@svar-ui/lib-dom";
import { inject, computed } from "vue";

defineOptions({ name: "CoreHeader" });

const props = defineProps(["date", "type", "part", "onshift"]);

const { calendar, formats } = inject("wx-i18n").getRaw();

const year = computed(() => props.date.getFullYear());
const label = computed(() => {
  switch (props.type) {
    case "month":
      return dateToString(formats.monthYearFormat, calendar)(props.date);
    case "year":
      return dateToString(formats.yearFormat, calendar)(props.date);
    case "duodecade": {
      const { start, end } = getDuodecade(year.value);
      const yearFormat = dateToString(formats.yearFormat, calendar);
      return `${yearFormat(new Date(start, 0, 1))} - ${yearFormat(new Date(end, 11, 31))}`;
    }
    default:
      return "";
  }
});
function changeType() {
  props.onshift && props.onshift({ diff: 0, type: props.type });
}
</script>

<template>
  <div class="wx-header">
    <template v-if="props.part != 'right'">
      <i
        class="wx-pager wxi-angle-left"
        @click="() => props.onshift && props.onshift({ diff: -1, type: props.type })"
      ></i>
    </template>
    <template v-else>
      <span class="wx-spacer"></span>
    </template>

    <span class="wx-label" @click="changeType">{{ label }}</span>

    <template v-if="props.part != 'left'">
      <i
        class="wx-pager wxi-angle-right"
        @click="() => props.onshift && props.onshift({ diff: 1, type: props.type })"
      ></i>
    </template>
    <template v-else>
      <span class="wx-spacer"></span>
    </template>
  </div>
</template>


<style scoped>

	.wx-header {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		margin-bottom: calc(var(--wx-calendar-gap) * 2);
		font-size: var(--wx-calendar-header-font-size);
		line-height: var(--wx-calendar-header-line-height);
		font-weight: var(--wx-calendar-header-font-weight);
	}

	.wx-spacer,
	.wx-pager {
		width: var(--wx-calendar-cell-size);
		height: var(--wx-calendar-cell-size);
		flex-shrink: 0;
	}
	.wx-pager {
		cursor: pointer;
		border-radius: 50%;
		line-height: 1;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		user-select: none;
		color: var(--wx-calendar-icon-color);
		font-size: var(--wx-calendar-icon-size);
	}
	.wx-pager:before {
		display: block;
	}
	.wx-pager:hover {
		background-color: var(--wx-background-hover);
	}

	.wx-label {
		flex: 0 0 calc(100% - var(--wx-calendar-cell-size) * 2);
		max-width: calc(100% - var(--wx-calendar-cell-size) * 2);
		text-align: center;
		color: var(--wx-color-link);
		cursor: pointer;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

</style>