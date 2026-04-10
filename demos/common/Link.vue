<script setup>
defineOptions({ name: "DemoLink" });
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
	data: {
		type: Array,
		required: true,
	},
	skin: {
		type: String,
		required: true,
	},
});

const emit = defineEmits(["click"]);

const route = useRoute();

const fullPath = computed(() => {
	return props.data[0].replace(":skin", props.skin);
});

const isActive = computed(() => {
	return route?.path?.startsWith(fullPath.value) ?? false;
});
</script>

<template>
	<router-link :to="fullPath" class="demo" :class="{ active: isActive }" @click="emit('click')">
		{{ data[1] }}
	</router-link>
</template>

<style scoped>
.demo {
	display: flex;
	align-items: center;
	height: 37px;
	font-weight: 400;
	padding-left: 16px;
	border-left: 4px solid transparent;
	color: #595b66;
	list-style: none;
	cursor: pointer;
	text-decoration: none;
}

.demo.active {
	border-left-color: var(--demo-framework-color)
}

.demo.active,
.demo:hover {
	font-weight: 500;
	color: #42454d;
	background-color: #f1f1f1;
}
</style>
