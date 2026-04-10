<script setup>
defineOptions({ name: "DemoCheckbox" });
import { ref } from 'vue'
import { Checkbox, Field, CheckboxGroup } from '../../src/index'

const options = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' },
  { id: 4, label: 'Option 4' },
  { id: 5, label: 'Option 5' },
]

const v1 = ref(true)
const v2 = ref(false)
const v3 = ref(true)

const valueGroup1 = ref([1, 2])
const valueGroup2 = ref([2, 3])
const valueGroup3 = ref([3, 4])

function print(v) {
  return v.join(', ')
}
</script>

<template>
  <div class="demo-box">
    <h3>Checkbox</h3>
    Value:
    {{ v1 }}
    <p>
      <Checkbox label="Check" v-model:value="v1" />
    </p>
    Value:
    {{ v2 }}
    <p>
      <Checkbox label="Uncheck" v-model:value="v2" />
    </p>
  </div>

  <div class="demo-box">
    <h3>Checkbox with a side label</h3>
    <Field label="Checkbox" type="checkbox" position="left">
      <Checkbox />
    </Field>
    <Field label="Disabled" type="checkbox" position="left">
      <Checkbox label="Default" disabled />
    </Field>
    <Field label="Disabled" type="checkbox" position="left">
      <Checkbox label="Checked" disabled v-model:value="v3" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Checkbox group: {{ print(valueGroup1) }}</h3>
    <Field label="Check group" position="left" type="checkbox">
      <CheckboxGroup :options="options" v-model:value="valueGroup1" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Checkbox group inline: {{ print(valueGroup2) }}</h3>
    <Field label="Check group" position="left" type="checkbox">
      <CheckboxGroup :options="options" v-model:value="valueGroup2" type="inline" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Checkbox group grid: {{ print(valueGroup3) }}</h3>
    <Field label="Check group" position="left" type="checkbox">
      <CheckboxGroup :options="options" v-model:value="valueGroup3" type="grid" />
    </Field>
  </div>
</template>
