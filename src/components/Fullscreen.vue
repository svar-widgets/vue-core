<script setup>
defineOptions({ name: "CoreFullscreen" });

import { ref, computed, onMounted, onUnmounted, useSlots } from "vue";
import { hotkeys } from "@svar-ui/lib-dom";
import { subscribe } from "@svar-ui/lib-vue";
import Button from "./Button.vue";

const props = defineProps({
	hotkey: { default: null },
});

const slots = useSlots();

const node = ref(null);
const inFullscreen = ref(false);
const icon = computed(() => `wxi-${inFullscreen.value ? "collapse" : "expand"}`);
const hk = subscribe(hotkeys);

function toggleFullscreen() {
	if (!inFullscreen.value && node.value) {
		node.value.requestFullscreen();
	} else if (inFullscreen.value) {
		document.exitFullscreen();
	}
	inFullscreen.value = !inFullscreen.value;
}

const setFullscreenState = () => {
	inFullscreen.value = document.fullscreenElement === node.value;
};

onMounted(() => {
	if (props.hotkey && hk.value && node.value) {
		hk.value.configure(
			{ [props.hotkey]: toggleFullscreen },
			node.value
		);
	}

	document.addEventListener("fullscreenchange", setFullscreenState);
});

onUnmounted(() => {
	document.removeEventListener("fullscreenchange", setFullscreenState);
});
</script>

<template>
	<div class="wx-fullscreen" ref="node" tabindex="-1">
		<slot />
		<slot v-if="slots.toggleButton" name="toggleButton" :onclick="toggleFullscreen" :in-fullscreen="inFullscreen" />
		<template v-else>
			<Button css="wx-fullscreen-button" :onclick="toggleFullscreen">
				<i :class="`${icon} wx-fullscreen-icon`"> </i>
			</Button>
		</template>
	</div>
</template>

<style scoped>
	.wx-fullscreen::backdrop {
		background-color: var(--wx-background);
	}
	.wx-fullscreen {
		position: relative;
		height: 100%;
		width: 100%;
		outline: none;
	}
	.wx-fullscreen-icon {
		font-size: 20px;
		height: 20px;
		margin: auto;
	}
	.wx-fullscreen :deep(.wx-fullscreen-button) {
		width: 40px;
		height: 40px;
		border: none;
		border-radius: 50%;
		position: absolute;
		right: 25px;
		bottom: 35px;
		display: flex;
		padding: initial;
	}
</style>
