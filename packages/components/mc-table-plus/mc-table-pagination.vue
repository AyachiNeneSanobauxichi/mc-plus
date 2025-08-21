<template>
  <ul class="mc-table-pagination">
    <li
      class="mc-table-pagination-item mc-table-pagination-item-first"
      :class="{ 'mc-table-pagination-item-disabled': true }"
    >
      <mc-icon name="First" />
    </li>
    <li
      class="mc-table-pagination-item mc-table-pagination-item-prev"
      :class="{ 'mc-table-pagination-item-disabled': true }"
    >
      <mc-icon name="Left-Chevron" />
    </li>
    <li class="mc-table-pagination-item mc-table-pagination-item-page">1</li>
    <!-- <mc-table-ellipsis /> -->
    <!-- <li class="mc-table-pagination-item mc-table-pagination-item-page">4</li> -->
    <!-- <li
      class="mc-table-pagination-item mc-table-pagination-item-page"
      :class="{ 'mc-table-pagination-item-active': true }"
    >
      5
    </li> -->
    <!-- <li class="mc-table-pagination-item mc-table-pagination-item-page">6</li> -->
    <!-- <mc-table-ellipsis /> -->
    <li
      class="mc-table-pagination-item mc-table-pagination-item-page"
      v-if="totalPage && totalPage > 1"
    >
      {{ totalPage }}
    </li>
    <li class="mc-table-pagination-item mc-table-pagination-item-next">
      <mc-icon name="Right-Chevron" />
    </li>
    <li class="mc-table-pagination-item mc-table-pagination-item-last">
      <mc-icon name="Last" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { MC_TABLE_PAGINATION } from "./constant";
import McIcon from "../mc-icon/mc-icon.vue";
// import McTableEllipsis from "./mc-table-ellipsis.vue";
import { useTableContext } from "./hooks";
import { computed } from "vue";

// options
defineOptions({ name: MC_TABLE_PAGINATION });

// use table context
const { pagination } = useTableContext();

// total page
const totalPage = computed(() => {
  if (!pagination) return;
  return Math.ceil(pagination.total / pagination.pageSize);
});
</script>

<style scoped lang="scss">
@use "./styles/mc-table-pagination.scss";
</style>
