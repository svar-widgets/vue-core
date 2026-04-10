<script setup>
defineOptions({ name: "DemoSelect" });
import { ref } from 'vue'
import { Select, Field } from '../../src/index'
import { users } from '../data/userlist'

const v1 = ref(98)
const v2 = ref(97)
</script>

<template>
  <div class="demo-box">
    <h3>Select with a top label</h3>
    <Field label="Details">
      <Select v-model:value="v1" :options="users" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Select with a side label</h3>
    <Field label="Details" position="left">
      <Select v-model:value="v2" :options="users" />
    </Field>
    <Field label="Disabled" position="left">
      <Select disabled :options="users" />
    </Field>
    <Field label="Error" position="left" error>
      <Select error :options="users" title="Invalid option" />
    </Field>
  </div>
</template>
