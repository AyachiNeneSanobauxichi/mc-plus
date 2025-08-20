<template>
  <div class="mc-table-page-size">Mc table page size</div>
</template>

<script setup lang="ts">
import { MC_TABLE_PAGE_SIZE } from "./constant";

// options
defineOptions({ name: MC_TABLE_PAGE_SIZE });
</script>

<style scoped lang="scss">
@use "./styles/mc-table-page-size.scss";
</style>
