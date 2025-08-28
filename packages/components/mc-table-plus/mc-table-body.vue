<template>
  <table class="mc-table-body">
    <colgroup class="mc-table-body-colgroup">
      <col
        v-for="column in columns"
        :key="column.prop"
        :width="column.width"
        :class="[
          'mc-table-body-col',
          `mc-table-body-col-${column.columnAlign}`,
          { 'mc-table-body-col-expand': column.isExpand },
        ]"
      />
    </colgroup>
    <tbody class="mc-table-body-tbody">
      <template v-for="(item, index) in data" :key="index">
        <tr class="mc-table-body-tr">
          <mc-table-body-cell
            v-for="column in columns"
            :key="column.prop"
            :column-align="column.columnAlign"
            :value="item?.[column.prop]"
            :type="column.isExpand ? 'expand' : 'normal'"
            :row-index="index"
          >
            <template #default v-if="column.tableValue">
              <component :is="column.tableValue" />
            </template>
            <template #value v-if="column.tableValueContent">
              <component :is="column.tableValueContent" />
            </template>
          </mc-table-body-cell>
        </tr>
        <template v-if="isExpand(index)">
          <div class="mc-table-body-expand-row">
            {{ "Expand Index: " + index }}
          </div>
        </template>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { isNil } from "lodash-es";
import McTableBodyCell from "./mc-table-body-cell.vue";
import { MC_TABLE_BODY } from "./constant";
import { useTableContext } from "./hooks";

// options
defineOptions({ name: MC_TABLE_BODY });

// table context
const { columns, data, rowState } = useTableContext();

// is expand
const isExpand = (index: number) => {
  if (isNil(rowState?.value[index])) return false;
  return rowState.value[index].isExpand;
};
</script>

<style scoped lang="scss">
@use "./styles/mc-table-body.scss";
</style>
