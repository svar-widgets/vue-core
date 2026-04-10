<script setup>
import { clickOutside } from "@svar-ui/lib-dom";
import { asDirective } from "@svar-ui/lib-vue";

defineOptions({ name: "CoreSideArea" });

const props = defineProps({
  position: { default: "right" },
  oncancel: {}
});

const vClickOutside = asDirective(clickOutside);
</script>

<template>
  <div
    v-click-outside="() => props.oncancel && props.oncancel()"
    :class="['wx-sidearea', `wx-pos-${props.position}`]"
  >
    <slot />
  </div>
</template>


<style scoped>

	.wx-sidearea {
		position: absolute;
		z-index: var(--wx-popup-z-index);
		background: var(--wx-modal-background);
		box-shadow: var(--wx-modal-shadow);
		border: var(--wx-modal-border);
		border-radius: var(--wx-modal-border-radius);
		min-width: var(--wx-modal-width);
		height: 100vh;
		max-height: 100%;
	}
	.wx-sidearea.wx-pos-right {
		right: 0;
		top: 0;
	}

</style>