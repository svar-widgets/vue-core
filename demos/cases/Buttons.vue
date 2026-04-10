<script setup>
defineOptions({ name: "DemoButtons" });
import { inject } from "vue";
import { Button } from "../../src/index";

const { showNotice } = inject("wx-helpers");

function onclick() {
  showNotice({
    text: "Button clicked",
  });
}
</script>

<template>
  <div class="demo-box">
    <h3>Default button</h3>
    <Button :onclick="onclick" title="Click me and I will do nothing">Click Me</Button>
    &nbsp;
    <Button :disabled="true" :onclick="onclick">Click Me</Button>
  </div>

  <div class="demo-box">
    <h3>Primary button</h3>
    <Button type="primary" :onclick="onclick">Click Me</Button>
    &nbsp;
    <Button type="primary" :disabled="true" :onclick="onclick">Click Me</Button>
  </div>

  <div class="demo-box">
    <h3>Secondary button</h3>
    <Button type="secondary" :onclick="onclick">Click Me</Button>
    &nbsp;
    <Button type="secondary" :disabled="true" :onclick="onclick">Click Me</Button>
  </div>

  <div class="demo-box">
    <h3>Danger button</h3>
    <Button type="danger" :onclick="onclick">Click Me</Button>
    &nbsp;
    <Button type="danger" :disabled="true" :onclick="onclick">Click Me</Button>
  </div>

  <div class="demo-box">
    <h3>Link button</h3>
    <p>
      <Button type="link" icon="wxi-alert" :onclick="onclick">Click Me</Button>
    </p>
    <p>
      <Button type="link" :onclick="onclick">Click Me</Button>
    </p>
    <p>
      <Button type="link" :disabled="true" :onclick="onclick">Click Me</Button>
    </p>
  </div>

  <div class="demo-box">
    <h3>Block buttons</h3>
    <p>
      <Button type="primary block">Click Me</Button>
    </p>
    <p>
      <Button type="secondary block">Click Me</Button>
    </p>
    <div style="display:flex;">
      <Button type="secondary block">Click Me</Button>
      &nbsp;
      <Button type="primary block">Click Me</Button>
    </div>
  </div>

  <div class="demo-box">
    <h3>Icon buttons</h3>
    <div class="demo-row">
      <Button icon="wxi-alert">With Icon</Button>
      <Button type="primary" icon="wxi-alert">With Icon</Button>
      <Button type="secondary" icon="wxi-alert">With Icon</Button>
      <Button icon="wxi-alert" />
      <Button type="primary" icon="wxi-alert" />
      <Button type="secondary" icon="wxi-alert" />
      <Button type="danger" icon="wxi-alert" />
      <Button :disabled="true" icon="wxi-alert" />
    </div>
  </div>

  <div class="demo-box">
    <h3>Multi-line button</h3>
    <p>
      <Button type="primary">Click me<br />a few times</Button>
    </p>
  </div>
</template>