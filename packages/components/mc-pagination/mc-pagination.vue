<template>
  <div class="mc-pagination">
    <div class="mc-pagination__total" v-if="showTotal">{{ totalText }} {{ total }}</div>

    <div class="mc-pagination__buttons">
      <button class="mc-pagination__btn mc-pagination__btn--prev" :class="{ 'is-disabled': internalCurrentPage <= 1 }" @click="handlePrevPage" :disabled="internalCurrentPage <= 1">
        <i class="mc-pagination__icon mc-pagination__icon--prev"></i>
      </button>

      <div v-if="pagerCount > 0" class="mc-pagination__pagers">
        <!-- First page -->
        <button v-if="showFirstPage" class="mc-pagination__pager" :class="{ 'is-active': internalCurrentPage === 1 }" @click="handleChangePage(1)">1</button>

        <!-- Left ellipsis -->
        <div v-if="showLeftEllipsis" class="mc-pagination__ellipsis">
          <span>...</span>
        </div>

        <!-- Page numbers -->
        <button v-for="page in pagerButtons" :key="page" class="mc-pagination__pager" :class="{ 'is-active': internalCurrentPage === page }" @click="handleChangePage(page)">
          {{ page }}
        </button>

        <!-- Right ellipsis -->
        <div v-if="showRightEllipsis" class="mc-pagination__ellipsis">
          <span>...</span>
        </div>

        <!-- Last page -->
        <button v-if="showLastPage" class="mc-pagination__pager" :class="{ 'is-active': internalCurrentPage === pageCount }" @click="handleChangePage(pageCount)">
          {{ pageCount }}
        </button>
      </div>

      <button class="mc-pagination__btn mc-pagination__btn--next" :class="{ 'is-disabled': internalCurrentPage >= pageCount }" @click="handleNextPage" :disabled="internalCurrentPage >= pageCount">
        <i class="mc-pagination__icon mc-pagination__icon--next"></i>
      </button>
    </div>

    <div v-if="showSizeChanger" class="mc-pagination__sizes">
      <select class="mc-pagination__select" v-model="internalPageSize" @change="handleSizeChange">
        <option v-for="option in pageSizeOptions" :key="option" :value="option">{{ option }} {{ pageSizeText }}</option>
      </select>
    </div>

    <div v-if="showJumper" class="mc-pagination__jumper">
      {{ goToText }}
      <input class="mc-pagination__input" type="number" min="1" :max="pageCount" v-model.number="jumpPageNumber" @keyup.enter="handleJumpToPage" />
      {{ pageText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { paginationEmits, paginationProps } from "./types";

const props = defineProps(paginationProps);
const emit = defineEmits(paginationEmits);

// Internal state
const internalCurrentPage = ref(props.currentPage || 1);
const internalPageSize = ref(props.pageSize || 10);
const jumpPageNumber = ref(internalCurrentPage.value);

// Computed values
const pageCount = computed(() => {
  return Math.max(1, Math.ceil(props.total / internalPageSize.value));
});

const pagerCount = computed(() => {
  return props.pagerCount;
});

const pagerButtons = computed(() => {
  const halfPagerCount = Math.floor(pagerCount.value / 2);
  let startPage = Math.max(internalCurrentPage.value - halfPagerCount, 1);
  let endPage = Math.min(startPage + pagerCount.value - 1, pageCount.value);

  // Adjust start page if end page is at maximum
  if (endPage === pageCount.value) {
    startPage = Math.max(endPage - pagerCount.value + 1, 1);
  }

  const result = [];
  for (let i = startPage; i <= endPage; i++) {
    result.push(i);
  }

  return result;
});

const showFirstPage = computed(() => {
  return pagerButtons.value[0] > 1;
});

const showLastPage = computed(() => {
  return pagerButtons.value[pagerButtons.value.length - 1] < pageCount.value;
});

const showLeftEllipsis = computed(() => {
  return showFirstPage.value && pagerButtons.value[0] > 2;
});

const showRightEllipsis = computed(() => {
  return showLastPage.value && pagerButtons.value[pagerButtons.value.length - 1] < pageCount.value - 1;
});

// Watchers
watch(
  () => props.currentPage,
  (newVal) => {
    internalCurrentPage.value = newVal;
    jumpPageNumber.value = newVal;
  }
);

watch(
  () => props.pageSize,
  (newVal) => {
    internalPageSize.value = newVal;
  }
);

// Methods
const handleChangePage = (page: number) => {
  if (page === internalCurrentPage.value) return;
  internalCurrentPage.value = page;
  jumpPageNumber.value = page;
  emit("update:currentPage", page);
  emit("change", { page, pageSize: internalPageSize.value });
};

const handlePrevPage = () => {
  if (internalCurrentPage.value > 1) {
    handleChangePage(internalCurrentPage.value - 1);
  }
};

const handleNextPage = () => {
  if (internalCurrentPage.value < pageCount.value) {
    handleChangePage(internalCurrentPage.value + 1);
  }
};

const handleSizeChange = () => {
  // When page size changes, we might need to adjust current page
  const newPageCount = Math.ceil(props.total / internalPageSize.value);
  let newCurrentPage = internalCurrentPage.value;

  if (newCurrentPage > newPageCount) {
    newCurrentPage = newPageCount;
  }

  internalCurrentPage.value = newCurrentPage;
  jumpPageNumber.value = newCurrentPage;

  emit("update:pageSize", internalPageSize.value);
  emit("update:currentPage", newCurrentPage);
  emit("sizeChange", internalPageSize.value);
  emit("change", { page: newCurrentPage, pageSize: internalPageSize.value });
};

const handleJumpToPage = () => {
  let targetPage = jumpPageNumber.value;

  if (targetPage <= 0) {
    targetPage = 1;
  } else if (targetPage > pageCount.value) {
    targetPage = pageCount.value;
  }

  jumpPageNumber.value = targetPage;
  handleChangePage(targetPage);
};

// Default props access
const totalText = computed(() => props.totalText || "Total");
const pageSizeText = computed(() => props.pageSizeText || "items/page");
const goToText = computed(() => props.goToText || "Go to");
const pageText = computed(() => props.pageText || "page");
const pageSizeOptions = computed(() => props.pageSizeOptions || [10, 20, 50, 100]);
</script>
