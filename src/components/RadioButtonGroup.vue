<script setup>
import { provide } from "vue";
import { uid } from "@svar-ui/lib-dom";
import RadioButton from "./RadioButton.vue";

defineOptions({ name: "CoreRadioButtonGroup", inheritAttrs: false });

const props = defineProps({
  options: { default: () => [{}] },
  type: { default: "" },
  onchange: {},
});

provide("wx-input-id", null);

const value = defineModel("value");

const name = uid();

function handleChange(ev) {
  value.value = ev.inputValue;
  props.onchange && props.onchange({ value: value.value });
}
</script>

<template>
  <div class="wx-radiogroup" :class="props.type && `wx-${props.type}`">
    <div class="wx-item" v-for="option in props.options" :key="option.id">
      <RadioButton
        :label="option.label"
        :input-value="option.id"
        :value="value === option.id"
        :name="name"
        :onchange="handleChange"
      />
    </div>
  </div>
</template>


<style scoped>

	.wx-radiogroup {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: flex-start;
		margin-top: calc(var(--wx-field-gutter) * -1);
	}
	.wx-item {
		flex: 0 0 100%;
		max-width: 100%;
		margin-top: var(--wx-field-gutter);
	}

	.wx-radiogroup.wx-inline .wx-item {
		flex: none;
		padding-right: var(--wx-field-gutter);
	}

	.wx-radiogroup.wx-grid .wx-item {
		flex: 0 0 50%;
		max-width: 50%;
		padding-right: var(--wx-field-gutter);
	}

</style>