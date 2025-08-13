<template>
  <div class="mc-table-plus">
    <div>Mc Table Plus</div>
    <div>columns: {{ columns }}</div>
  </div>
</template>

<script setup lang="ts">
import type { McTableColumnProps } from "./types";
import { ref, useSlots, watch } from "vue";
import { MC_TABLE_PLUS } from "./constant";
import { generateColumns } from "./utils";

// options
defineOptions({ name: MC_TABLE_PLUS });

// table columns
const columns = ref<McTableColumnProps[]>([]);

// slots
const slots = useSlots();

// slots change
watch(
  () => slots.default?.(),
  () => {
    columns.value = generateColumns(slots.default?.());
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="scss">
@use "./styles/mc-table.scss";
</style>
