<template>
  <th class="mc-table-header-cell" @click="handleCellClick">
    <slot name="header">
      <div
        class="mc-table-header-cell-wrapper"
        :style="{ justifyContent: getFlexAlign(columnAlign) }"
      >
        <div
          class="mc-table-header-cell-inner"
          :style="{ alignItems: getFlexAlign(columnAlign) }"
        >
          <div class="mc-table-header-cell-title">
            <div class="mc-table-header-cell-title-text">
              <slot name="title">{{ title }}</slot>
            </div>
            <div class="mc-table-header-cell-help" v-if="help">
              <mc-tooltip :content="help" icon-name="Help"></mc-tooltip>
            </div>
            <div class="mc-table-header-cell-sort" v-if="sort">
              <mc-table-sort :sort="sort" />
            </div>
          </div>
          <template v-if="desc || $slots.desc">
            <slot name="desc">
              <div class="mc-table-header-cell-desc">{{ desc }}</div>
            </slot>
          </template>
        </div>
      </div>
    </slot>
  </th>
</template>

<script setup lang="ts">
import type {
  McTableHeaderCellProps,
  McTableSort as McTableSortType,
} from "./types";
import { isFunction, debounce } from "lodash-es";
import McTooltip from "../mc-tooltip/mc-tooltip.vue";
import { MC_TABLE_HEADER_CELL } from "./constant";
import McTableSort from "./mc-table-sort.vue";
import { getFlexAlign } from "./utils";
import { useTableContext } from "./hooks";

// options
defineOptions({ name: MC_TABLE_HEADER_CELL });

// props
const props = withDefaults(defineProps<McTableHeaderCellProps>(), {
  sort: undefined,
  columnAlign: "left",
});

// table context
const { doSort } = useTableContext();

// get next sort
const getNextSort = (sort: McTableSortType): McTableSortType => {
  switch (sort) {
    case "normal":
      return "desc";
    case "desc":
      return "asc";
    case "asc":
      return "normal";
    default:
      return "normal";
  }
};

// handle cell click
const handleCellClick = debounce(() => {
  if (props.sort && isFunction(doSort)) {
    doSort(props.prop, getNextSort(props.sort));
  }
}, 300);
</script>

<style scoped lang="scss">
@use "./styles/mc-table-header-cell.scss";
</style>
