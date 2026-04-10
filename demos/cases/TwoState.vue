<script setup>
import { TwoState } from "../../src/index";
import { inject, ref } from "vue";

const buttonState = ref(true);

const { showNotice } = inject("wx-helpers");
function onclick() {
  showNotice({
    text: "TwoState clicked",
  });
}
</script>

<template>
  <div class="demo-box">
    <h3>Default TwoState Button</h3>
    <TwoState :onclick="onclick">
      Click Me 
      <template #active>
        <span>Working...</span>
      </template>
    </TwoState>
    &nbsp;
    <TwoState :disabled="true" :onclick="onclick">Click Me</TwoState>
  </div>

  <div class="demo-box">
    <h3>Primary TwoState Button</h3>
    <TwoState type="primary" :onclick="onclick">Click Me</TwoState>
    &nbsp;
    <TwoState type="primary" :disabled="true" :onclick="onclick">Click Me</TwoState>
  </div>

  <div class="demo-box">
    <h3>Secondary TwoState Button</h3>
    <TwoState type="secondary" :onclick="onclick">Click Me</TwoState>
    &nbsp;
    <TwoState type="secondary" :disabled="true" :onclick="onclick">Click Me</TwoState>
  </div>

  <div class="demo-box">
    <h3>Danger TwoState Button</h3>
    <TwoState type="danger" :onclick="onclick">Click Me</TwoState>
    &nbsp;
    <TwoState type="danger" :disabled="true" :onclick="onclick">Click Me</TwoState>
  </div>

  <div class="demo-box">
    <h3>Icon TwoState Buttons</h3>
    <div class="demo-row">
      <TwoState icon="wxi-alert">With Icon</TwoState>
      <TwoState type="primary" icon="wxi-alert" icon-active="wxi-check">With Icon</TwoState>
      <TwoState type="secondary" icon="wxi-alert">With Icon</TwoState>
      <TwoState icon="wxi-alert" />
      <TwoState type="primary" icon="wxi-alert" />
      <TwoState type="secondary" icon="wxi-alert" />
      <TwoState type="danger" icon="wxi-alert" />
      <TwoState disabled icon="wxi-alert" />
    </div>
  </div>

  <div class="demo-box">
    <h3>Disabled</h3>
    <p>
      <TwoState type="primary" v-model:value="buttonState" disabled>Primary On</TwoState>
      &nbsp;
      <TwoState type="primary" disabled>Primary Off</TwoState>
    </p>
    <p>
      <TwoState title="disabled button" type="secondary" v-model:value="buttonState" disabled>
        Secondary On
      </TwoState>
      &nbsp;
      <TwoState type="secondary" disabled>Secondary Off</TwoState>
    </p>
  </div>
</template>