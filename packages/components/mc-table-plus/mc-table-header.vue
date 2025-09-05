<template>
  <table class="mc-table-header">
    <colgroup class="mc-table-header-colgroup">
      <col
        v-for="column in columns"
        :key="column.prop"
        :width="column.width"
        :class="[
          'mc-table-header-col',
          `mc-table-header-col-${column.columnAlign}`,
          { 'mc-table-header-col-expand': column.isExpand },
        ]"
      />
    </colgroup>
    <thead class="mc-table-header-thead">
      <tr class="mc-table-header-tr">
        <template v-for="column in columns" :key="column.prop">
          <mc-table-header-cell
            :prop="column.prop"
            :title="column.label"
            :desc="column.desc"
            :column-align="column.columnAlign"
            :sort="column.sort"
          >
            <template #header v-if="column.header">
              <component :is="column.header" />
            </template>
            <template #title v-if="column.headerTitle">
              <component :is="column.headerTitle" />
            </template>
            <template #desc v-if="column.headerDesc">
              <component :is="column.headerDesc" />
            </template>
          </mc-table-header-cell>
        </template>
      </tr>
    </thead>
  </table>
</template>

<script setup lang="ts">
import { MC_TABLE_HEADER } from "./constant";
import { useTableContext } from "./hooks";
import McTableHeaderCell from "./mc-table-header-cell.vue";

// options
defineOptions({ name: MC_TABLE_HEADER });

// table context
const { columns } = useTableContext();
</script>

<style scoped lang="scss">
@use "./styles/mc-table-header.scss";
</style>
