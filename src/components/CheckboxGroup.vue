<script setup>
import { provide } from "vue";
import Checkbox from "./Checkbox.vue";

defineOptions({ name: "CoreCheckboxGroup", inheritAttrs: false  });

const props = defineProps({
  options: { default: [] },
  type: { default: "" },
  onchange: {}
});

provide("wx-input-id", null);

const value = defineModel('value', { default: [] });

function handleChange(obj) {
  if (obj.value) value.value = [...value.value, obj.inputValue];
  else value.value = value.value.filter(a => a != obj.inputValue);
  props.onchange && props.onchange({ value: value.value });
}
</script>

<template>
  <div :class="['wx-checkboxgroup', props.type && `wx-${props.type}`]">
    <div class="wx-item" v-for="option in props.options" :key="option.id">
      <Checkbox
        :label="option.label"
        :input-value="option.id"
        :value="value.includes(option.id)"
        :onchange="handleChange"
      />
    </div>
  </div>
</template>


<style scoped>

	.wx-checkboxgroup {
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

	.wx-checkboxgroup.wx-inline .wx-item {
		flex: none;
		padding-right: var(--wx-field-gutter);
	}

	.wx-checkboxgroup.wx-grid .wx-item {
		flex: 0 0 50%;
		max-width: 50%;
		padding-right: var(--wx-field-gutter);
	}

</style>