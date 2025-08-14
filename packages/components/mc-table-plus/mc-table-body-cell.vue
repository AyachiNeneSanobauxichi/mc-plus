<template>
  <td class="mc-table-body-cell">Mc Table Body Cell</td>
</template>

<script setup lang="ts">
import type { McTablePlusBodyCellProps } from "./types";
import { MC_TABLE_BODY_CELL, MC_TABLE_DEFAULT_VALUE } from "./constant";

// options
defineOptions({ name: MC_TABLE_BODY_CELL });

// props
withDefaults(defineProps<McTablePlusBodyCellProps>(), {
  value: "",
  default: MC_TABLE_DEFAULT_VALUE,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-table-body-cell.scss";
</style>
