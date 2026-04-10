<script setup>
import { onMounted, onBeforeUnmount, inject, ref } from "vue";
import { env } from "@svar-ui/lib-dom";

defineOptions({ name: "CorePortal" });

const props = defineProps({
  theme: { default: "" },
  target: {}
});

const portal = ref(null);

let handlers = [];
function mount(h) {
  if (handlers) handlers.push(h);
}
defineExpose({ mount });

const resolvedTheme = props.theme || inject("wx-theme");

function getParentRoot(p) {
  const root = env.getTopNode(p);
  while (p !== root && !p.getAttribute("data-wx-portal-root")) {
    p = p.parentNode;
  }
  return p;
}

onMounted(() => {
  let currentTarget = props.target || getParentRoot(portal.value);
  currentTarget.appendChild(portal.value);
  if (handlers) handlers.forEach(h => h());
});

onBeforeUnmount(() => {
  if (portal.value && portal.value.parentNode) portal.value.parentNode.removeChild(portal.value);
});
</script>

<template>
  <div class="wx-portal">
    <div :class="`wx-${resolvedTheme}-theme`" ref="portal">
      <slot :mount="mount" />
    </div>
  </div>
</template>


<style scoped>

	.wx-portal {
		display: none;
	}

</style>