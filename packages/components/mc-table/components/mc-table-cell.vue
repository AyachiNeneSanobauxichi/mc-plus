<template>
  <td v-if="shouldRender" :class="cellClasses" :rowspan="rowspan" :colspan="colspan">
    <!-- 统一内容插槽 - 优先级最高 -->
    <slot name="cell" :row="row" :column="column" :index="rowIndex" :value="cellValue" :prop="column.prop">
      <!-- 单独列插槽 - 向后兼容 -->
      <slot :name="column.slot || column.prop" :row="row" :column="column" :index="rowIndex" :value="cellValue">
        <template v-if="column.formatter">
          {{ column.formatter(row, column, cellValue, rowIndex) }}
        </template>
        <template v-else>
          {{ cellValue }}
        </template>
      </slot>
    </slot>
  </td>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { TableCellProps } from "../types";

const props = defineProps<TableCellProps>();

// 单元格值
const cellValue = computed(() => props.row[props.column.prop]);

// 单元格样式类
const cellClasses = computed(() => {
  const classes = [props.column.className];

  if (props.column.align) {
    classes.push(`is-${props.column.align}`);
  }

  if (props.column.fixed) {
    const fixedPosition = typeof props.column.fixed === "boolean" ? "left" : props.column.fixed;
    classes.push(`is-fixed-${fixedPosition}`);
  }

  const displayType = colspan.value === 0 ? "none" : "table-cell";
  classes.push(`is-display-${displayType}`);

  return classes;
});

// 计算原始行索引（考虑分页）
const getOriginalRowIndex = (): number => {
  if (props.pagination?.currentPage && props.pagination?.pageSize) {
    return (props.pagination.currentPage - 1) * props.pagination.pageSize + props.rowIndex;
  }
  return props.rowIndex;
};

// 获取合并方法的结果
const getSpanResult = () => {
  if (!props.spanMethod) return null;

  const originalRowIndex = getOriginalRowIndex();
  return props.spanMethod({
    row: props.row,
    column: props.column,
    rowIndex: originalRowIndex,
    columnIndex: props.columnIndex,
  });
};

// 检查分页合并可见性
const checkPaginationVisibility = (originalRowIndex: number, rowspan: number): boolean => {
  if (!props.pagination?.currentPage || !props.pagination?.pageSize || rowspan <= 1) {
    return true;
  }

  const currentPageStart = (props.pagination.currentPage - 1) * props.pagination.pageSize;
  const currentPageEnd = currentPageStart + props.pagination.pageSize - 1;
  const mergeStart = originalRowIndex;
  const mergeEnd = originalRowIndex + rowspan - 1;

  // 如果合并区域完全在当前页面之外，不显示
  if (mergeEnd < currentPageStart || mergeStart > currentPageEnd) {
    return false;
  }

  // 只有在合并区域的第一行在当前页面时才显示合并
  const visibleStart = Math.max(mergeStart, currentPageStart);
  return visibleStart === originalRowIndex;
};

// 计算分页调整后的rowspan
const getAdjustedRowspan = (originalRowIndex: number, rowspan: number): number => {
  if (!props.pagination?.currentPage || !props.pagination?.pageSize || rowspan <= 1) {
    return rowspan;
  }

  const currentPageStart = (props.pagination.currentPage - 1) * props.pagination.pageSize;
  const currentPageEnd = currentPageStart + props.pagination.pageSize - 1;
  const mergeStart = originalRowIndex;
  const mergeEnd = originalRowIndex + rowspan - 1;

  const visibleStart = Math.max(mergeStart, currentPageStart);
  const visibleEnd = Math.min(mergeEnd, currentPageEnd);

  return visibleEnd - visibleStart + 1;
};

// 获取单元格行合并数量
const rowspan = computed(() => {
  // 优先使用 spanMethod
  const spanResult = getSpanResult();
  if (spanResult) {
    const originalRowIndex = getOriginalRowIndex();
    let rowspan: number;

    if (Array.isArray(spanResult)) {
      rowspan = spanResult[0];
    } else {
      rowspan = spanResult.rowspan || 1;
    }

    if (rowspan > 1) {
      if (!checkPaginationVisibility(originalRowIndex, rowspan)) {
        return 0;
      }
      return getAdjustedRowspan(originalRowIndex, rowspan);
    }

    return rowspan;
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
  // 优先使用 spanMethod
  const spanResult = getSpanResult();
  if (spanResult) {
    if (Array.isArray(spanResult)) {
      return spanResult[1];
    } else {
      return spanResult.colspan;
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
  // 优先使用 spanMethod
  const spanResult = getSpanResult();
  if (spanResult) {
    const originalRowIndex = getOriginalRowIndex();
    let rowspan: number, colspan: number;

    if (Array.isArray(spanResult)) {
      rowspan = spanResult[0];
      colspan = spanResult[1];
    } else {
      rowspan = spanResult.rowspan || 1;
      colspan = spanResult.colspan || 1;
    }

    // 检查分页可见性
    if (rowspan > 1 && !checkPaginationVisibility(originalRowIndex, rowspan)) {
      return false;
    }

    // 检查是否为隐藏的合并单元格
    return !(rowspan === 0 || colspan === 0);
  }

  return true;
});
</script>

<style scoped lang="scss">
@use "../index.scss";
</style>
