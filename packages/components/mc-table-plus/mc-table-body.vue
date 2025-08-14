<template>
  <table class="mc-table-body">
    <tbody class="mc-table-body-tbody">
      <tr class="mc-table-body-tr">
        <mc-table-body-cell v-for="column in columns" :key="column.prop">
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
defineProps<McTablePlusBodyProps>();
</script>

<style scoped lang="scss">
@use "./styles/mc-table-body.scss";
</style>
