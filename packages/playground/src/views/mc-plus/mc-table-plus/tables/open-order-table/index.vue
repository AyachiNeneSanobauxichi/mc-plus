<template>
  <div class="open-order-table">
    <mc-table-plus
      :data="openOrderList"
      :loading="loading"
      sort-type="front"
      :expand-condition="expandCondition"
      :fetch-expand-data="fetchExpandData"
    >
      <mc-table-column prop="tokenName" label="Token Name" sortable>
        <template #value="{ value, row }">
          <link-cell :link="value" :desc="row.tokenDesc" />
        </template>
      </mc-table-column>
      <mc-table-column prop="type" label="Type" sortable>
        <template #value="{ value }">
          <mc-currency-icon :cdn-url="CDN_URL" :currency="value" />
        </template>
      </mc-table-column>
      <mc-table-column
        prop="avgPrice"
        label="Avg Price"
        desc="Order Price"
        column-align="right"
      >
        <template #value="{ value, row }">
          <desc-cell :value="value" :desc="row.orderPrice" />
        </template>
        <template #expand="{ expandRow }">
          <div class="expand-cell">{{ expandRow.avgPrice }}</div>
        </template>
      </mc-table-column>
      <mc-table-column
        prop="fillQty"
        label="Fill Qty"
        desc="Order Qty"
        column-align="right"
      >
        <template #value="{ value, row }">
          <desc-cell :value="value" :desc="row.orderQty" />
        </template>

        <template #expand="{ expandRow }">
          <div class="expand-cell">{{ expandRow.fillQty }}</div>
        </template>
      </mc-table-column>
      <mc-table-column prop="status" label="Status" sortable>
        <template #value="{ value }">
          <mc-status :type="getStatusType(value)">{{ value }}</mc-status>
        </template>
        <template #expand="{ expandRow }">
          <div class="expand-cell expand-left-cell">
            <mc-status :type="getStatusType(expandRow.status)">
              {{ expandRow.status }}
            </mc-status>
          </div>
        </template>
      </mc-table-column>
      <mc-table-column prop="lastUpdate" label="Last Update" sortable>
        <template #expand="{ expandRow }">
          <div class="expand-cell expand-left-cell">
            {{ expandRow.lastUpdate }}
          </div>
        </template>
      </mc-table-column>
      <mc-table-column prop="expand" />
      <mc-table-column prop="Action" width="40">
        <template #value>
          <div class="action-cell">
            <mc-icon name="Cross" />
          </div>
        </template>
      </mc-table-column>
    </mc-table-plus>
  </div>
</template>

<script setup lang="ts">
import type { OpenOrderTableRow } from "../../mock/types";
import { onMounted, ref } from "vue";
import { McCurrencyIcon, McStatus, McIcon } from "mc-plus";
import McTablePlus from "../../../../../../../components/mc-table-plus/mc-table-plus.vue";
import McTableColumn from "../../../../../../../components/mc-table-plus/mc-table-column.vue";
import LinkCell from "../components/link-cell/index.vue";
import DescCell from "../components/desc-cell/index.vue";
import {
  CDN_URL,
  getOpenOrderExpandList,
  getOpenOrderList,
  getStatusType,
} from "../../mock";

// open order list
const openOrderList = ref<OpenOrderTableRow[]>([]);

// loading
const loading = ref<boolean>(false);

// init data
onMounted(async () => {
  try {
    loading.value = true;
    const { data } = await getOpenOrderList();
    openOrderList.value = data;
    loading.value = false;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

// expand condition
const expandCondition = (row: OpenOrderTableRow) => {
  return row.status === "Partially Completed";
};

// fetch expand data
const fetchExpandData = async (row: OpenOrderTableRow) => {
  loading.value = true;
  const { data } = await getOpenOrderExpandList(row.tokenName);
  loading.value = false;

  return data;
};
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;

$action_color: var(--mc-teal-500);

.open-order-table {
  .expand-cell {
    @include mixin.flex-center($align: flex-start, $justify: flex-end);
    height: 80px;
    padding: 16px 8px;
    box-sizing: border-box;

    &.expand-left-cell {
      justify-content: flex-start;
    }
  }

  .action-cell {
    cursor: pointer;
    color: $action_color;
  }
}
</style>
