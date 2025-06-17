/*
 * @Author: Tieju yang
 * @Date: 2025-05-26 16:00:00
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-26 16:00:00
 */
import { computed, ref, watch, type Ref } from "vue";
import type { RowData } from "../types";

export function useTableSelection(data: Ref<RowData[]>, rowKey: Ref<string | undefined>, selectedRows: Ref<RowData[] | undefined>) {
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

  // 判断行是否被选中
  const isRowSelected = (row: RowData): boolean => {
    return internalSelectedRows.value.some((selectedRow) => (rowKey.value ? selectedRow[rowKey.value] === row[rowKey.value] : selectedRow === row));
  };

  // 获取当前页面已选择的行数
  const getCurrentPageSelectedCount = (): number => {
    return data.value.filter((row) => isRowSelected(row)).length;
  };

  // 全选状态计算 - 基于当前页面数据
  const isAllSelected = computed(() => {
    if (!data.value.length) return false;
    return data.value.every((row) => isRowSelected(row));
  });

  // 半选状态计算 - 基于当前页面数据
  const isIndeterminate = computed(() => {
    if (!data.value.length) return false;
    const selectedCount = getCurrentPageSelectedCount();
    return selectedCount > 0 && selectedCount < data.value.length;
  });

  // 切换行选择状态
  const toggleRowSelection = (row: RowData, selected?: boolean): boolean => {
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

    return isSelected;
  };

  // 切换全选状态 - 只操作当前页面数据
  const toggleAllSelection = (selected: boolean): void => {
    if (selected) {
      // 全选当前页数据
      data.value.forEach((row) => {
        if (!isRowSelected(row)) {
          internalSelectedRows.value.push(row);
        }
      });
    } else {
      // 取消选择当前页数据
      data.value.forEach((row) => {
        const index = internalSelectedRows.value.findIndex((selectedRow) => (rowKey.value ? selectedRow[rowKey.value] === row[rowKey.value] : selectedRow === row));
        if (index > -1) {
          internalSelectedRows.value.splice(index, 1);
        }
      });
    }
  };

  // 清除所有选择
  const clearSelection = (): void => {
    internalSelectedRows.value = [];
  };

  // 获取已选择的行
  const getSelectedRows = (): RowData[] => {
    return [...internalSelectedRows.value];
  };

  // 获取当前页面选择信息
  const getCurrentPageSelectionInfo = () => {
    const totalCount = data.value.length;
    const selectedCount = getCurrentPageSelectedCount();
    return {
      totalCount,
      selectedCount,
      isAllSelected: totalCount > 0 && selectedCount === totalCount,
      isIndeterminate: selectedCount > 0 && selectedCount < totalCount,
    };
  };

  return {
    internalSelectedRows,
    isRowSelected,
    isAllSelected,
    isIndeterminate,
    toggleRowSelection,
    toggleAllSelection,
    clearSelection,
    getSelectedRows,
    getCurrentPageSelectionInfo,
  };
}
