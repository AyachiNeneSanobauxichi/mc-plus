/*
 * @Author: Tieju yang
 * @Date: 2025-05-26 13:41:35
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-26 15:20:19
 */
import { computed, ref, watch, type Ref } from "vue";
import type { PaginationConfig } from "../types";

export function usePagination(data: Ref<Record<string, unknown>[]>, pagination: Ref<PaginationConfig | undefined>) {
  const currentPage = ref(pagination.value?.currentPage || 1);
  const pageSize = ref(pagination.value?.pageSize || 50);

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

  const paginatedData = computed(() => {
    return data.value;
  });

  function updatePagination(payload: { pageSize: number; pageNum: number }) {
    currentPage.value = payload.pageNum;
    pageSize.value = payload.pageSize;
  }

  return {
    currentPage,
    pageSize,
    paginatedData,
    updatePagination,
  };
}
