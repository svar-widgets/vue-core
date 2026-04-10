<script setup>
import { ref } from 'vue'
import { TextArea, Field } from '../../src/index'

const v1 = ref('Hi there!')
const v2 = ref('')
</script>

<template>
  <div class="demo-box">
    <h3>Area with a top label</h3>
    <Field label="Details">
      <TextArea v-model:value="v1" placeholder="Type here" />
    </Field>
    <Field label="Disabled">
      <TextArea v-model:value="v1" :disabled="true" placeholder="Type here" />
    </Field>
    <Field label="Readonly">
      <TextArea v-model:value="v1" :readonly="true" placeholder="Type here" />
    </Field>
    <Field label="Error" :error="true">
      <TextArea
        value="Invalid text"
        :error="true"
        placeholder="Type here"
        title="It can't be empty"
      />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Area with a side label</h3>
    <Field label="Details" position="left">
      <TextArea v-model:value="v2" placeholder="Type here" />
    </Field>
  </div>
</template>
