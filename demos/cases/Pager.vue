<script setup>
defineOptions({ name: "DemoPager" });
import { ref } from 'vue'
import { Pager } from '../../src/index'

const value = ref(2)
const pageSize = ref(10)
</script>

<template>
  <div class="demo-box">
    <h3>100 rows (active = {{ value }}, page size = {{ pageSize }})</h3>
    <Pager v-model:page-size="pageSize" v-model:value="value" :total="100" />
  </div>
</template>