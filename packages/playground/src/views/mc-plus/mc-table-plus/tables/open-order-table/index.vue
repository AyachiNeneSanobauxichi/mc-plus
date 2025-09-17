<template>
  <div class="open-order-table">
    <mc-table-plus :data="openOrderList" :loading="loading" sort-type="front">
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
      </mc-table-column>
      <mc-table-column prop="status" label="Status" sortable>
        <template #value="{ value }">
          <mc-status :type="getStatusType(value)">{{ value }}</mc-status>
        </template>
      </mc-table-column>
      <mc-table-column
        prop="lastUpdate"
        label="Last Update"
        sortable
      ></mc-table-column>
    </mc-table-plus>
  </div>
</template>

<script setup lang="ts">
import type { OpenOrderTableRow } from "../../mock/types";
import { onMounted, ref } from "vue";
import { McCurrencyIcon, McStatus } from "mc-plus";
import McTablePlus from "../../../../../../../components/mc-table-plus/mc-table-plus.vue";
import McTableColumn from "../../../../../../../components/mc-table-plus/mc-table-column.vue";
import LinkCell from "../components/link-cell/index.vue";
import DescCell from "../components/desc-cell/index.vue";
import { CDN_URL, getOpenOrderList, getStatusType } from "../../mock";

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
</script>

<style scoped lang="scss"></style>
