<template>
  <div class="mc-table-column"></div>
</template>

<script setup lang="ts">
import type { McTableColumnProps, McTableColumnSlots } from "./types";
import { MC_TABLE_COLUMN } from "./constant";

// options
defineOptions({ name: MC_TABLE_COLUMN });

// props
defineProps<McTableColumnProps>();

// slots
defineSlots<McTableColumnSlots>();
</script>

<style scoped lang="scss">
@use "./styles/mc-table-column.scss";
</style>
