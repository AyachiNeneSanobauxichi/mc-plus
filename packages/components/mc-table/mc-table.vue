<!--
 * @Author: Tieju yang
 * @Date: 2025-05-26 09:37:04
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-28 14:28:50
-->
<template>
  <div
    ref="_ref"
    class="mc-table"
    :class="{
      'mc-table--loading': loading,
    }">
    <!-- 表头组件 -->
    <mc-table-header ref="headerRef" :columns="columnsWithFixed" :show-header="showHeader" :get-sort-order="getSortOrder" :selectable="selectable" :is-all-selected="isAllSelected" :is-indeterminate="isIndeterminate" @header-click="handleHeaderClick" @sort-change="handleSortChange" @select-all="handleSelectAll">
      <template v-for="slotName in (Object.keys($slots) as string[])" :key="slotName" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps"></slot>
      </template>
    </mc-table-header>

    <!-- 表体组件 -->
    <mc-table-body ref="bodyRef" :data="finalData" :columns="columnsWithFixed" :row-key="rowKey" :empty-text="emptyText" :height="height" :max-height="maxHeight" :span-method="spanMethod" :pagination="pagination" :get-row-class="getRowClass" :selectable="selectable" :selected-rows="internalSelectedRows" :select-on-row-click="selectOnRowClick" @row-click="handleRowClick" @select="handleSelect">
      <template v-for="name in (Object.keys($slots) as string[])" :key="name" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </mc-table-body>

    <!-- 分页组件 -->
    <mc-table-pagination v-if="pagination && pagination?.total > 0" :pagination="pagination" @page-change="handlePageChange" />

    <!-- Loading 组件 -->
    <mc-table-loading class="mc-table__loading" :loading="loading" :loading-text="loadingText" :loading-config="loadingConfig">
      <template #loading="loadingProps">
        <slot name="loading" v-bind="loadingProps" />
      </template>
    </mc-table-loading>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, toRefs, watch } from "vue";
import McTableBody from "./components/mc-table-body.vue";
import McTableHeader from "./components/mc-table-header.vue";
import McTableLoading from "./components/mc-table-loading.vue";
import McTablePagination from "./components/mc-table-pagination.vue";
import { usePagination } from "./composables/usePagination";
import { useTableScroll } from "./composables/useTableScroll";
import { useTableSort } from "./composables/useTableSort";
import type { RowData, TableColumn, TableEmits, TableInstance, TableProps } from "./types";

// options
defineOptions({
  name: "McTable",
});

// props
const props = withDefaults(defineProps<TableProps>(), {
  showHeader: true,
  emptyText: "No Data",
  loading: false,
  loadingText: "Loading...",
  highlightCurrentRow: false,
  selectable: false,
  selectOnRowClick: false,
});

const { data, columns, pagination, spanMethod, loading, loadingText, loadingConfig, defaultSort, highlightCurrentRow, rowKey, selectable, selectedRows, selectOnRowClick } = toRefs(props);

// emits
const emit = defineEmits<TableEmits>();

// ref
const _ref = ref<HTMLDivElement>();
const headerRef = ref<InstanceType<typeof McTableHeader>>();
const bodyRef = ref<InstanceType<typeof McTableBody>>();

// 使用组合式函数
const { columnsWithFixed } = useTableScroll(columns, headerRef, bodyRef);

// 排序功能
const { sortedData, handleSort, getSortOrder } = useTableSort(data, columnsWithFixed, defaultSort?.value);

// 分页功能
const { paginatedData, updatePagination } = usePagination(sortedData, pagination);

// 最终数据（经过排序和分页处理）
const finalData = computed(() => paginatedData.value);

// 当前行状态管理
const currentRow = ref<any>(null);

// 选择状态管理
const internalSelectedRows = ref<RowData[]>(selectedRows?.value || []);

// 监听外部 selectedRows 变化
watch(
  selectedRows,
  (newVal) => {
    if (newVal) {
      internalSelectedRows.value = [...newVal];
    }
  },
  { deep: true, immediate: true }
);

// 全选状态计算
const isAllSelected = computed(() => {
  if (!finalData.value.length) return false;
  return finalData.value.every((row) => internalSelectedRows.value.some((selectedRow) => (rowKey.value ? selectedRow[rowKey.value] === row[rowKey.value] : selectedRow === row)));
});

// 半选状态计算
const isIndeterminate = computed(() => {
  if (!finalData.value.length) return false;
  const selectedCount = finalData.value.filter((row) => internalSelectedRows.value.some((selectedRow) => (rowKey.value ? selectedRow[rowKey.value] === row[rowKey.value] : selectedRow === row))).length;
  return selectedCount > 0 && selectedCount < finalData.value.length;
});

const setCurrentRow = (row: any) => {
  currentRow.value = row;
  return currentRow.value;
};

const getRowClass = (row: any): string[] => {
  const classes = [];
  if (highlightCurrentRow.value && currentRow.value === row) {
    classes.push("is-current");
  }
  return classes;
};

// 选择相关方法
const isRowSelected = (row: RowData): boolean => {
  return internalSelectedRows.value.some((selectedRow) => (rowKey.value ? selectedRow[rowKey.value] === row[rowKey.value] : selectedRow === row));
};

const toggleRowSelection = (row: RowData, selected?: boolean): void => {
  const isSelected = selected !== undefined ? selected : !isRowSelected(row);

  if (isSelected) {
    // 添加选择
    if (!isRowSelected(row)) {
      internalSelectedRows.value.push(row);
    }
  } else {
    // 移除选择
    const index = internalSelectedRows.value.findIndex((selectedRow) => (rowKey.value ? selectedRow[rowKey.value] === row[rowKey.value] : selectedRow === row));
    if (index > -1) {
      internalSelectedRows.value.splice(index, 1);
    }
  }

  // 触发事件
  emit("update:selectedRows", [...internalSelectedRows.value]);
  emit("selection-change", [...internalSelectedRows.value]);
  emit("select", row, isSelected);
};

const toggleAllSelection = (selected: boolean): void => {
  if (selected) {
    // 全选当前页数据
    finalData.value.forEach((row) => {
      if (!isRowSelected(row)) {
        internalSelectedRows.value.push(row);
      }
    });
  } else {
    // 取消选择当前页数据
    finalData.value.forEach((row) => {
      const index = internalSelectedRows.value.findIndex((selectedRow) => (rowKey.value ? selectedRow[rowKey.value] === row[rowKey.value] : selectedRow === row));
      if (index > -1) {
        internalSelectedRows.value.splice(index, 1);
      }
    });
  }

  // 触发事件
  emit("update:selectedRows", [...internalSelectedRows.value]);
  emit("selection-change", [...internalSelectedRows.value]);
  emit("select-all", selected);
};

const clearSelection = (): void => {
  internalSelectedRows.value = [];
  emit("update:selectedRows", []);
  emit("selection-change", []);
};

// 事件处理
const handleRowClick = (row: any, index: number) => {
  // 处理当前行高亮
  if (highlightCurrentRow.value) {
    const newCurrentRow = setCurrentRow(row);
    emit("current-change", newCurrentRow);
  }

  // 处理行选择
  if (selectable.value && selectOnRowClick.value) {
    toggleRowSelection(row);
  }

  emit("row-click", row, index);
};

const handleHeaderClick = (column: TableColumn, event: Event) => {
  emit("header-click", column, event);
};

const handleSortChange = (column: TableColumn) => {
  const sortConfig = handleSort(column);
  if (sortConfig) {
    emit("sort-change", sortConfig);
  }
};

const handleSelect = (row: RowData, selected: boolean) => {
  toggleRowSelection(row, selected);
};

const handleSelectAll = (selected: boolean) => {
  toggleAllSelection(selected);
};

const handlePageChange = async (payload: { pageSize: number; pageNum: number }) => {
  updatePagination(payload);

  // 等待DOM更新完成后滚动到表格顶部
  nextTick(() => {
    if (bodyRef.value?.bodyWrapper) {
      bodyRef.value.bodyWrapper.scrollTop = 0;
    }
  });

  emit("page-change", payload);

  // 如果存在 initData 方法，则调用
  if (props.initData && typeof props.initData === "function") {
    await props.initData(payload);
  }
};

// 刷新方法
const refresh = async () => {
  if (props.initData && typeof props.initData === "function" && pagination.value) {
    const { data: initData, total } = await props.initData({
      pageSize: pagination.value.pageSize || 10,
      pageNum: pagination.value.currentPage || 1,
    });
    data.value = initData;
    pagination.value.total = total;
  }
};

// 清除排序状态
const clearSort = () => {
  // 重置所有列的排序状态
  columns.value.forEach((column) => {
    if (column.sortable) {
      column.sortOrder = null;
    }
  });
};

// expose
defineExpose<TableInstance>({
  ref: _ref,
  refresh,
  clearSort,
  toggleRowSelection,
  toggleAllSelection,
  clearSelection,
  getSelectedRows: () => [...internalSelectedRows.value],
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
