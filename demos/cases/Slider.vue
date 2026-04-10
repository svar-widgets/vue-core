<script setup>
defineOptions({ name: "DemoSlider" });
import { ref } from 'vue'
import { Field, Slider } from '../../src/index'

const valueA = ref(50)
const valueB = ref(50)
const valueC = ref(50)

function onInput({ input, value, previous }) {
  if (input) {
    console.log(`Input change from ${previous} to ${value}`)
  }
}

function onChange({ input, value, previous }) {
  if (!input) {
    console.log(`Final input change from ${previous} to ${value}`)
  }
}
</script>

<template>
  <div class="demo-box">
    <h3>Slider</h3>
    <Field label="Updates from binding" position="left" type="slider">
      <Slider :label="`Progress: ${valueA}%`" v-model:value="valueA" />
    </Field>
    <Field label="Updates from input `change` event" position="left" type="slider">
      <Slider :label="`Progress: ${valueB}%`" v-model:value="valueB" :onchange="onInput" />
    </Field>
    <Field label="Updates from `change` event" position="left" type="slider">
      <Slider :label="`Progress: ${valueC}%`" v-model:value="valueC" :onchange="onChange" />
    </Field>
    <Field label="Disabled" position="left" type="slider">
      <Slider disabled v-model:value="valueA" />
    </Field>
    <Field label="Unset value" position="left" type="slider">
      <Slider title="Default slider's value is 0" />
    </Field>
  </div>
</template>
