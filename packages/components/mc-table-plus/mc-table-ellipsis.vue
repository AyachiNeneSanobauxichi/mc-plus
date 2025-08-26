<template>
  <div class="mc-table-ellipsis">
    <i class="mc-table-ellipsis-dot"></i>
    <i class="mc-table-ellipsis-dot"></i>
    <i class="mc-table-ellipsis-dot"></i>
  </div>
</template>

<script setup lang="ts">
import { MC_TABLE_ELLIPSIS } from "./constant";

// options
defineOptions({ name: MC_TABLE_ELLIPSIS });
</script>

<style scoped lang="scss">
@use "./styles/mc-table-ellipsis.scss";
</style>
