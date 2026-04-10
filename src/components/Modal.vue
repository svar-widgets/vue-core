<script setup>
import { ref, onMounted, inject } from "vue";
import Button from "./Button.vue";
import { defaultLocale } from "./helpers/locale";

defineOptions({ name: "CoreModal" });

const props = defineProps({
  title: { default: "" },
  buttons: { default: () => ["cancel", "ok"] },
  header: {},
  children: {},
  footer: {},
  onconfirm: {},
  oncancel: {},
});

const _ = (inject("wx-i18n") || defaultLocale()).getGroup("core");

function keydown(ev) {
  switch (ev.code) {
    case "Enter": {
      const from = ev.target.tagName;
      if (from === "TEXTAREA" || from === "BUTTON") return;
      props.onconfirm && props.onconfirm({ event: ev });
      break;
    }
    case "Escape":
      props.oncancel && props.oncancel({ event: ev });
      break;
  }
}

function onclick(ev, button) {
  const pack = { event: ev, button };
  if (button === "cancel") {
    props.oncancel && props.oncancel(pack);
  } else {
    props.onconfirm && props.onconfirm(pack);
  }
}

const modal = ref(null);
onMounted(() => {
  if (modal.value) modal.value.focus();
});
</script>

<template>
  <transition name="wx-modal-overlay-fade" appear>
    <div
      class="wx-modal"
      ref="modal"
      tabindex="0"
      @keydown="keydown"
    >
      <div class="wx-window">
        <template v-if="props.header">
          <component :is="props.header" />
        </template>
        <template v-else-if="props.title">
          <div class="wx-header">{{ props.title }}</div>
        </template>
        <div>
          <slot />
        </div>
        <template v-if="$slots.footer">
          <slot name="footer" />
        </template>
        <template v-else-if="props.buttons">
          <div class="wx-buttons">
            <div class="wx-button" v-for="button in props.buttons" :key="button">
              <Button
                :type="`block ${button === 'ok' ? 'primary' : 'secondary'}`"
                :onclick="(ev) => onclick(ev, button)"
              >
                {{ _(button) }}
              </Button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<style>
.wx-modal-overlay-fade-enter-from,
.wx-modal-overlay-fade-leave-to {
  opacity: 0;
}
.wx-modal-overlay-fade-enter-active,
.wx-modal-overlay-fade-leave-active {
  transition: opacity 100ms;
}
</style>


<style scoped>

	.wx-modal {
		position: fixed;
		z-index: var(--wx-modal-z-index);
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background: var(--wx-modal-backdrop);
		text-align: center;
	}

	.wx-window {
		background: var(--wx-modal-background);
		box-shadow: var(--wx-modal-shadow);
		border: var(--wx-modal-border);
		border-radius: var(--wx-modal-border-radius);
		padding: var(--wx-modal-padding);
		min-width: var(--wx-modal-width);
	}

	.wx-header {
		font-family: var(--wx-modal-header-font-family);
		font-size: var(--wx-modal-header-font-size);
		line-height: var(--wx-modal-header-line-height);
		font-weight: var(--wx-modal-header-font-weight);
		color: var(--wx-modal-header-font-color);
		margin-bottom: var(--wx-modal-gutter);
	}

	.wx-buttons {
		margin-top: var(--wx-modal-gutter);
		display: flex;
		justify-content: center;
		margin-left: calc(var(--wx-modal-gutter) / -2);
		margin-right: calc(var(--wx-modal-gutter) / -2);
	}

	.wx-buttons > .wx-button {
		flex: 1;
		max-width: 50%;
		padding: 0 calc(var(--wx-modal-gutter) / 2);
	}

</style>