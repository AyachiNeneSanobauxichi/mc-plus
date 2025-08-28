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
          <mc-icon name="Down-Chevron" />
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

// handle expand
const handleExpand = () => {
  console.log("handleExpand");
};
</script>

<style scoped lang="scss">
@use "./styles/mc-table-body-cell.scss";
</style>
