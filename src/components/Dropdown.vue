<script setup>
import { ref, computed, onMounted } from 'vue';
import Portal from './Portal.vue';
import Popup from './Popup.vue';
import InlineDropdown from './helpers/InlineDropdown.vue';

defineOptions({ name: 'CoreDropdown', inheritAttrs: false });

const props = defineProps({
  position: { default: 'bottom' },
  align: { default: 'start' },
  autoFit: { default: true },
  inline: { default: false },
  oncancel: { type: Function },
  width: { default: '100%' },
});

const target = ref(null);
const node = ref(null);

const at = computed(() => `${props.position}-${props.align}`);

onMounted(() => {
  // get the parent element before
  // the popup is moved to the portal
  target.value = node.value?.parentNode;
});
</script>

<template>
  <InlineDropdown
    v-if="inline"
    :oncancel="oncancel"
    :position="position"
    :align="align"
    :auto-fit="autoFit"
    :width="width"
    v-bind="$attrs"
  >
    <slot />
  </InlineDropdown>
  <template v-else>
    <Portal>
      <Popup
        :parent="target"
        :at="at"
        :oncancel="oncancel"
        :width="width"
        v-bind="$attrs"
      >
        <slot />
      </Popup>
    </Portal>
  </template>

  <span ref="node" class="wx-portal-node"></span>
</template>

<style scoped>
.wx-portal-node {
  display: none;
}
</style>
