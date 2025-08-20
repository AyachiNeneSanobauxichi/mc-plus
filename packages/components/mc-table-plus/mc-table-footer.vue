<template>
  <div class="mc-table-footer">
    <mc-table-total />
    <mc-table-pagination />
    <mc-table-page-size />
  </div>
</template>

<script setup lang="ts">
import { MC_TABLE_FOOTER } from "./constant";
import McTableTotal from "./mc-table-total.vue";
import McTablePagination from "./mc-table-pagination.vue";
import McTablePageSize from "./mc-table-page-size.vue";

// options
defineOptions({ name: MC_TABLE_FOOTER });
</script>

<style scoped lang="scss">
@use "./styles/mc-table-footer.scss";
</style>
