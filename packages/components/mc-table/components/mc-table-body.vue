<!--
 * @Author: Tieju yang
 * @Date: 2025-05-26 13:40:06
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-28 16:28:50
-->
<template>
  <div class="mc-table__body-wrapper" ref="bodyWrapper" :style="bodyStyle">
    <table class="mc-table__body" cellspacing="0" cellpadding="0" border="0">
      <colgroup>
        <col v-if="selectable" width="50" />
        <col v-for="(column, index) in columns" :key="index" :width="column.width" />
      </colgroup>
      <tbody>
        <template v-if="data && data.length > 0">
          <tr v-for="(row, rowIndex) in data" :key="rowKey ? (row as any)[rowKey] : rowIndex" :class="getRowClass ? getRowClass(row, rowIndex) : []" @click="handleRowClick(row, rowIndex)">
            <!-- 选择列 -->
            <td v-if="selectable" class="mc-table__selection-column">
              <div class="mc-table__cell">
                <mc-checkbox :model-value="isRowSelected(row)" @change="(selected: boolean) => handleSelect(row, selected)" />
              </div>
            </td>

            <mc-table-cell v-for="(column, colIndex) in columns" :key="colIndex" :row="row" :column="column" :row-index="rowIndex" :column-index="colIndex" :span-method="spanMethod" :pagination="pagination as any">
              <template v-for="slotName in (Object.keys($slots) as string[])" :key="slotName" #[slotName]="slotProps">
                <slot :name="slotName" v-bind="slotProps"></slot>
              </template>
            </mc-table-cell>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td :colspan="selectable ? columns.length + 1 : columns.length" class="mc-table__empty-cell">
              <!-- 空数据插槽 -->
              <slot v-if="slots.empty" name="empty"></slot>
              <div v-else>{{ emptyText }}</div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from "vue";
import { McCheckbox } from "../../mc-checkbox";
import type { McTableBodyProps, RowData, TableBodyEmits } from "../types";
import McTableCell from "./mc-table-cell.vue";

const props = withDefaults(defineProps<McTableBodyProps>(), {
  selectable: false,
  selectOnRowClick: false,
});

const slots = useSlots();

const emit = defineEmits<TableBodyEmits>();

const bodyWrapper = ref<HTMLDivElement>();

// 样式计算
const bodyStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.height) {
    style.height = typeof props.height === "number" ? `${props.height}px` : (props.height as string);
  }

  if (props.maxHeight) {
    style.maxHeight = typeof props.maxHeight === "number" ? `${props.maxHeight}px` : (props.maxHeight as string);
  }

  return style;
});

// 判断行是否被选中
const isRowSelected = (row: RowData): boolean => {
  if (!props.selectedRows) return false;
  return props.selectedRows.some((selectedRow) => (props.rowKey ? selectedRow[props.rowKey] === row[props.rowKey] : selectedRow === row));
};

function handleRowClick(row: Record<string, unknown>, index: number) {
  emit("row-click", row, index);
}

function handleSelect(row: RowData, selected: boolean) {
  emit("select", row, selected);
}

defineExpose({
  bodyWrapper,
});
</script>
<style scoped lang="scss">
@use "../index.scss";
</style>
