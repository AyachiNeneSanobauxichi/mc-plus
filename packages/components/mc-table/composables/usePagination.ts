/*
 * @Author: Tieju yang
 * @Date: 2025-05-26 13:41:35
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-26 15:20:19
 */
import { computed, ref, watch, type Ref } from "vue";
import type { PaginationConfig, RowData } from "../types";

export function usePagination(data: Ref<RowData[]>, pagination: Ref<PaginationConfig | undefined>) {
  const currentPage = ref(pagination.value?.currentPage || 1);
  const pageSize = ref(pagination.value?.pageSize || 50);

  // 监听外部分页配置变化
  watch(
    () => pagination.value?.currentPage,
    (val) => {
      if (val !== undefined) {
        currentPage.value = val;
      }
    }
  );

  watch(
    () => pagination.value?.pageSize,
    (val) => {
      if (val !== undefined) {
        pageSize.value = val;
      }
    }
  );

  // 分页后的数据
  const paginatedData = computed(() => {
    if (!pagination.value) {
      return data.value;
    }

    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;

    return data.value.slice(startIndex, endIndex);
  });

  // 更新分页参数
  function updatePagination(payload: { pageSize: number; pageNum: number }) {
    currentPage.value = payload.pageNum;
    pageSize.value = payload.pageSize;
  }

  // 获取分页信息
  const paginationInfo = computed(() => {
    if (!pagination.value) {
      return {
        currentPage: 1,
        pageSize: data.value.length,
        total: data.value.length,
        totalPages: 1,
      };
    }

    const total = pagination.value.total;
    const totalPages = Math.ceil(total / pageSize.value);

    return {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      total,
      totalPages,
    };
  });

  return {
    currentPage,
    pageSize,
    paginatedData,
    paginationInfo,
    updatePagination,
  };
}
