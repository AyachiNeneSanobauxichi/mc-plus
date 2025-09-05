<template>
  <div class="mc-table-page-size">
    <span class="mc-table-page-size-text">View per page</span>
    <ul class="mc-table-page-size-group">
      <li
        class="mc-table-page-size-group-item"
        :class="{
          'mc-table-page-size-group-item-active':
            value === pagination?.pageSize,
        }"
        v-for="value in pagination?.pageSizes"
        :key="value"
        @click="handlePageSizeChange(value)"
      >
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { isFunction } from "lodash-es";
import { MC_TABLE_PAGE_SIZE } from "./constant";
import { useTableContext } from "./hooks";

// options
defineOptions({ name: MC_TABLE_PAGE_SIZE });

// use table context
const { pagination, isLoading, handlePagination } = useTableContext();

// handle page size change
const handlePageSizeChange = (value: number) => {
  if (isFunction(handlePagination) && !isLoading.value) {
    handlePagination({ pageSize: value, pageNum: 1 });
  }
};
</script>

<style scoped lang="scss">
@use "./styles/mc-table-page-size.scss";
</style>
