<script setup>
defineOptions({ name: "DemoPopup" });
import { ref } from "vue";
import { Button, Popup, Slider } from "../../src/index";
import { env } from "@svar-ui/lib-dom";

const node = ref(null);
const isOpen = ref(false);
const mode = ref("bottom");
const parent = ref(null);

function showAt() {
  isOpen.value = true;
  mode.value = "point";
  parent.value = null;
}
function showNext() {
  isOpen.value = true;
  mode.value = "bottom";
  parent.value = node.value;
}
function showCenter(ev) {
  isOpen.value = true;
  mode.value = "center";
  parent.value = env.getTopNode(ev.target);
}

function oncancel() {
  isOpen.value = false;
}
</script>

<template>
  <div class="demo-box">
    <h3>Popup (local)</h3>
    <div class="demo-row">
      <Button :onclick="showAt">Show at position</Button>
      <div ref="node">
        <Button :onclick="showNext">Show next to button</Button>
      </div>
      <Button :onclick="showCenter">Show at center</Button>
    </div>
  </div>

  <Popup
    v-if="isOpen"
    :oncancel="oncancel"
    :at="mode"
    :parent="parent"
    :left="100"
    :top="100"
  >
    <div class="popup">
      <p>Some text here and there</p>
      <p>Some text here and there</p>
      <p>Some text here and there</p>
      <Slider />
    </div>
  </Popup>
</template>


<style scoped>

	.popup {
		padding: 10px 30px;
	}

</style>
