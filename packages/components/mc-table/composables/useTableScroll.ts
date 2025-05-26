/*
 * @Author: Tieju yang
 * @Date: 2025-05-26 13:41:23
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-26 14:50:49
 */
import { computed, nextTick, onMounted, ref, type Ref } from "vue";
import type { TableColumn } from "../types";

export function useTableScroll(columns: Ref<TableColumn[]>, headerRef: Ref<{ headerWrapper?: HTMLDivElement } | undefined>, bodyRef: Ref<{ bodyWrapper?: HTMLDivElement } | undefined>) {
  const hasHorizontalScroll = ref(false);
  const tableWrapper = ref<HTMLDivElement | null>(null);

  // 根据是否需要水平滚动来决定是否应用固定列
  const columnsWithFixed = computed(() => {
    if (!hasHorizontalScroll.value) {
      // 没有水平滚动条时，不应用固定列
      return columns.value.map((col) => ({
        ...col,
        fixed: undefined,
      }));
    }

    // 有水平滚动条时，保留固定列设置
    return columns.value;
  });

  function checkHorizontalScroll() {
    if (tableWrapper.value) {
      hasHorizontalScroll.value = tableWrapper.value.scrollWidth > tableWrapper.value.clientWidth;
    }
  }

  // 同步表头和表体的横向滚动
  function syncHeaderScroll() {
    if (headerRef.value?.headerWrapper && bodyRef.value?.bodyWrapper) {
      headerRef.value.headerWrapper.scrollLeft = bodyRef.value.bodyWrapper.scrollLeft;
    }
  }

  function initScrollSync() {
    nextTick(() => {
      if (bodyRef.value?.bodyWrapper) {
        tableWrapper.value = bodyRef.value.bodyWrapper;
        checkHorizontalScroll();

        // 监听表格内容变化，重新检测是否有水平滚动条
        const resizeObserver = new ResizeObserver(() => {
          checkHorizontalScroll();
        });

        resizeObserver.observe(bodyRef.value.bodyWrapper);

        // 监听窗口大小变化
        window.addEventListener("resize", checkHorizontalScroll);

        // 监听表体滚动，同步表头滚动位置
        bodyRef.value.bodyWrapper.addEventListener("scroll", syncHeaderScroll);
      }
    });
  }

  onMounted(() => {
    initScrollSync();
  });

  return {
    hasHorizontalScroll,
    columnsWithFixed,
    checkHorizontalScroll,
    syncHeaderScroll,
    initScrollSync,
  };
}
