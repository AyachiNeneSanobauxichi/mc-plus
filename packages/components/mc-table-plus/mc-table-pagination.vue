<template>
  <ul class="mc-table-pagination" v-if="!isOnePage">
    <mc-table-pagination-item
      type="first"
      :is-disabled="prevDisabled"
      @click="handleClick('first')"
    />
    <mc-table-pagination-item
      type="prev"
      :is-disabled="prevDisabled"
      @click="handleClick('prev')"
    />
    <mc-table-pagination-item
      :value="1"
      :is-active="pagination?.pageNum === 1"
      @click="handleClick(1)"
    />
    <mc-table-pagination-item type="ellipsis" v-if="showPrevEllipsis" />
    <mc-table-pagination-item
      v-for="value in pageRange"
      :key="value"
      :value="value"
      :is-active="pagination?.pageNum === value"
      @click="handleClick(value)"
    />
    <mc-table-pagination-item type="ellipsis" v-if="showNextEllipsis" />
    <mc-table-pagination-item
      :value="totalPage"
      :is-active="pagination?.pageNum === totalPage"
      @click="handleClick(totalPage)"
    />
    <mc-table-pagination-item
      type="next"
      :is-disabled="nextDisabled"
      @click="handleClick('next')"
    />
    <mc-table-pagination-item
      type="last"
      :is-disabled="nextDisabled"
      @click="handleClick('last')"
    />
  </ul>
</template>

<script setup lang="ts">
import type { McTablePaginationNextPage } from "./types";
import { computed } from "vue";
import { isFunction } from "lodash-es";
import { MC_TABLE_PAGINATION } from "./constant";
import McTablePaginationItem from "./mc-table-pagination-item.vue";
import { useTableContext } from "./hooks";

// options
defineOptions({ name: MC_TABLE_PAGINATION });

// use table context
const { pagination, isLoading, handlePagination } = useTableContext();

// total page
const totalPage = computed(() => {
  if (!pagination) return 0;
  return Math.ceil(pagination.total / pagination.pageSize);
});

// page range
const pageRange = computed(() => {
  if (!pagination || totalPage.value <= 1) return [];
  const _pageRange: number[] = [];

  if (totalPage.value <= 5) {
    for (let i = 2; i < totalPage.value; i++) {
      _pageRange.push(i);
    }
  } else if (pagination.pageNum <= 2) {
    _pageRange.push(...[2, 3, 4, 5]);
  } else if (pagination.pageNum >= totalPage.value - 1) {
    _pageRange.push(
      ...[
        totalPage.value - 4,
        totalPage.value - 3,
        totalPage.value - 2,
        totalPage.value - 1,
      ]
    );
  } else {
    _pageRange.push(
      ...[pagination.pageNum - 1, pagination.pageNum, pagination.pageNum + 1]
    );
  }

  return _pageRange;
});

// prev disabled
const prevDisabled = computed(() => {
  if (!pagination) return true;
  return pagination.pageNum <= 1;
});

// next disabled
const nextDisabled = computed(() => {
  if (!pagination) return true;
  return pagination.pageNum >= totalPage.value;
});

// one page
const isOnePage = computed(() => {
  if (!pagination) return true;
  return totalPage.value <= 1;
});

// show prev ellipsis
const showPrevEllipsis = computed(() => {
  if (!pagination) return false;
  return totalPage.value > 5 && pagination.pageNum > 2;
});

// show next ellipsis
const showNextEllipsis = computed(() => {
  if (!pagination) return false;
  return totalPage.value > 5 && pagination.pageNum < totalPage.value - 1;
});

// handle click
const handleClick = (nextPage: McTablePaginationNextPage) => {
  if (!isFunction(handlePagination) || isLoading.value) return;

  if (nextPage === "first") {
    if (!prevDisabled.value) {
      handlePagination({ pageNum: 1 });
    }
  } else if (nextPage === "prev") {
    if (pagination && pagination.pageNum > 1 && !prevDisabled.value) {
      handlePagination({ pageNum: pagination.pageNum - 1 });
    }
  } else if (nextPage === "next") {
    if (
      pagination &&
      pagination.pageNum < totalPage.value &&
      !nextDisabled.value
    ) {
      handlePagination({ pageNum: pagination.pageNum + 1 });
    }
  } else if (nextPage === "last") {
    if (!nextDisabled.value) {
      handlePagination({ pageNum: totalPage.value });
    }
  } else {
    if (nextPage !== pagination?.pageNum) {
      handlePagination({ pageNum: nextPage });
    }
  }
};
</script>

<style scoped lang="scss">
@use "./styles/mc-table-pagination.scss";
</style>
