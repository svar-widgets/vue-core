<script setup>
import { ref, provide } from "vue";

defineOptions({ name: "CoreGlobals", inheritAttrs: false });

import Notices from "./Notices.vue";
import Modal from "./Modal.vue";

import { uid } from "@svar-ui/lib-dom";

const props = defineProps({});

const modal = ref(null);
function showModal(msg) {
  modal.value = { ...msg };
  return new Promise((res, rej) => {
    modal.value.resolve = v => {
      modal.value = null;
      res(v);
    };
    modal.value.reject = v => {
      modal.value = null;
      rej(v);
    };
  });
}

const notices = ref([]);
function showNotice(msg) {
  msg = { ...msg };
  msg.id = msg.id || uid();
  msg.remove = () => (notices.value = notices.value.filter(a => a.id !== msg.id));

  if (msg.expire != -1) {
    setTimeout(msg.remove, msg.expire || 5100);
  }
  notices.value = [...notices.value, msg];
}

provide("wx-helpers", {
  showNotice,
  showModal,
});
</script>

<template>
  <slot />
  <Modal
    v-if="modal"
    :title="modal.title"
    :buttons="modal.buttons"
    :onconfirm="modal.resolve"
    :oncancel="modal.reject"
  >
    {{ modal.message }}
  </Modal>
  <Notices :data="notices" />
</template>