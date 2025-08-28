<template>
  <td
    class="mc-table-body-cell"
    :class="{ 'mc-table-body-cell-expand': type === 'expand' }"
    @click="handleExpand"
  >
    <slot>
      <div
        class="mc-table-body-cell-wrapper"
        :style="{ justifyContent: getFlexAlign(columnAlign) }"
      >
        <template v-if="type === 'expand'">
          <mc-icon
            :name="
              rowState?.[rowIndex]?.isExpand ? 'Up-Chevron' : 'Down-Chevron'
            "
          />
        </template>
        <template v-else>
          <div class="mc-table-body-cell-inner">
            <slot name="value">
              <div class="mc-table-body-value">{{ displayValue }}</div>
            </slot>
          </div>
        </template>
      </div>
    </slot>
  </td>
</template>

<script setup lang="ts">
import type { McTablePlusBodyCellProps } from "./types";
import { computed } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";
import { MC_TABLE_BODY_CELL, MC_TABLE_DEFAULT_VALUE } from "./constant";
import { getFlexAlign } from "./utils";
import { useTableContext } from "./hooks";
import { isFunction, isNil } from "lodash-es";

// options
defineOptions({ name: MC_TABLE_BODY_CELL });

// props
const props = withDefaults(defineProps<McTablePlusBodyCellProps>(), {
  value: "",
  default: MC_TABLE_DEFAULT_VALUE,
  columnAlign: "left",
  type: "normal",
});

// display value
const displayValue = computed(() => {
  return props.value || props.default;
});

// table context
const { setRowStateByIndex, rowState } = useTableContext();

// handle expand
const handleExpand = () => {
  if (
    props.type !== "expand" ||
    !isFunction(setRowStateByIndex) ||
    isNil(rowState?.value[props.rowIndex])
  ) {
    return;
  }

  // expand row
  setRowStateByIndex(props.rowIndex, {
    isExpand: !rowState.value[props.rowIndex].isExpand,
  });
};
</script>

<style scoped lang="scss">
@use "./styles/mc-table-body-cell.scss";
</style>
