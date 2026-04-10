<script setup>
defineOptions({ name: "DemoCounter" });
import { ref } from "vue";
import { Counter, Field } from "../../src/index";

const v1 = ref(5);
const v2 = ref(3);
const v3 = ref(29);
const v4 = ref(0);

function handleChange({ input, value }) {
  if (!input) v4.value = value;
}
</script>

<template>
  <div class="demo-box">
    <Field label="No initial value">
      <Counter />
    </Field>

    <Field label="Initial value">
      <Counter v-model:value="v1" />
      <div>The value is: {{ v1 }}</div>
    </Field>

    <Field label="Custom step">
      <Counter v-model:value="v2" :step="3" />
    </Field>

    <Field label="With negative numbers">
      <Counter :min="-Infinity" />
    </Field>

    <Field label="With custom min and max values (-30, 30)">
      <Counter :min="-30" :max="30" v-model:value="v3" />
    </Field>

    <Field label="Handling change event">
      <Counter :onchange="handleChange" />
      <div>The value is: {{ v4 }}</div>
    </Field>

    <Field label="Disabled">
      <Counter disabled />
    </Field>

    <Field label="Readonly">
      <Counter readonly />
    </Field>

    <Field label="Error">
      <Counter error />
    </Field>
  </div>
</template>
