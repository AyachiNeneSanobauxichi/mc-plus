<template>
  <div class="mc-table-total" v-if="showNumber">
    <span>Showing</span>
    <span class="mc-table-total-number">{{ showNumber.range }}</span>
    <span>of</span>
    <span class="mc-table-total-number">{{ showNumber.total }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { MC_TABLE_TOTAL } from "./constant";
import { useTableContext } from "./hooks";

// options
defineOptions({ name: MC_TABLE_TOTAL });

// use table context
const { pagination } = useTableContext();

// show number
const showNumber = computed(() => {
  if (!pagination) return;
  const { pageNum, pageSize, total } = pagination;
  const start = (pageNum - 1) * pageSize + 1;
  const end = Math.min(pageNum * pageSize, total);

  return {
    range: `${start}-${end}`,
    total,
  };
});
</script>

<style scoped lang="scss">
@use "./styles/mc-table-total.scss";
</style>
