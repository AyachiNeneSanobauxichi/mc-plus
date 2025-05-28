<!--
 * @Author: Tieju yang
 * @Date: 2025-05-26 09:37:04
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-28 08:56:26
-->
<template>
  <div
    ref="_ref"
    class="mc-table"
    :class="{
      'mc-table--loading': loading,
    }">
    <!-- 表头组件 -->
    <mc-table-header ref="headerRef" :columns="columnsWithFixed" :show-header="showHeader" :get-sort-order="getSortOrder" @header-click="handleHeaderClick" @sort-change="handleSortChange">
      <template v-for="slotName in (Object.keys($slots) as string[])" :key="slotName" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps"></slot>
      </template>
    </mc-table-header>

    <!-- 表体组件 -->
    <mc-table-body ref="bodyRef" :data="finalData" :columns="columnsWithFixed" :row-key="rowKey" :empty-text="emptyText" :height="height" :max-height="maxHeight" :span-method="spanMethod" :pagination="pagination" :get-row-class="getRowClass" @row-click="handleRowClick">
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
import { computed, nextTick, ref, toRefs } from "vue";
import McTableBody from "./components/mc-table-body.vue";
import McTableHeader from "./components/mc-table-header.vue";
import McTableLoading from "./components/mc-table-loading.vue";
import McTablePagination from "./components/mc-table-pagination.vue";
import { usePagination } from "./composables/usePagination";
import { useTableScroll } from "./composables/useTableScroll";
import { useTableSort } from "./composables/useTableSort";
import type { TableColumn, TableEmits, TableInstance, TableProps } from "./types";

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
  selectedRowKeys: () => [],
  highlightCurrentRow: false,
});

const { data, columns, pagination, spanMethod, loading, loadingText, loadingConfig, defaultSort, highlightCurrentRow, rowKey } = toRefs(props);

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

function setCurrentRow(row: any) {
  currentRow.value = row;
  return currentRow.value;
}

function getRowClass(row: any): string[] {
  const classes = [];
  if (highlightCurrentRow.value && currentRow.value === row) {
    classes.push("is-current");
  }
  return classes;
}

// 事件处理
function handleRowClick(row: any, index: number) {
  // 处理当前行高亮
  if (highlightCurrentRow.value) {
    const newCurrentRow = setCurrentRow(row);
    emit("current-change", newCurrentRow);
  }

  emit("row-click", row, index);
}

function handleHeaderClick(column: TableColumn, event: Event) {
  emit("header-click", column, event);
}

function handleSortChange(column: TableColumn) {
  const sortConfig = handleSort(column);
  if (sortConfig) {
    emit("sort-change", sortConfig);
  }
}

async function handlePageChange(payload: { pageSize: number; pageNum: number }) {
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
    const { data: initData, total } = await props.initData({ pageSize: payload.pageSize, pageNum: payload.pageNum });
    data.value = initData;
    pagination.value!.total = total;
  }
}

// 刷新方法
async function refresh() {
  if (props.initData && typeof props.initData === "function" && pagination.value) {
    const { data: initData, total } = await props.initData({
      pageSize: pagination.value.pageSize || 10,
      pageNum: pagination.value.currentPage || 1,
    });
    data.value = initData;
    pagination.value.total = total;
  }
}

// 清除排序状态
function clearSort() {
  // 重置所有列的排序状态
  columns.value.forEach((column) => {
    if (column.sortable) {
      column.sortOrder = null;
    }
  });
}

// expose
defineExpose<TableInstance>({
  ref: _ref,
  refresh,
  clearSort,
  clearSelection: () => {}, // 空实现，因为没有选择功能
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
