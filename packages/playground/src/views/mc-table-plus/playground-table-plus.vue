<template>
  <div class="playground-table-plus">
    <section>
      <mc-table-plus
        :data="tableData"
        :loading="loading"
        @change:sort="handleSort"
      >
        <mc-table-column prop="label" label="Label" />
        <mc-table-column prop="holder" label="Holder" />
        <mc-table-column prop="type" label="Type" />
        <mc-table-column prop="accountNumber" label="Account Number" />
        <mc-table-column prop="swiftCode" label="SWFIT Code" />
        <mc-table-column prop="ation" label="Actions" />
      </mc-table-plus>
    </section>

    <section>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="label" label="Label" />
        <el-table-column prop="holder" label="Holder" />
        <el-table-column prop="type" label="Type" />
        <el-table-column prop="accountNumber" label="Account Number" />
        <el-table-column prop="swiftCode" label="SWFIT Code" />
        <el-table-column prop="ation" label="Actions" />
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
import type { McTableSort } from "@mc-plus/components/mc-table-plus/types";
import McTablePlus from "../../../../components/mc-table-plus/mc-table-plus.vue";
import McTableColumn from "../../../../components/mc-table-plus/mc-table-column.vue";
import { onMounted, ref } from "vue";
import { McButton } from "mc-plus";
import { getDepositList } from "../../apis";

const tableData = ref<any[]>([]);

const loading = ref<boolean>(false);

onMounted(async () => {
  const dataList = await fetchData();
  console.log("dataList: ", dataList);
  tableData.value = dataList;
});

const fetchData = async () => {
  const res = await getDepositList({
    pageNum: 1,
    pageSize: 10,
  });

  return res.data.list;
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
  console.log("handleSort", prop, sort);
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
