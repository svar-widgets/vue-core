<script setup>
import { computed, inject } from "vue";
import { defaultLocale } from "./helpers/locale";

defineOptions({ name: "CorePager", inheritAttrs: false });

const props = defineProps({
  total: { default: 0 },
  onchange: {},
});

const pageSize = defineModel("pageSize", { default: 20 });
const value = defineModel("value", { default: 1 });

const i18n = inject("wx-i18n");
const _ = (i18n || defaultLocale()).getGroup("core");

const pageCount = computed(() => Math.ceil(props.total / pageSize.value));
const from = computed(() => (value.value - 1) * pageSize.value);
const to = computed(() => Math.min(value.value * pageSize.value, props.total));

const setValue = (v) => {
  value.value = v;
  setTimeout(() => {
    props.onchange &&
      props.onchange({ value: value.value, from: from.value, to: to.value });
  });
};

function setActivePage(id) {
  switch (id) {
    case "first":
      setValue(1);
      break;
    case "prev":
      setValue(value.value - 1);
      break;
    case "next":
      setValue(value.value + 1);
      break;
    case "last":
      setValue(pageCount.value);
      break;
  }
}

const oninput = (e) => {
  const newValue = +e.target.value;

  if (Number.isNaN(newValue) || newValue < 1 || newValue > pageCount.value) {
    return;
  }

  setValue(newValue);
};

const onPageSizeInput = (e) => {
  props.onchange &&
    props.onchange({ value: +e.target.value, from: from.value, to: to.value });
};
</script>

<template>
  <div class="wx-pager">
    <div class="wx-left">
      <span>{{ _("Rows per page") }}: </span>
      <input
        type="number"
        v-model="pageSize"
        min="1"
        @input="onPageSizeInput"
      />
    </div>

    <div class="wx-center">
      <i
        class="wx-icon wxi-angle-dbl-left"
        :class="{ 'wx-disabled': value === 1 }"
        @click="() => value > 1 && setActivePage('first')"
      ></i>
      <i
        class="wx-icon wxi-angle-left"
        :class="{ 'wx-disabled': value === 1 }"
        @click="() => setActivePage('prev')"
      ></i>
      <input type="text" :value="value" @input="oninput" />
      <i
        class="wx-icon wxi-angle-right"
        :class="{ 'wx-disabled': value === pageCount }"
        @click="() => setActivePage('next')"
      ></i>
      <i
        class="wx-icon wxi-angle-dbl-right"
        :class="{ 'wx-disabled': value === pageCount }"
        @click="() => setActivePage('last')"
      ></i>
    </div>

    <div class="wx-right">{{ _("Total pages") }}: {{ pageCount }}</div>
  </div>
</template>


<style scoped>

	.wx-pager {
		display: flex;
		flex-wrap: wrap;
		gap: var(--wx-padding);
		align-items: center;
		padding: var(--wx-padding);
	}

	input {
		display: block;
		width: 50px;
		height: var(--wx-input-height);
		padding: var(--wx-input-padding);
		outline: none;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-font-color);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		background: var(--wx-input-background);
	}
	input:focus {
		border: var(--wx-input-border-focus);
	}
	input::placeholder {
		color: var(--wx-input-placeholder-color);
	}

	.wx-icon {
		cursor: pointer;
		padding: var(--wx-input-padding);
		border-radius: var(--wx-input-border-radius);
		font-size: var(--wx-icon-size);
		line-height: 1;
		color: var(--wx-color-link);
	}
	.wx-icon:before {
		display: block;
	}
	.wx-icon:hover {
		background-color: var(--wx-background-hover);
	}
	.wx-icon.wx-disabled {
		cursor: default;
		pointer-events: none;
		color: var(--wx-color-font-disabled);
	}

	.wx-left,
	.wx-center,
	.wx-right {
		display: flex;
		align-items: center;
		gap: var(--wx-padding);
	}

</style>