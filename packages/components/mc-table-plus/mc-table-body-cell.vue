<template>
  <td class="mc-table-body-cell">
    <slot>
      <div class="mc-table-body-cell-wrapper">
        <div class="mc-table-body-cell-inner">
          <slot name="value">
            <div class="mc-table-body-value">{{ "Hirasawa Yui" }}</div>
          </slot>
        </div>
      </div>
    </slot>
  </td>
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
