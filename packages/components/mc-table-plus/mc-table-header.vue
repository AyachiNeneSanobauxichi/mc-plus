<template>
  <table class="mc-table-header">
    <thead class="mc-table-header-thead">
      <tr class="mc-table-header-tr">
        <template v-for="column in columns" :key="column.prop">
          <mc-table-header-cell
            :title="column.label"
            :width="column.width"
            :desc="column.desc"
          />
        </template>
      </tr>
    </thead>
  </table>
</template>

<script setup lang="ts">
import type { McTablePlusHeaderProps } from "./types";
import { MC_TABLE_HEADER } from "./constant";
import McTableHeaderCell from "./mc-table-header-cell.vue";

// options
defineOptions({ name: MC_TABLE_HEADER });

// props
defineProps<McTablePlusHeaderProps>();
</script>

<style scoped lang="scss">
@use "./styles/mc-table-header.scss";
</style>
