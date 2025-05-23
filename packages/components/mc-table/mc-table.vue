<template>
  <div class="mc-table-wrapper mc-table--large">
    <!-- Loading Overlay -->
    <div v-if="loading" class="mc-table__loading-overlay">
      <div class="mc-table__loading-spinner"></div>
    </div>

    <!-- Table Container -->
    <div class="mc-table-container" ref="tableContainer" @scroll="handleScroll">
      <!-- Fixed Header Shadow -->
      <div v-if="showHeaderShadow" class="mc-table__fixed-header-shadow"></div>

      <!-- Left Fixed Columns -->
      <div v-if="shouldUseFixedColumns && leftColumns.length" class="mc-table__fixed-left" :style="leftFixedStyle">
        <table class="mc-table mc-table--fixed">
          <!-- Header -->
          <thead v-if="showHeader" class="mc-table__header">
            <tr>
              <th v-for="(column, index) in leftColumns" :key="`left-${index}`" :class="getColumnClass(column, 'left', index === leftColumns.length - 1)" :style="{ width: column.width + 'px', minWidth: column.minWidth + 'px' }">
                <div class="mc-table__cell">{{ column.label }}</div>
              </th>
            </tr>
          </thead>
          <!-- Body -->
          <tbody class="mc-table__body" ref="leftBody">
            <tr v-for="(row, rowIndex) in tableData" :key="getRowKey(row, rowIndex)" :class="{ 'is-hover': rowHover }" @click="(e) => handleRowClick(row, e)">
              <td v-for="(column, colIndex) in leftColumns" :key="`left-${colIndex}`" :class="getColumnClass(column, 'left', colIndex === leftColumns.length - 1)">
                <div class="mc-table__cell">{{ getCellValue(row, column) }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Right Fixed Columns -->
      <div v-if="shouldUseFixedColumns && rightColumns.length" class="mc-table__fixed-right" :style="rightFixedStyle">
        <table class="mc-table mc-table--fixed">
          <!-- Header -->
          <thead v-if="showHeader" class="mc-table__header">
            <tr>
              <th v-for="(column, index) in rightColumns" :key="`right-${index}`" :class="getColumnClass(column, 'right', index === 0)" :style="{ width: column.width + 'px', minWidth: column.minWidth + 'px' }">
                <div class="mc-table__cell">{{ column.label }}</div>
              </th>
            </tr>
          </thead>
          <!-- Body -->
          <tbody class="mc-table__body" ref="rightBody">
            <tr v-for="(row, rowIndex) in tableData" :key="getRowKey(row, rowIndex)" :class="{ 'is-hover': rowHover }" @click="(e) => handleRowClick(row, e)">
              <td v-for="(column, colIndex) in rightColumns" :key="`right-${colIndex}`" :class="getColumnClass(column, 'right', colIndex === 0)">
                <div class="mc-table__cell">{{ getCellValue(row, column) }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Main Table (Scrollable) -->
      <div class="mc-table__main-wrapper">
        <table class="mc-table" :style="tableStyle" ref="mainTable">
          <!-- Header -->
          <thead v-if="showHeader" class="mc-table__header">
            <tr>
              <th v-for="(column, index) in shouldUseFixedColumns ? centerColumns : allColumns" :key="`center-${index}`" :class="getColumnClass(column)" :style="{ width: column.width + 'px', minWidth: column.minWidth + 'px' }">
                <div class="mc-table__cell">{{ column.label }}</div>
              </th>
            </tr>
          </thead>
          <!-- Body -->
          <tbody class="mc-table__body">
            <tr v-for="(row, rowIndex) in tableData" :key="getRowKey(row, rowIndex)" :class="{ 'is-hover': rowHover }" @click="(e) => handleRowClick(row, e)">
              <td v-for="(column, colIndex) in shouldUseFixedColumns ? centerColumns : allColumns" :key="`center-${colIndex}`" :class="getColumnClass(column)">
                <div class="mc-table__cell">{{ getCellValue(row, column) }}</div>
              </td>
            </tr>
            <!-- Empty Data Display -->
            <tr v-if="tableData.length === 0" class="mc-table__empty-row">
              <td :colspan="allColumns.length" class="mc-table__empty-cell">
                <div class="mc-table__empty-text">No data</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Pagination -->
  <div v-if="pagination" class="mc-table__pagination">
    <mc-pagination v-model:current-page2="currentPage" v-model:page-size="pageSize" :total="100" :show-size-changer="showSizeChanger" :show-total="showTotal" :show-jumper="showJumper" @change="handlePaginationChange" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import mcPagination from "../mc-pagination/mc-pagination.vue";
import type { TableColumn } from "./types";
import { tableEmits, tableProps } from "./types";

// Props and emits
const props = defineProps(tableProps);
const emit = defineEmits(tableEmits);

// Refs
const tableContainer = ref<HTMLElement | null>(null);
const mainTable = ref<HTMLElement | null>(null);
const leftBody = ref<HTMLElement | null>(null);
const rightBody = ref<HTMLElement | null>(null);
const showHeaderShadow = ref(false);

// 是否需要使用固定列
const shouldUseFixedColumns = ref(false);

// Columns by position
const allColumns = computed(() => (props.columns || []) as TableColumn[]);
const leftColumns = computed(() => allColumns.value.filter((col) => col.fixed === true || col.fixed === "left"));
const rightColumns = computed(() => allColumns.value.filter((col) => col.fixed === "right"));
const centerColumns = computed(() => allColumns.value.filter((col) => col.fixed !== true && col.fixed !== "left" && col.fixed !== "right"));

// 计算所有列的总宽度
const totalColumnsWidth = computed(() => {
  return allColumns.value.reduce((total, column) => {
    // 如果有明确设置的宽度，使用它
    if (column.width) {
      return total + (typeof column.width === "number" ? column.width : parseInt(column.width));
    }
    // 如果有最小宽度，使用最小宽度作为默认
    else if (column.minWidth) {
      return total + (typeof column.minWidth === "number" ? column.minWidth : parseInt(column.minWidth));
    }
    // 默认列宽
    return total + 80;
  }, 0);
});

// Data
const tableData = computed(() => (props.data || []) as any[]);

// Styles
const tableStyle = computed(() => ({
  height: props.height ? `${props.height}px` : "",
  maxHeight: props.maxHeight ? `${props.maxHeight}px` : "",
}));

const leftFixedStyle = computed(() => ({
  width: `${leftColumns.value.reduce((width, col) => width + (parseInt(col.width as string) || 80), 0)}px`,
}));

const rightFixedStyle = computed(() => ({
  width: `${rightColumns.value.reduce((width, col) => width + (parseInt(col.width as string) || 80), 0)}px`,
}));

// Row key getter
const getRowKey = (row: any, index: number) => {
  if (props.rowKey) {
    return typeof props.rowKey === "function" ? props.rowKey(row) : row[props.rowKey];
  }
  return index;
};

// Helper methods
const getCellValue = (row: any, column: TableColumn) => {
  const value = row[column.prop];
  return column.formatter ? column.formatter(row, column, value, tableData.value.indexOf(row)) : value;
};

const getColumnClass = (column: TableColumn, position?: "left" | "right", isEdge?: boolean) => {
  return [
    column.className,
    {
      [`is-align-${column.align || "left"}`]: true,
      [`is-fixed-${position}`]: position && shouldUseFixedColumns.value,
      "is-last-column": position === "left" && isEdge,
      "is-first-column": position === "right" && isEdge,
    },
  ];
};

// 检查是否需要启用固定列
const checkShouldUseFixedColumns = () => {
  if (!tableContainer.value) return;

  const containerWidth = tableContainer.value.clientWidth;
  const contentWidth = totalColumnsWidth.value;

  // 只有当内容宽度大于容器宽度时，才启用固定列
  shouldUseFixedColumns.value = contentWidth > containerWidth;
};

// Event handlers
const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;

  // Show header shadow when scrolled vertically
  showHeaderShadow.value = target.scrollTop > 0;

  // Sync fixed columns vertical scrolling
  if (leftBody.value && shouldUseFixedColumns.value) {
    leftBody.value.style.transform = `translateY(-${target.scrollTop}px)`;
  }

  if (rightBody.value && shouldUseFixedColumns.value) {
    rightBody.value.style.transform = `translateY(-${target.scrollTop}px)`;
  }
};

const handleRowClick = (row: any, event: Event) => {
  const target = event.target as HTMLElement;
  const td = target.closest("td");
  if (!td) return;

  // Find column index
  const cellIndex = Array.from(td.parentElement?.children || []).indexOf(td);

  // Determine the column based on which section was clicked
  let column: TableColumn | undefined;
  const container = (event.currentTarget as HTMLElement).closest(".mc-table-container");

  if (container) {
    const isLeftFixed = td.closest(".mc-table__fixed-left");
    const isRightFixed = td.closest(".mc-table__fixed-right");

    if (isLeftFixed) {
      column = leftColumns.value[cellIndex];
    } else if (isRightFixed) {
      column = rightColumns.value[cellIndex];
    } else {
      // 根据是否启用固定列来决定使用哪个列数组
      const columns = shouldUseFixedColumns.value ? centerColumns.value : allColumns.value;
      column = columns[cellIndex];
    }
  }

  if (column) {
    emit("row-click", row, column, event);
  }
};

// 监听窗口大小变化和表格容器变化
const setupResizeObserver = () => {
  if (!tableContainer.value) return;

  const resizeObserver = new ResizeObserver(() => {
    checkShouldUseFixedColumns();
  });

  resizeObserver.observe(tableContainer.value);

  return () => {
    if (tableContainer.value) {
      resizeObserver.unobserve(tableContainer.value);
    }
    resizeObserver.disconnect();
  };
};

// 监听列配置变化
watch(
  allColumns,
  () => {
    nextTick(() => {
      checkShouldUseFixedColumns();
    });
  },
  { deep: true }
);

// Pagination methods
const handlePaginationChange = (params: { page: number; pageSize: number }) => {
  emit("pagination-change", params);
};

// Lifecycle hooks
onMounted(() => {
  const cleanupResizeObserver = setupResizeObserver();
  checkShouldUseFixedColumns();

  return () => {
    if (cleanupResizeObserver) {
      cleanupResizeObserver();
    }
  };
});
</script>

<style lang="scss" scoped>
/* Variables */
$primary-color: var(--mc-teal-500);
$border-color: var(--mc-gray-200);
$text-color: var(--mc-gray-800);
$text-disabled: var(--mc-gray-400);
$bg-color: var(--mc-white);
$hover-bg: var(--mc-gray-100);
$striped-bg: var(--mc-gray-100);
$selected-bg: var(--mc-teal-50);
$loading-overlay: rgba(255, 255, 255, 0.7);
$shadow-color: rgba(0, 0, 0, 0.1);
$radius: var(--mc-radius);
$transition: var(--mc-transition-duration);

.mc-table-wrapper {
  /* Reset and common styles */
  box-sizing: border-box;
  width: 100%;
  position: relative;
  font-family: inherit;
  font-size: 14px;
  color: $text-color;
  line-height: 1.5;

  /* Table container with horizontal and vertical scroll */
  .mc-table-container {
    width: 100%;
    overflow: auto;
    position: relative;
    max-height: inherit;

    /* Custom scrollbar styles */
    &::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: $bg-color;
    }

    &::-webkit-scrollbar-thumb {
      background: $border-color;
      border-radius: 3px;

      &:hover {
        background: $primary-color;
      }
    }

    /* Fixed left columns */
    .mc-table__fixed-left {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      overflow: hidden;
      background-color: $bg-color;
      box-shadow: 4px 0 8px -4px $shadow-color;

      .mc-table__body {
        overflow: hidden;
      }
    }

    /* Fixed right columns */
    .mc-table__fixed-right {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
      overflow: hidden;
      background-color: $bg-color;
      box-shadow: -4px 0 8px -4px $shadow-color;

      .mc-table__body {
        overflow: hidden;
      }
    }

    /* Fixed header shadow */
    .mc-table__fixed-header-shadow {
      position: absolute;
      left: 0;
      right: 0;
      height: 6px;
      top: 40px; /* Adjust to match header height */
      background: linear-gradient($shadow-color, transparent);
      z-index: 2;
      pointer-events: none;
    }

    /* Main table wrapper */
    .mc-table__main-wrapper {
      overflow-x: auto !important;
    }
  }

  /* Loading overlay */
  .mc-table__loading-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: $loading-overlay;
    display: flex;
    align-items: center;
    justify-content: center;

    .mc-table__loading-spinner {
      width: 30px;
      height: 30px;
      border: 2px solid $primary-color;
      border-radius: 50%;
      border-top-color: transparent;
      animation: table-loading 1s linear infinite;
    }

    @keyframes table-loading {
      to {
        transform: rotate(360deg);
      }
    }
  }

  /* Table base styles */
  .mc-table {
    width: 100%;
    min-width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;

    /* Fixed table styles */
    &.mc-table--fixed {
      width: 100%;
      table-layout: fixed;
    }

    /* Table header */
    .mc-table__header {
      background-color: $bg-color;
      position: sticky;
      top: 0;
      z-index: 1;

      th {
        padding: 12px 8px;
        font-weight: 600;
        text-align: left;
        border-bottom: 1px solid $border-color;
        background-color: $bg-color;
        transition: background-color $transition;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &.is-align-left {
          text-align: left;
        }
        &.is-align-center {
          text-align: center;
        }
        &.is-align-right {
          text-align: right;
        }

        &.is-fixed-left,
        &.is-fixed-right {
          position: relative;
          z-index: 1;
        }

        &.is-last-column {
          border-right: 1px solid $border-color;
        }
        &.is-first-column {
          border-left: 1px solid $border-color;
        }
      }
    }

    /* Table body */
    .mc-table__body {
      tr {
        transition: background-color $transition;

        &.is-hover:hover {
          background-color: $hover-bg;
        }

        &.is-selected {
          background-color: $selected-bg;
        }

        td {
          padding: 12px 8px;
          border-bottom: 1px solid $border-color;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          &.is-align-left {
            text-align: left;
          }
          &.is-align-center {
            text-align: center;
          }
          &.is-align-right {
            text-align: right;
          }

          &.is-fixed-left,
          &.is-fixed-right {
            position: relative;
            z-index: 1;
          }

          &.is-last-column {
            border-right: 1px solid $border-color;
          }
          &.is-first-column {
            border-left: 1px solid $border-color;
          }
        }
      }
    }

    /* Empty data message */
    .mc-table__empty-row {
      .mc-table__empty-cell {
        text-align: center;
        padding: 20px;

        .mc-table__empty-text {
          color: $text-disabled;
        }
      }
    }
  }

  /* Cell styles */
  .mc-table__cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.mc-table--large {
    font-size: 16px;

    .mc-table__header th,
    .mc-table__body td {
      padding: 14px 12px;
    }
  }

  /* Pagination */
  &__pagination {
    margin-top: 16px;
  }
}
</style>
