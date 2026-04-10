<script setup>
import { ref } from 'vue'
import { TimePicker, Field, Locale } from '../../src/index'
import { cn } from '@svar-ui/core-locales'

const value = ref(new Date(0, 0, 0, 13, 20))
</script>

<template>
  <div class="demo-box">
    <h3>TimePicker</h3>
    <Field label="Initial value" position="left">
      <TimePicker v-model:value="value" />
    </Field>
    <Field label="Default value" position="left">
      <TimePicker />
    </Field>
  </div>

  <div class="demo-box">
    <h3>TimePicker with a side label</h3>
    <Field label="Time" position="left">
      <TimePicker v-model:value="value" />
    </Field>
    <Field label="Disabled" position="left">
      <TimePicker v-model:value="value" disabled />
    </Field>
    <Field label="Error" position="left" error>
      <TimePicker v-model:value="value" error title="Invalid option" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>TimePicker with a dropdown that matches the input width</h3>
    <Field label="Time" position="left">
      <TimePicker :dropdown="{ width: '100%' }" v-model:value="value" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>12-hour TimePicker</h3>
    <Locale
      :words="{
        formats: { timeFormat: '%g:%i %a' },
        calendar: { clockFormat: 12 }
      }"
    >
      <Field>
        <TimePicker v-model:value="value" />
      </Field>
    </Locale>
  </div>

  <div class="demo-box">
    <h3>CN locale</h3>
    <Locale :words="cn">
      <Field>
        <TimePicker v-model:value="value" />
      </Field>
    </Locale>
  </div>
</template>
