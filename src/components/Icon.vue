<script setup>
import { useSlots, computed } from 'vue';

defineOptions({ name: 'CoreIcon' });

const props = defineProps({
  css: { default: '' },
  title: { default: '' },
  onclick: {},
});

const slots = useSlots();
const hasChildren = computed(() => !!slots.default);
</script>

<template>
  <i
    v-if="hasChildren"
    role="img"
    :title="props.title"
    :class="['wx-icon', props.css]"
    @click="props.onclick"
  >
    <slot />
  </i>
  <i
    v-else
    :title="props.title"
    :class="['wx-icon', props.css]"
    @click="props.onclick"
  ></i>
</template>


<style scoped>

	.wx-icon {
		color: var(--wx-color-font-alt);
		cursor: pointer;
		font-size: var(--wx-button-icon-size);
		padding: var(--wx-button-icon-indent);

		line-height: var(--wx-button-line-height);
		display: inline-block;
	}
	.wx-icon:hover {
		background-color: var(--wx-background-hover);
	}

</style>