<script setup>
defineOptions({ name: "DemoTabs" });
import { ref, inject } from "vue";
import { Tabs } from "../../src/index";

const { showNotice } = inject("wx-helpers");

const tabs = [
  { id: 0, label: "Info", icon: "wxi-alert" },
  { id: 1, label: "About" },
  { id: 3, label: "", icon: "wxi-check" },
];

const active = ref(2);

function onchange({ value }) {
  showNotice({
    type: "info",
    expire: 2000,
    text: "ID: " + active.value,
  });
}
</script>

<template>
  <div class="demo-box">
    <h3>Tabs</h3>

    <div class="tabbar">
      <Tabs :options="tabs" v-model:value="active" />
      <template v-if="active === 0">
        <div class="body">Info</div>
      </template>
      <template v-else-if="active === 1">
        <div class="body">About</div>
      </template>
      <template v-else>
        <div class="body">Check</div>
      </template>
      <Tabs :options="tabs" v-model:value="active" type="bottom" />
    </div>

    <h3>onchange</h3>
    <Tabs :options="tabs" v-model:value="active" :onchange="onchange" />
  </div>
</template>


<style scoped>
.body {
	height: 200px;
	padding: 20px;
}
.tabbar {
	border-left: var(--wx-border);
	margin-left: 20px;
}
</style>