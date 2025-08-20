<template>
  <div class="mc-table-total">
    <span>Showing</span>
    <span class="mc-table-total-number">1-10</span>
    <span>of</span>
    <span class="mc-table-total-number">100</span>
  </div>
</template>

<script setup lang="ts">
import { MC_TABLE_TOTAL } from "./constant";

// options
defineOptions({ name: MC_TABLE_TOTAL });
</script>

<style scoped lang="scss">
@use "./styles/mc-table-total.scss";
</style>
