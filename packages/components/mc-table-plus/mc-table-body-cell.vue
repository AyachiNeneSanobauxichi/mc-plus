<template>
  <td class="mc-table-body-cell">
    <slot>
      <div
        class="mc-table-body-cell-wrapper"
        :style="{ justifyContent: getFlexAlign(columnAlign) }"
      >
        <div class="mc-table-body-cell-inner">
          <slot name="value">
            <div class="mc-table-body-value">{{ displayValue }}</div>
          </slot>
        </div>
      </div>
    </slot>
  </td>
</template>

<script setup lang="ts">
import type { McTablePlusBodyCellProps } from "./types";
import { computed } from "vue";
import { MC_TABLE_BODY_CELL, MC_TABLE_DEFAULT_VALUE } from "./constant";
import { getFlexAlign } from "./utils";

// options
defineOptions({ name: MC_TABLE_BODY_CELL });

// props
const props = withDefaults(defineProps<McTablePlusBodyCellProps>(), {
  value: "",
  default: MC_TABLE_DEFAULT_VALUE,
  columnAlign: "left",
});

// display value
const displayValue = computed(() => {
  return props.value || props.default;
});
</script>

<style scoped lang="scss">
@use "./styles/mc-table-body-cell.scss";
</style>
