<script setup>
import Notice from "./Notice.vue";

defineOptions({ name: "CoreNotices" });

const props = defineProps({
  data: { default: () => [] }
});
</script>

<template>
  <div class="wx-notices">
    <Notice v-for="notice in props.data" :key="notice.id" :notice="notice" />
  </div>
</template>


<style scoped>

	.wx-notices {
		position: fixed;
		z-index: var(--wx-notice-z-index);
		top: 0;
		right: 0;
	}

</style>