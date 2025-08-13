<template>
  <div class="mc-table-column">Mc Table Column</div>
</template>

<script setup lang="ts">
import type { McTableColumnProps } from "./types";
import type { Slot } from "vue";
import { MC_TABLE_COLUMN } from "./constant";

// options
defineOptions({ name: MC_TABLE_COLUMN });

// props
defineProps<McTableColumnProps>();

// slots
defineSlots<{
  "header-title"?: Slot;
  "header-desc"?: Slot;
  header?: Slot;
}>();
</script>

<style scoped lang="scss">
@use "./styles/mc-table-column.scss";
</style>
