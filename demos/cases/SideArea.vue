<script setup>
import { ref } from 'vue';
import { Button, ColorPicker, Field, SideArea } from '../../src/index';

const show = ref(false);
</script>

<template>
  <div class="demo-box">
    <h3>Side Area</h3>
    <p>Click button to show the side area</p>
    <Button :onclick="() => (show = !show)">Click me</Button>
    <SideArea v-if="show" :oncancel="() => (show = false)">
      <div class="descr">
        <h3>Some content</h3>
        <Field label="Color">
          <ColorPicker />
        </Field>
      </div>
    </SideArea>
  </div>
</template>


<style scoped>

	.descr {
		text-align: left;
		width: 400px;
		padding: 20px;
	}

</style>