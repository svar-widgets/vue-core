<script setup>
defineOptions({ name: "DemoField" });
import { ref } from 'vue';
import { Text, Field } from "../../src/index";

const v1 = ref("");
const v2 = ref("");
</script>

<template>
  <div class="demo-box">
    <h3>Top Fields</h3>
    <Field label="Text">
      <Text v-model:value="v1" />
    </Field>
    <Field label="Error" error>
      <Text v-model:value="v1" error />
    </Field>
    <Field label="Required" required>
      <Text v-model:value="v1" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Left Field</h3>
    <Field label="Text" position="left">
      <Text v-model:value="v2" />
    </Field>
    <Field label="Error" position="left" error>
      <Text v-model:value="v2" error />
    </Field>
    <Field label="Required" position="left" required>
      <Text v-model:value="v2" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Nested Field controls</h3>
    <Field label="Each control is associated with its closest Field label">
      <Field label="First Name" position="left">
        <Text />
      </Field>
      <Field label="Last Name" position="left">
        <Text />
      </Field>
    </Field>
  </div>
</template>