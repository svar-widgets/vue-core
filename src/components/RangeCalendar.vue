<script setup>
import { ref, watch } from "vue";
import Panel from "./calendar/Panel.vue";
import Locale from "../Locale.vue";

defineOptions({ name: "CoreRangeCalendar", inheritAttrs: false });

const start = defineModel("start");
const end = defineModel("end");

const props = defineProps({
  current: {},
  months: { default: 2 },
  markers: { default: null },
  buttons: { default: () => ["clear", "today"] },
  css: { default: "" },
  onchange: {},
});

function addMonth(l, diff, rPrev) {
  const r = new Date(l);
  r.setMonth(r.getMonth() + diff);
  if (rPrev && r.valueOf() == rPrev.valueOf()) return rPrev;
  return r;
}

const leftCurrent = ref();
const rightCurrent = ref();

watch(
  () => [start.value, props.current],
  () => {
    if (!leftCurrent.value) {
      onLeft(start.value ? new Date(start.value) : props.current || new Date());
    }
  },
  { immediate: true }
);

function onLeft(v) {
  leftCurrent.value = v;
  if (leftCurrent.value) leftCurrent.value.setDate(1);
  if (leftCurrent.value) rightCurrent.value = addMonth(leftCurrent.value, 1);
}
function onRight(v) {
  rightCurrent.value = v;
  if (rightCurrent.value) rightCurrent.value.setDate(1);
  if (rightCurrent.value) leftCurrent.value = addMonth(rightCurrent.value, -1);
}

function doChangeStart(v) {
  selectChange(v);
  if (start.value) onLeft(new Date(start.value));
}
function doChangeEnd(v) {
  selectChange(v);
  if (end.value) onRight(new Date(end.value));
}
function selectChange(ev) {
  const v = ev.value;
  const final = v === -1;
  if (!final) {
    if (ev.select) {
      if (!start.value || end.value) {
        start.value = v;
        end.value = null;
      } else {
        if (start.value > v) {
          end.value = start.value;
          start.value = v;
        } else {
          end.value = v;
        }
      }
    } else {
      if (!v) {
        start.value = null;
        end.value = null;
      } else {
        start.value = new Date(v);
        end.value = new Date(v);
      }
    }
  }

  if (final || !props.buttons.includes("done"))
    props.onchange && props.onchange({ start: start.value, end: end.value });
}
</script>

<template>
  <Locale>
    <template v-if="props.months == 1">
      <Panel
        :value="{ start, end }"
        v-model:current="leftCurrent"
        :markers="props.markers"
        :buttons="props.buttons"
        :css="props.css"
        part="both"
        :onchange="doChangeStart"
      />
    </template>
    <template v-else>
      <div :class="['wx-rangecalendar', props.css]">
        <div class="wx-half">
          <Panel
            :value="{ start, end }"
            v-model:current="leftCurrent"
            :markers="props.markers"
            :buttons="false"
            part="left"
            :onshift="() => onLeft(leftCurrent)"
            :onchange="doChangeStart"
          />
        </div>
        <div class="wx-half">
          <Panel
            :value="{ start, end }"
            v-model:current="rightCurrent"
            :markers="props.markers"
            :buttons="props.buttons"
            part="right"
            :onshift="() => onRight(rightCurrent)"
            :onchange="doChangeEnd"
          />
        </div>
      </div>
    </template>
  </Locale>
</template>


<style scoped>

	.wx-rangecalendar {
		display: flex;
		padding-bottom: var(--wx-calendar-padding);
	}

	.wx-half {
		flex: 1;
	}

</style>