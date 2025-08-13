<template>
  <div class="mc-table-plus">
    <div>Mc Table Plus</div>
    <div>columns: {{ columns }}</div>
    <mc-table-header :columns="columns" />
    <mc-table-body :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import type { McTableColumn } from "./types";
import { ref, useSlots, watch } from "vue";
import { MC_TABLE_PLUS } from "./constant";
import { generateColumns } from "./utils";
import McTableHeader from "./mc-table-header.vue";
import McTableBody from "./mc-table-body.vue";

// options
defineOptions({ name: MC_TABLE_PLUS });

// table columns
const columns = ref<McTableColumn[]>([]);

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
