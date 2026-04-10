<script setup>
defineOptions({ name: "DemoMessages" });
import { ref, inject } from "vue";
import { Modal, Text, TextArea, Button } from "../../src/index";

const { showNotice, showModal } = inject("wx-helpers");

function notice(type, text) {
  showNotice({
    type,
    expire: -1,
    text: text || "Button clicked",
  });
}

async function confirm() {
  try {
    await showModal({
      title: "Confirm",
      message: "Will we do it ?",
    });
  } catch (er) {
    console.log("confirm was rejected", er);
  }
}

function alert() {
  showModal({
    message: "Something happens",
    buttons: ["ok"],
  });
}

const custom1 = ref(false);
const custom2 = ref(false);

function hideAll() {
  custom1.value = false;
  custom2.value = false;
}
</script>

<template>
  <div class="demo-box">
    <h3>Notice</h3>
    <div class="demo-row">
      <Button type="primary" :onclick="() => notice('')">Show Notice</Button>
      <Button :onclick="() => notice('info')">Show Info</Button>
      <Button :onclick="() => notice('warning')">Show Warning</Button>
      <Button :onclick="() => notice('success')">Show Success</Button>
      <Button :onclick="() => notice('danger')">Show Danger</Button>
      <Button :onclick="() => notice('info', 'very long text goes here to show word wrap')">
        Show Long message
      </Button>
    </div>
  </div>

  <div class="demo-box">
    <h3>Confirm / Alert</h3>
    <Button type="primary" :onclick="confirm">Show Confirm</Button>
    <Button :onclick="alert">Show Alert</Button>
  </div>

  <div class="demo-box">
    <h3>Custom dialog</h3>
    <Button type="primary" :onclick="() => (custom1 = !custom1)">
      Show Prompt
    </Button>
    <Modal v-if="custom1" title="Custom Prompt" :onconfirm="hideAll" :oncancel="hideAll">
      <Text :select="true" :focus="true" placeholder="Some text here" />
    </Modal>

    <Button :onclick="() => (custom2 = !custom2)">Show Dialog</Button>
    <Modal v-if="custom2">
      Some text here
      <TextArea placeholder="Some text" />
      <template #footer>
        <div style="margin-top: 20px;">
          <Button :onclick="hideAll">Yes</Button>
          &nbsp;
          <Button :onclick="hideAll">No</Button>
          &nbsp;
          <Button :onclick="hideAll">Maybe</Button>
        </div>
      </template>
    </Modal>
  </div>
</template>
