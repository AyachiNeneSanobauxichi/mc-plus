<template>
  <table class="mc-table-body">
    <div class="mc-table-body-loading" v-if="loading">Loading...</div>
    <colgroup class="mc-table-body-colgroup">
      <col
        v-for="column in columns"
        :key="column.prop"
        :width="column.width"
        :class="[
          'mc-table-body-col',
          `mc-table-body-col-${column.columnAlign}`,
        ]"
      />
    </colgroup>
    <tbody class="mc-table-body-tbody">
      <tr class="mc-table-body-tr" v-for="(item, index) in data" :key="index">
        <mc-table-body-cell
          v-for="column in columns"
          :key="column.prop"
          :column-align="column.columnAlign"
          :value="item?.[column.prop]"
        >
          <template #default v-if="column.tableValue">
            <component :is="column.tableValue" />
          </template>
          <template #value v-if="column.tableValueContent">
            <component :is="column.tableValueContent" />
          </template>
        </mc-table-body-cell>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { McTablePlusBodyProps } from "./types";
import { MC_TABLE_BODY } from "./constant";
import McTableBodyCell from "./mc-table-body-cell.vue";

// options
defineOptions({ name: MC_TABLE_BODY });

// props
withDefaults(defineProps<McTablePlusBodyProps>(), {
  data: () => [],
});
</script>

<style scoped lang="scss">
@use "./styles/mc-table-body.scss";
</style>
