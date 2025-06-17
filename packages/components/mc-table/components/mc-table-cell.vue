<template>
  <td v-if="shouldRender" :class="[column.className, column.align ? `is-${column.align}` : '', column.fixed ? `is-fixed-${typeof column.fixed === 'boolean' ? 'left' : column.fixed}` : '', `is-display-${colspan === 0 ? 'none' : 'table-cell'}`]" :rowspan="rowspan" :colspan="colspan">
    <!-- 统一内容插槽 - 优先级最高 -->
    <slot name="cell" :row="row" :column="column" :$index="rowIndex" :value="row[column.prop]" :prop="column.prop">
      <!-- 单独列插槽 - 向后兼容 -->
      <slot :name="column.slot || column.prop" :row="row" :column="column" :$index="rowIndex" :value="row[column.prop]">
        <template v-if="column.formatter">
          {{ column.formatter(row, column, row[column.prop], rowIndex) }}
        </template>
        <template v-else>
          {{ row[column.prop] }}
        </template>
      </slot>
    </slot>
  </td>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { TableCellProps } from "../types";

const props = defineProps<TableCellProps>();

// 获取单元格行合并数量
const rowspan = computed(() => {
  if (props.spanMethod) {
    // 计算原始数据中的索引
    const originalRowIndex = props.pagination && props.pagination.currentPage && props.pagination.pageSize ? (props.pagination.currentPage - 1) * props.pagination.pageSize + props.rowIndex : props.rowIndex;

    const result = props.spanMethod({
      row: props.row,
      column: props.column,
      rowIndex: originalRowIndex,
      columnIndex: props.columnIndex,
    });

    if (result) {
      let rowspan: number;
      if (Array.isArray(result)) {
        rowspan = result[0];
      } else {
        rowspan = result.rowspan || 1;
      }

      // 如果有分页，需要调整rowspan以适应当前页面
      if (props.pagination && props.pagination.currentPage && props.pagination.pageSize && rowspan > 1) {
        const currentPageStart = (props.pagination.currentPage - 1) * props.pagination.pageSize;
        const currentPageEnd = currentPageStart + props.pagination.pageSize - 1;
        const mergeStart = originalRowIndex;
        const mergeEnd = originalRowIndex + rowspan - 1;

        // 如果合并区域完全在当前页面之外，不显示
        if (mergeEnd < currentPageStart || mergeStart > currentPageEnd) {
          return 0;
        }

        // 计算在当前页面内的实际rowspan
        const visibleStart = Math.max(mergeStart, currentPageStart);
        const visibleEnd = Math.min(mergeEnd, currentPageEnd);
        const adjustedRowspan = visibleEnd - visibleStart + 1;

        // 只有在合并区域的第一行在当前页面时才显示合并
        if (visibleStart === originalRowIndex) {
          return adjustedRowspan;
        } else {
          return 0;
        }
      }

      return rowspan;
    }
  }

  // 使用column配置的rowSpan
  if (props.column.rowSpan) {
    if (typeof props.column.rowSpan === "function") {
      return props.column.rowSpan(props.row, props.column, props.rowIndex);
    }
    return props.column.rowSpan;
  }

  return undefined;
});

// 获取单元格列合并数量
const colspan = computed(() => {
  if (props.spanMethod) {
    // 计算原始数据中的索引
    const originalRowIndex = props.pagination && props.pagination.currentPage && props.pagination.pageSize ? (props.pagination.currentPage - 1) * props.pagination.pageSize + props.rowIndex : props.rowIndex;

    const result = props.spanMethod({
      row: props.row,
      column: props.column,
      rowIndex: originalRowIndex,
      columnIndex: props.columnIndex,
    });

    if (result) {
      if (Array.isArray(result)) {
        return result[1];
      } else {
        return result.colspan;
      }
    }
  }

  // 使用column配置的colSpan
  if (props.column.colSpan) {
    if (typeof props.column.colSpan === "function") {
      return props.column.colSpan(props.row, props.column, props.rowIndex);
    }
    return props.column.colSpan;
  }

  return undefined;
});

// 判断是否应该渲染单元格
const shouldRender = computed(() => {
  if (props.spanMethod) {
    // 计算原始数据中的索引
    const originalRowIndex = props.pagination && props.pagination.currentPage && props.pagination.pageSize ? (props.pagination.currentPage - 1) * props.pagination.pageSize + props.rowIndex : props.rowIndex;

    const result = props.spanMethod({
      row: props.row,
      column: props.column,
      rowIndex: originalRowIndex,
      columnIndex: props.columnIndex,
    });

    if (result) {
      let rowspan: number, colspan: number;

      if (Array.isArray(result)) {
        rowspan = result[0];
        colspan = result[1];
      } else {
        rowspan = result.rowspan || 1;
        colspan = result.colspan || 1;
      }

      // 如果有分页，需要检查是否应该在当前页面渲染
      if (props.pagination && props.pagination.currentPage && props.pagination.pageSize && rowspan > 1) {
        const currentPageStart = (props.pagination.currentPage - 1) * props.pagination.pageSize;
        const currentPageEnd = currentPageStart + props.pagination.pageSize - 1;
        const mergeStart = originalRowIndex;
        const mergeEnd = originalRowIndex + rowspan - 1;

        // 如果合并区域完全在当前页面之外，不渲染
        if (mergeEnd < currentPageStart || mergeStart > currentPageEnd) {
          return false;
        }

        // 只有在合并区域的第一行在当前页面时才渲染
        const visibleStart = Math.max(mergeStart, currentPageStart);
        if (visibleStart !== originalRowIndex) {
          return false;
        }
      }

      // 检查是否为隐藏的合并单元格
      return !(rowspan === 0 || colspan === 0);
    }
  }

  return true;
});
</script>
<style scoped lang="scss">
@use "../index.scss";
</style>
