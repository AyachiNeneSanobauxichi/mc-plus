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
      <template v-for="slotName in Object.keys($slots)" :key="slotName" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps"></slot>
      </template>
    </mc-table-header>

    <!-- 表体组件 -->
    <mc-table-body ref="bodyRef" :data="finalData" :columns="columnsWithFixed" :row-key="rowKey" :empty-text="emptyText" :height="height" :max-height="maxHeight" :span-method="spanMethod" :pagination="pagination" :get-row-class="getRowClass" :selectable="selectable" :selected-rows="internalSelectedRows" :select-on-row-click="selectOnRowClick" @row-click="handleRowClick" @select="handleSelect">
      <template v-for="name in Object.keys($slots)" :key="name" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </mc-table-body>

    <!-- 分页组件 -->
    <mc-table-pagination v-if="pagination && pagination?.total > 0" :pagination="pagination" @page-change="handlePageChange" />

    <!-- Loading 组件 -->
    <mc-table-loading class="mc-table__loading" :loading="loading" :loading-text="loadingText" :loading-config="loadingConfig">
      <template #loading="loadingProps">
        <slot name="loading" v-bind="loadingProps"></slot>
      </template>
    </mc-table-loading>
  </div>
</template>

<script setup lang="ts">
import type { RowData, TableColumn, TableEmits, TableInstance, TableProps } from "./types";
import { computed, nextTick, onMounted, ref, toRefs, watch } from "vue";
import McTableBody from "./components/mc-table-body.vue";
import McTableHeader from "./components/mc-table-header.vue";
import McTableLoading from "./components/mc-table-loading.vue";
import McTablePagination from "./components/mc-table-pagination.vue";
import { usePagination } from "./composables/usePagination";
import { useTableCurrentRow } from "./composables/useTableCurrentRow";
import { useTableScroll } from "./composables/useTableScroll";
import { useTableSelection } from "./composables/useTableSelection";
import { useTableSort } from "./composables/useTableSort";

// options
defineOptions({ name: "McTable" });

// props
const props = withDefaults(defineProps<TableProps>(), {
  showHeader: true,
  emptyText: "No Data",
  loading: false,
  loadingText: "Loading...",
  highlightCurrentRow: false,
  selectable: false,
  selectOnRowClick: false,
  isInitTableData: true,
});

const { data, columns, pagination, spanMethod, loading, loadingText, loadingConfig, defaultSort, highlightCurrentRow, rowKey, selectable, selectedRows, selectOnRowClick } = toRefs(props);

const tableData = ref<RowData[]>(data.value);

// emits
const emit = defineEmits<TableEmits>();

// refs
const _ref = ref<HTMLDivElement>();
const headerRef = ref<InstanceType<typeof McTableHeader>>();
const bodyRef = ref<InstanceType<typeof McTableBody>>();

// 使用组合式函数
const { columnsWithFixed } = useTableScroll(columns, headerRef, bodyRef);
const { sortedData, handleSort, getSortOrder } = useTableSort(tableData, columnsWithFixed, defaultSort?.value);
const { paginatedData, updatePagination } = usePagination(sortedData, pagination);

// 最终数据（经过排序和分页处理）
const finalData = computed(() => paginatedData.value);

// 选择功能使用最终数据
const { internalSelectedRows, isRowSelected, isAllSelected, isIndeterminate, toggleRowSelection, toggleAllSelection, clearSelection, getSelectedRows } = useTableSelection(finalData, rowKey, selectedRows);
const { setCurrentRow, getRowClass } = useTableCurrentRow(highlightCurrentRow);

// 监听数据变化
watch(
  () => data.value,
  (newData) => {
    tableData.value = newData;
  },
  { deep: true, immediate: true }
);

// 事件处理
const handleRowClick = (row: RowData, index: number) => {
  // 处理当前行高亮
  if (highlightCurrentRow.value) {
    const newCurrentRow = setCurrentRow(row);
    emit("current-change", newCurrentRow);
  }

  // 处理行选择
  if (selectable.value && selectOnRowClick.value) {
    const isSelected = toggleRowSelection(row);
    emitSelectionEvents(row, isSelected);
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
  const isSelected = toggleRowSelection(row, selected);
  emitSelectionEvents(row, isSelected);
};

const handleSelectAll = (selected: boolean) => {
  toggleAllSelection(selected);
  emitSelectionEvents(null, selected);
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

  await initTableData();
};

// 统一的选择事件发射
const emitSelectionEvents = (row: RowData | null, selected: boolean) => {
  emit("update:selectedRows", [...internalSelectedRows.value]);
  emit("selection-change", [...internalSelectedRows.value]);

  if (row) {
    emit("select", row, selected);
  } else {
    emit("select-all", selected);
  }
};

// 清除排序状态
const clearSort = () => {
  columns.value.forEach((column) => {
    if (column.sortable) {
      column.sortOrder = null;
    }
  });
};

// 初始化数据
const initTableData = async () => {
  if (props.isInitTableData && props.initTableData && typeof props.initTableData === "function") {
    const { data, total } = await props.initTableData({
      pageSize: pagination.value!.pageSize || 10,
      pageNum: pagination.value!.currentPage || 1,
    });
    tableData.value = data;
    pagination.value!.total = total;
  }
};

// 刷新
const refresh = async () => {
  pagination.value!.currentPage = 1;
  await initTableData();
};

onMounted(() => {
  initTableData();
});

// expose
defineExpose<TableInstance>({
  ref: _ref,
  clearSort,
  toggleRowSelection: (row: RowData, selected?: boolean) => {
    const isSelected = toggleRowSelection(row, selected);
    emitSelectionEvents(row, isSelected);
  },
  refresh,
  toggleAllSelection: (selected: boolean) => {
    toggleAllSelection(selected);
    emitSelectionEvents(null, selected);
  },
  clearSelection: () => {
    clearSelection();
    emit("update:selectedRows", []);
    emit("selection-change", []);
  },
  getSelectedRows,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
