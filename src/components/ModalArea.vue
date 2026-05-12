<script setup>
defineOptions({ name: "CoreModalArea" });
</script>

<template>
  <transition name="fade" appear>
    <div class="wx-modal">
      <div class="wx-window">
        <slot />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 100ms;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


<style scoped>

	.wx-modal {
		position: fixed;
		z-index: var(--wx-modal-z-index);
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--wx-modal-backdrop);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.wx-window {
		background: var(--wx-modal-background);
		box-shadow: var(--wx-modal-shadow);
		border: var(--wx-modal-border);
		border-radius: var(--wx-modal-border-radius);
		min-width: var(--wx-modal-width);
	}

</style>