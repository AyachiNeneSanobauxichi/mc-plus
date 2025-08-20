<template>
  <div class="mc-table-pagination">Mc table pagination</div>
</template>

<script setup lang="ts">
import { MC_TABLE_PAGINATION } from "./constant";

// options
defineOptions({ name: MC_TABLE_PAGINATION });
</script>

<style scoped lang="scss">
@use "./styles/mc-table-pagination.scss";
</style>
