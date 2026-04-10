<script setup>
defineOptions({ name: "DemoMonth" });
import { inject } from "vue";
import { Month } from "../../src/index";

const helpers = inject("wx-helpers");

const value = new Date(2025, 4, 1);
const addMonth = (date, n) => {
  const next = new Date(date);
  next.setMonth(next.getMonth() + n);
  return next;
};

function onchange(date) {
  helpers.showNotice({
    text: "click on " + date.toString().substring(0, 15),
  });
}
</script>

<template>
  <div class="demo-box">
    <h3>Month view</h3>
    <div class="row">
      <div class="cell">
        <Month :current="addMonth(value, 0)" :onchange="onchange" />
      </div>
      <div class="cell">
        <Month :current="addMonth(value, 1)" :onchange="onchange" />
      </div>
      <div class="cell">
        <Month :current="addMonth(value, 2)" :onchange="onchange" />
      </div>
    </div>
  </div>

  <div class="demo-box custom">
    <h3>Month view with custom styles</h3>
    <Month :current="new Date(2022, 2, 18)" />
  </div>
</template>


<style scoped>

	.custom {
		--wx-calendar-cell-size: 64px;
		--wx-color-font-disabled: transparent;
	}
	.custom :deep(.days .day) {
		padding: 3px;
		align-items: start;
		justify-content: left;
	}
	.custom :deep(.weekdays .weekday) {
		padding: 3px;
		text-align: left;
	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		gap: 4px;
		flex-wrap: wrap;
	}

	.cell {
		margin: 20px;
		width: 220px;
	}

</style>
