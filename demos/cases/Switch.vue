<script setup>
defineOptions({ name: "DemoSwitch" });
import { ref } from 'vue';
import { Switch, Field } from '../../src/index';

const v1 = ref(true);
const v2 = ref(false);
</script>

<template>
  <div class="demo-box">
    <h3>Switch Button</h3>
    <Field>
      <Switch v-model:value="v1" />
    </Field>
  </div>

  <div class="demo-box">
    <h3>Switch Button with a side label</h3>
    <Field :label="`Switch: ${v2}`" position="left" type="switch">
      <Switch v-model:value="v2" />
    </Field>
    <Field label="Disabled" position="left" type="switch">
      <Switch disabled />
    </Field>
  </div>
</template>
