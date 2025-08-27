<template>
  <table class="mc-table-body">
    <div class="mc-table-body-loading" v-if="loading">
      <slot name="loading">
        <mc-loading loading size="small" type="pulse" />
      </slot>
    </div>
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
      <template v-if="data?.length">
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
      </template>
      <template v-else>
        <div class="mc-table-body-empty">
          <slot name="empty">No data</slot>
        </div>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { McTablePlusBodyProps } from "./types";
import McLoading from "../mc-loading/mc-loading.vue";
import McTableBodyCell from "./mc-table-body-cell.vue";
import { MC_TABLE_BODY } from "./constant";

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
