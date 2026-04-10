<script setup>
defineOptions({ name: "DemoSegmented" });
import { ref } from "vue";
import { Segmented } from "../../src/index";

const options = [
  {
    id: 1,
    label: "One",
    icon: "wxi-view-sequential",
    title: "Grid mode",
  },
  { id: 2, label: "Two", icon: "wxi-view-grid", title: "Tiles mode" },
  {
    id: 3,
    label: "Three",
    icon: "wxi-view-column",
    title: "Two panels mode",
  },
];

const optionsIcons = options.map(a => ({ ...a, label: null }));
const optionsText = options.map(a => ({ ...a, icon: null }));

const value = ref(2);
</script>

<template>
  <div class="demo-box">
    <h3>Default templates</h3>

    <h4>Segmented Button</h4>
    <Segmented :options="optionsText" v-model:value="value" />

    <h4>Segmented Button with icons</h4>
    <Segmented :options="optionsIcons" v-model:value="value" />

    <h4>Segmented Button with a mixed content</h4>
    <Segmented :options="options" v-model:value="value" />
  </div>

  <div class="demo-box">
    <h3>Custom templates</h3>

    <h4>Segmented Button</h4>
    <Segmented :options="options" v-model:value="value" />

    <h4>Segmented Button with icons</h4>
    <Segmented :options="options" v-model:value="value">
      <template #default="{ option }">
        <i class="icon" :class="option.icon"></i>
      </template>
    </Segmented>

    <h4>Segmented Button with a mixed content</h4>
    <Segmented :options="options" v-model:value="value">
      <template #default="{ option }">
        <i class="icon" :class="option.icon"></i>
        <span class="bottom">{{ option.label }}</span>
      </template>
    </Segmented>
  </div>
</template>


<style scoped>

	.icon {
		height: 48px;
		font-size: 48px;
		line-height: 1;
		color: inherit;
	}
	.bottom {
		display: block;
		text-align: center;
		margin-left: 10px;
	}

</style>