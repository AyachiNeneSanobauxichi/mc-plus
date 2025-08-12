<template>
  <div class="mc-table-plus">
    <mc-table-header-cell
      column-align="left"
      title="Name"
      desc="full name"
      v-model:sort="sort"
    />
  </div>
</template>

<script setup lang="ts">
import type { McTableSort } from "./types";
import { ref } from "vue";
import { MC_TABLE_PLUS } from "./constant";
import McTableHeaderCell from "./mc-table-header-cell.vue";

// options
defineOptions({ name: MC_TABLE_PLUS });

// sort
const sort = ref<McTableSort>("normal");
</script>

<style scoped lang="scss">
@use "./styles/mc-table.scss";
</style>
