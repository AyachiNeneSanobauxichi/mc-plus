<template>
  <div class="playground-table-plus">
    <section>
      <mc-table-plus
        :data="tableData"
        :loading="loading"
        :pagination="pagination"
        :height="500"
        @change:sort="handleSort"
        @change:pagination="handlePagination"
      >
        <mc-table-column prop="label" label="Label" width="200" />
        <mc-table-column prop="name" label="Name" width="200" />
        <mc-table-column
          prop="updateTime"
          label="Last Updated Date"
          width="200"
        />
        <mc-table-column prop="account" label="Account" column-align="center" />
        <mc-table-column prop="type" label="Type" />
        <mc-table-column prop="currency" label="Currency" />
        <mc-table-column
          prop="amount"
          label="Amount"
          width="200"
          column-align="right"
        />
        <mc-table-column prop="status" label="Status" />
        <mc-table-column prop="action" label="Actions" />
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
import { McButton } from "mc-plus";
import McTablePlus from "../../../../components/mc-table-plus/mc-table-plus.vue";
import McTableColumn from "../../../../components/mc-table-plus/mc-table-column.vue";
import { getDepositList } from "../../apis";

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
