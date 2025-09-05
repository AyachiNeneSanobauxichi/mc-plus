/*
 * @Author: Tieju yang
 * @Date: 2025-05-26 16:00:00
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-26 16:00:00
 */
import { computed, ref, type Ref } from "vue";
import type { SortConfig, SortOrder, TableColumn } from "../types";

export function useTableSort(
  data: Ref<Record<string, unknown>[]>,
  columns: Ref<TableColumn[]>,
  defaultSort?: SortConfig
) {
  const currentSort = ref<SortConfig | null>(defaultSort || null);

  // 排序后的数据
  const sortedData = computed(() => {
    if (!currentSort.value || !currentSort.value.order) {
      return data.value;
    }

    const { prop, order } = currentSort.value;
    const column = columns.value.find((col) => col.prop === prop);

    if (!column) {
      return data.value;
    }

    const sortedArray = [...data.value];

    sortedArray.sort((a, b) => {
      let aVal: any = a[prop];
      let bVal: any = b[prop];

      // 如果列定义了自定义排序方法
      if (column.sortMethod) {
        const result = column.sortMethod(aVal, bVal);
        return order === "desc" ? -result : result;
      }

      // 默认排序逻辑
      if (aVal === null || aVal === undefined) aVal = "";
      if (bVal === null || bVal === undefined) bVal = "";

      if (typeof aVal === "string" && typeof bVal === "string") {
        aVal = (aVal as string).toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) {
        return order === "asc" ? -1 : 1;
      }
      if (aVal > bVal) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sortedArray;
  });

  // 处理排序
  function handleSort(column: TableColumn) {
    if (!column.sortable) return;

    const { prop } = column;
    let newOrder: SortOrder = "asc";

    // 如果当前已经是这一列的排序
    if (currentSort.value && currentSort.value.prop === prop) {
      if (currentSort.value.order === "asc") {
        newOrder = "desc";
      } else if (currentSort.value.order === "desc") {
        newOrder = null;
      } else {
        newOrder = "asc";
      }
    }

    if (newOrder === null) {
      currentSort.value = null;
    } else {
      currentSort.value = { prop, order: newOrder };
    }

    return currentSort.value;
  }

  // 获取列的排序状态
  function getSortOrder(prop: string): SortOrder {
    if (currentSort.value && currentSort.value.prop === prop) {
      return currentSort.value.order;
    }
    return null;
  }

  return {
    sortedData,
    currentSort,
    handleSort,
    getSortOrder,
  };
}
