/*
 * @Author: Tieju yang
 * @Date: 2025-05-26 16:00:00
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-26 16:00:00
 */
import { computed, ref, type Ref } from "vue";

export function useTableSelection(data: Ref<Record<string, unknown>[]>, rowKey: Ref<string | undefined>, selectedRowKeys: Ref<(string | number)[]>, highlightCurrentRow: Ref<boolean>) {
  const currentRow = ref<Record<string, unknown> | null>(null);

  // 获取行的唯一标识
  function getRowKey(row: Record<string, unknown>, index: number): string | number {
    if (rowKey.value && row[rowKey.value] !== undefined) {
      return row[rowKey.value] as string | number;
    }
    return index;
  }

  // 检查行是否被选中
  function isRowSelected(row: Record<string, unknown>, index: number): boolean {
    const key = getRowKey(row, index);
    return selectedRowKeys.value.includes(key);
  }

  // 检查行是否是当前行
  function isCurrentRow(row: Record<string, unknown>): boolean {
    if (!highlightCurrentRow.value || !currentRow.value) {
      return false;
    }
    return currentRow.value === row;
  }

  // 切换行选中状态
  function toggleRowSelection(row: Record<string, unknown>, index: number): (string | number)[] {
    const key = getRowKey(row, index);
    const newSelectedKeys = [...selectedRowKeys.value];

    const keyIndex = newSelectedKeys.indexOf(key);
    if (keyIndex > -1) {
      newSelectedKeys.splice(keyIndex, 1);
    } else {
      newSelectedKeys.push(key);
    }

    return newSelectedKeys;
  }

  // 设置当前行
  function setCurrentRow(row: Record<string, unknown> | null): Record<string, unknown> | null {
    currentRow.value = row;
    return row;
  }

  // 清空选中
  function clearSelection(): (string | number)[] {
    return [];
  }

  // 全选/取消全选
  function toggleAllSelection(): (string | number)[] {
    const allKeys = data.value.map((row, index) => getRowKey(row, index));

    // 如果当前选中的行数等于总行数，则取消全选
    if (selectedRowKeys.value.length === data.value.length) {
      return [];
    } else {
      return allKeys;
    }
  }

  // 获取行的样式类
  function getRowClass(row: Record<string, unknown>, index: number): string[] {
    const classes: string[] = [];

    if (isRowSelected(row, index)) {
      classes.push("is-selected");
    }

    if (isCurrentRow(row)) {
      classes.push("is-current");
    }

    return classes;
  }

  // 计算是否全选
  const isAllSelected = computed(() => {
    return data.value.length > 0 && selectedRowKeys.value.length === data.value.length;
  });

  // 计算是否部分选中
  const isIndeterminate = computed(() => {
    return selectedRowKeys.value.length > 0 && selectedRowKeys.value.length < data.value.length;
  });

  return {
    currentRow,
    isRowSelected,
    isCurrentRow,
    toggleRowSelection,
    setCurrentRow,
    clearSelection,
    toggleAllSelection,
    getRowClass,
    getRowKey,
    isAllSelected,
    isIndeterminate,
  };
}
