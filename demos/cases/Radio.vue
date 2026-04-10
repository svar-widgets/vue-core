<script setup>
defineOptions({ name: "DemoRadio" });
import { ref } from "vue";
import { RadioButton, RadioButtonGroup, Field } from "../../src/index";

const value = ref(1);

const options = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
  { id: 4, label: "Option 4" },
  { id: 5, label: "Option 5" },
];

const radioGroupValue = ref(4);

</script>

<template>
  <div class="demo-box">
    <h3>RadioButton</h3>
    <Field>
      <RadioButton label="Option 1" :value="true" input-value="1" name="a1" />
      &nbsp;
      <RadioButton label="Option 2" input-value="2" name="a1" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>RadioButton with side label</h3>
    <Field label="Radio 1" position="left" type="checkbox">
      <RadioButton name="a2" />
    </Field>
    <Field label="Radio 2" position="left" type="checkbox">
      <RadioButton name="a2" />
    </Field>
    <Field label="Disabled" position="left" type="checkbox">
      <RadioButton label="Default" disabled name="a2" />
    </Field>
    <Field label="Checked" position="left" type="checkbox">
      <RadioButton label="Checked" :value="true" name="a2" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>RadioButton group ( {{ value }} )</h3>
    <Field label="Radio group" position="left" type="checkbox">
      <RadioButtonGroup :options="options" v-model:value="value" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>RadioButton group: inline</h3>
    <Field label="Radio group" position="left" type="checkbox">
      <RadioButtonGroup :options="options" type="inline" :value="3" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>RadioButton group: grid; selected {{ radioGroupValue }}</h3>
    <Field label="Radio group" position="left" type="checkbox">
      <RadioButtonGroup :options="options" type="grid" v-model:value="radioGroupValue" />
    </Field>
  </div>
</template>
