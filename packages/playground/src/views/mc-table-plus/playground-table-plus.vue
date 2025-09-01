<template>
  <div class="playground-table-plus">
    <section class="mc-table-plus-section">
      <mc-table-plus
        :data="tableData"
        :pagination="pagination"
        :loading="loading"
        sort-type="front"
        @change:sort="handleSort"
        @change:pagination="handlePagination"
      >
        <template #expand="{ row, rowIndex }">
          <div>row: {{ rowIndex }} {{ row }}</div>
        </template>
        <mc-table-column prop="label" label="Label" width="200">
          <template #value="{ value }">
            <span class="deposit-lable">{{ value }}</span>
          </template>
        </mc-table-column>
        <mc-table-column prop="name" label="Name" width="200">
        </mc-table-column>
        <mc-table-column
          prop="updateTime"
          label="Last Updated Date"
          width="200"
        ></mc-table-column>
        <mc-table-column prop="account" label="Account">
          <template #value="{ value }">{{ ACCOUNT_ENUM.get(value) }}</template>
        </mc-table-column>
        <mc-table-column prop="type" label="Type">
          <template #value="{ value }">{{ TYPE_ENUM.get(value) }}</template>
        </mc-table-column>
        <mc-table-column prop="currency" label="Currency">
          <template #value="{ value }">
            <mc-currency-icon :cdn-url="CDN_URL" :currency="value" />
          </template>
        </mc-table-column>
        <mc-table-column
          prop="amount"
          label="Amount"
          width="200"
          column-align="right"
        ></mc-table-column>
        <mc-table-column
          prop="status"
          label="Status"
          sortable
        ></mc-table-column>
        <mc-table-column prop="action" label="Actions">
          <template #value="{ row }">
            <div>
              <mc-button v-if="row.status === 11" type="link">Review</mc-button>
              <mc-button v-else-if="row.status === 15" type="link">
                Sweep
              </mc-button>
              <mc-button v-else-if="row.status === 18" type="link">
                Refund
              </mc-button>
            </div>
          </template>
        </mc-table-column>
        <mc-table-column prop="expand" />
      </mc-table-plus>
    </section>

    <section>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="label" label="Label" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="updateTime" label="Last Updated Date" />
        <el-table-column prop="account" label="Account" />
        <el-table-column prop="type" label="Type" />
        <el-table-column prop="currency" label="Currency" />
        <el-table-column prop="amount" label="Amount" />
        <el-table-column prop="status" label="Status" />
        <el-table-column prop="action" label="Actions" />
      </el-table>
    </section>

    <section class="tool-bar">
      <mc-button @click="handleFetchData">Fetch Data</mc-button>
      <mc-button @click="handleResetData">Reset Data</mc-button>
      <mc-button @click="handleEmptyData">Empty Data</mc-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import type {
  McTablePaginationType,
  McTableSort,
} from "@mc-plus/components/mc-table-plus/types";
import type { DepositTableRow } from "./types";
import { onMounted, ref } from "vue";
import { map } from "lodash-es";
import { McButton, McCurrencyIcon } from "mc-plus";
import McTablePlus from "../../../../components/mc-table-plus/mc-table-plus.vue";
import McTableColumn from "../../../../components/mc-table-plus/mc-table-column.vue";
import { getDepositList } from "../../apis";
import { ACCOUNT_ENUM, TYPE_ENUM, CDN_URL } from "./enums";

const tableData = ref<DepositTableRow[]>([]);

const loading = ref<boolean>(false);

const pagination = ref<McTablePaginationType>({
  pageNum: 1,
  pageSize: 10,
  total: 1,
  pageSizes: [10, 20, 50, 100],
});

onMounted(() => {
  fetchData(pagination.value.pageNum, pagination.value.pageSize);
});

// fetch data
const fetchData = async (pageNum: number, pageSize: number) => {
  loading.value = true;
  const { data } = await getDepositList({
    pageNum,
    pageSize,
  });

  if (data?.list?.length < 0) {
    pagination.value.total = 0;
    tableData.value = [];
    return;
  }

  pagination.value.total = data.total;
  pagination.value.pageNum = data.pageNum;
  pagination.value.pageSize = data.pageSize;

  tableData.value = map(data.list, (item) => ({
    label: item.paymentCode,
    name: item.clientName,
    updateTime: new Date(item.updateAt).toLocaleString(),
    account: item.payerAccountType,
    type: item.paymentType,
    currency: item.currency,
    amount: item.receiveAmount,
    status: item.status,
  }));
  loading.value = false;
};

// handle fetch data
const handleFetchData = () => {};

// handle reset data
const handleResetData = () => {};

// handle empty data
const handleEmptyData = () => {
  tableData.value = [];
};

// handle sort
const handleSort = (prop: string, sort: McTableSort) => {
  console.log("handleSort: ", prop, sort);
};

// handle pagination
const handlePagination = (pagination: McTablePaginationType) => {
  fetchData(pagination.pageNum, pagination.pageSize);
};
</script>

<style scoped lang="scss">
.playground-table-plus {
  box-sizing: border-box;
  padding: 200px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  .mc-table-plus-section {
    background-color: skyblue;

    .deposit-lable {
      color: var(--mc-teal-500);
      font-weight: 600;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
        color: var(--mc-teal-900);
      }
    }
  }

  .position-container {
    color: var(--mc-teal-500);
  }

  .position-action {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tool-bar {
    display: flex;
    align-content: center;
    justify-content: flex-start;
    gap: 16px;
  }
}
</style>
