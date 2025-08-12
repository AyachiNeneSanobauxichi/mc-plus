<template>
  <div class="mc-table-plus">
    <mc-table-header-cell
      column-align="left"
      title="Name"
      desc="full name"
    />
  </div>
</template>

<script setup lang="ts">
import { MC_TABLE_PLUS } from "./constant";
import McTableHeaderCell from "./mc-table-header-cell.vue";

// options
defineOptions({ name: MC_TABLE_PLUS });
</script>

<style scoped lang="scss">
@use "./styles/mc-table.scss";
</style>
