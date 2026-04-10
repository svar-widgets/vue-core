<script setup>
defineOptions({ name: "DemoIcon" });
import { Icon } from "../../src/index";
import { icons } from "../data/icons";

const arrs = [];
// split icons in block of 10 icons each
for (let i = 0; i < icons.length; i += 16) {
  arrs.push(icons.slice(i, i + 16));
}
</script>

<template>
  <div class="demo-box">
    <h3>Icons</h3>
    <div v-for="(subset, i) in arrs" :key="i">
      <Icon v-for="icon in subset" :key="icon" :title="icon" :css="icon" />
    </div>
  </div>
</template>