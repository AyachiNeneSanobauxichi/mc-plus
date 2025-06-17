/*
 * @Author: Tieju yang
 * @Date: 2025-05-26 16:00:00
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-26 16:00:00
 */
import { ref, type Ref } from "vue";
import type { RowData } from "../types";

export function useTableCurrentRow(highlightCurrentRow: Ref<boolean>) {
  const currentRow = ref<RowData | null>(null);

  // 设置当前行
  const setCurrentRow = (row: RowData | null): RowData | null => {
    currentRow.value = row;
    return currentRow.value;
  };

  // 获取行样式类
  const getRowClass = (row: RowData): string[] => {
    const classes: string[] = [];
    if (highlightCurrentRow.value && currentRow.value === row) {
      classes.push("is-current");
    }
    return classes;
  };

  // 清除当前行
  const clearCurrentRow = (): void => {
    currentRow.value = null;
  };

  return {
    currentRow,
    setCurrentRow,
    getRowClass,
    clearCurrentRow,
  };
}
