<template>
  <div class="mc-table__pagination" v-if="pagination">
    <div class="mc-table__pagination-info">Showing {{ getShowingStart }}-{{ getShowingEnd }} of {{ pagination.total }}</div>
    <div class="mc-table__pagination-controls">
      <mc-icon name="First" :class="{ 'mc-table__icon': true, 'is-disabled': currentPage <= 1 }" :size="24" @click="handlePageChange(1, currentPage <= 1)" />
      <mc-icon name="Left-Chevron" :class="{ 'mc-table__icon': true, 'is-disabled': currentPage <= 1 }" :size="24" @click="handlePageChange(currentPage - 1, currentPage <= 1)" />

      <!-- 页码按钮 -->
      <template v-for="page in visiblePages" :key="page">
        <button v-if="page !== '...'" class="mc-table__pagination-button mc-table__pagination-button--page" :class="{ 'is-active': page === currentPage }" @click="typeof page === 'number' ? handlePageChange(page, false) : undefined">
          {{ page }}
        </button>
        <span v-else class="mc-table__pagination-ellipsis">...</span>
      </template>

      <mc-icon name="Right-Chevron" :class="{ 'mc-table__icon': true, 'is-disabled': currentPage >= totalPages }" :size="24" @click="handlePageChange(currentPage + 1, currentPage >= totalPages)" />
      <mc-icon name="Last" :class="{ 'mc-table__icon': true, 'is-disabled': currentPage >= totalPages }" :size="24" @click="handlePageChange(totalPages, currentPage >= totalPages)" />
    </div>
    <div class="mc-table__pagination-size">
      <label class="mc-table__pagination-size-label">View per page</label>
      <select v-if="pageSizeList && pageSizeList.length > 0" class="mc-table__pagination-select" v-model="pageSize" @change="handlePageSizeChange">
        <option v-for="size in pageSizeList" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import mcIcon from "../../mc-icon/mc-icon.vue";
import type { PaginationConfig } from "../types";

interface Props {
  pagination?: PaginationConfig;
}

interface Emits {
  (e: "page-change", payload: { pageSize: number; pageNum: number }): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 分页相关
const currentPage = ref(props.pagination?.currentPage || 1);

const pageSize = ref(props.pagination?.pageSize || 50);

const pageSizeList = ref(props.pagination?.pageSizes || [25, 50, 75, 100]);

watch(
  () => props.pagination?.currentPage,
  (val) => {
    if (val !== undefined) {
      currentPage.value = val;
    }
  }
);

watch(
  () => props.pagination?.pageSize,
  (val) => {
    if (val !== undefined) {
      pageSize.value = val;
    }
  }
);

const totalPages = computed(() => {
  if (!props.pagination) return 1;
  return Math.ceil(props.pagination.total / pageSize.value);
});

// 计算显示的起始和结束位置
const getShowingStart = computed(() => {
  if (!props.pagination || props.pagination.total === 0) return 0;
  return (currentPage.value - 1) * pageSize.value + 1;
});

const getShowingEnd = computed(() => {
  if (!props.pagination) return 0;
  const end = currentPage.value * pageSize.value;
  return Math.min(end, props.pagination.total);
});

// 计算可见的页码
const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages: (number | string)[] = [];

  if (total <= 7) {
    // 如果总页数小于等于7，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // 总是显示第一页
    pages.push(1);

    if (current <= 4) {
      // 当前页在前面
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(total);
    } else if (current >= total - 3) {
      // 当前页在后面
      pages.push("...");
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // 当前页在中间
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(total);
    }
  }

  return pages;
});

const handlePageChange = (page: number, disabled: boolean) => {
  if (page < 1 || page > totalPages.value || disabled) return;
  currentPage.value = page;
  emit("page-change", { pageSize: pageSize.value, pageNum: page });
};

const handlePageSizeChange = () => {
  currentPage.value = 1; // 切换每页条数时重置为第一页
  emit("page-change", { pageSize: pageSize.value, pageNum: 1 });
};
</script>

<style scoped lang="scss">
@use "../index.scss";
</style>
