<template>
  <div class="mc-table-page-size">
    <span class="mc-table-page-size-text">View per page</span>
    <ul class="mc-table-page-size-group">
      <li class="mc-table-page-size-group-item">25</li>
      <li
        class="mc-table-page-size-group-item"
        :class="{ 'mc-table-page-size-group-item-active': true }"
      >
        50
      </li>
      <li class="mc-table-page-size-group-item">75</li>
      <li class="mc-table-page-size-group-item">100</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { MC_TABLE_PAGE_SIZE } from "./constant";

// options
defineOptions({ name: MC_TABLE_PAGE_SIZE });
</script>

<style scoped lang="scss">
@use "./styles/mc-table-page-size.scss";
</style>
