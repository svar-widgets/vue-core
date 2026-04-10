<script setup>
import { inject, ref } from 'vue';
import { Button, Segmented, Calendar } from '../../src/index';

defineOptions({ name: 'CoreBasic' });

const segmentedValue = ref('2');
const calendarValue = ref(new Date(2025, 4, 1));

const { showNotice } = inject('wx-helpers');
function onclick() {
  showNotice({
    text: 'Button clicked',
  });
}
</script>

<template>
  <div class="demo-box">
    <h3>Buttons</h3>
    <Button :onclick="onclick" type="primary">Primary</Button>
    &nbsp;
    <Button :onclick="onclick" type="secondary">Secondary</Button>
    &nbsp;
    <Button :onclick="onclick" type="danger">Danger</Button>
  </div>

  <div class="demo-box">
    <h3>Segmented</h3>
    <Segmented
      v-model:value="segmentedValue"
      :options="[
        { id: '1', label: 'One' },
        { id: '2', label: 'Two' },
        { id: '3', label: 'Three' },
      ]"
    />
  </div>

  <div class="demo-box">
    <h3>Calendar</h3>
    <div style="width: 280px;">
      <Calendar v-model:value="calendarValue" />
    </div>
  </div>
</template>