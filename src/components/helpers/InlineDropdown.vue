<script setup>
import { ref, watchEffect } from 'vue';
import { clickOutside } from '@svar-ui/lib-dom';
import { asDirective } from '@svar-ui/lib-vue';

const vClickOutside = asDirective(clickOutside);

const props = defineProps({
	position: { default: 'bottom' },
	align: { default: 'start' },
	autoFit: { default: true },
	oncancel: { type: Function },
	width: { default: '100%' },
	css: { default: '' },
});

const node = ref(null);
const localPosition = ref(props.position);
const localAlign = ref(props.align);

watchEffect(() => {
	localPosition.value = props.position;
	localAlign.value = props.align;

	if (props.autoFit && node.value) {
		const nodeCoords = node.value.getBoundingClientRect();
		const bodyCoords = document.body.getBoundingClientRect();

		if (nodeCoords.right >= bodyCoords.right) {
			localAlign.value = 'end';
		}

		if (nodeCoords.bottom >= bodyCoords.bottom) {
			localPosition.value = 'top';
		}
	}
});

function down(e) {
	props.oncancel?.(e);
}
</script>

<template>
	<div
		v-click-outside="down"
		ref="node"
		:class="['wx-dropdown', `wx-${localPosition}-${localAlign}`, css]"
		:style="{ width: width }"
	>
		<slot />
	</div>
</template>

<style scoped>
.wx-dropdown {
	position: absolute;
	z-index: 5;
	background: var(--wx-popup-background);
	box-shadow: var(--wx-popup-shadow);
	border: var(--wx-popup-border);
	border-radius: var(--wx-popup-border-radius);
	overflow: hidden;
}

.wx-top-center {
	top: 0;
	left: 50%;
	transform: translate(-50%, -100%) translateY(-2px);
}

.wx-top-start {
	top: 0;
	left: 0;
	transform: translateY(-100%) translateY(-2px);
}

.wx-top-end {
	top: 0;
	right: 0;
	transform: translateY(-100%) translateY(-2px);
}

.wx-bottom-center {
	bottom: 0;
	left: 50%;
	transform: translate(-50%, 100%) translateY(2px);
}

.wx-bottom-start {
	bottom: 0;
	left: 0;
	transform: translateY(100%) translateY(2px);
}

.wx-bottom-end {
	bottom: 0;
	right: 0;
	transform: translateY(100%) translateY(2px);
}

.wx-left-center {
	bottom: 50%;
	left: 0;
	transform: translate(-100%, 50%) translateX(-2px);
}

.wx-left-start {
	top: 0;
	left: 0;
	transform: translateX(-100%) translateX(-2px);
}

.wx-left-end {
	bottom: 0;
	left: 0;
	transform: translateX(-100%) translateX(-2px);
}

.wx-right-center {
	bottom: 50%;
	right: 0;
	transform: translate(100%, 50%) translateX(2px);
}

.wx-right-start {
	top: 0;
	right: 0;
	transform: translateX(100%) translateX(2px);
}

.wx-right-end {
	bottom: 0;
	right: 0;
	transform: translateX(100%) translateX(2px);
}
</style>
