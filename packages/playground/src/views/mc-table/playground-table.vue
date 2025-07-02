<template>
  <div class="playground-table">
    <mc-table
      :data="displayData"
      :columns="columns"
      :height="700"
      :pagination="pagination"
      @page-change="handlePageChange"
    ></mc-table>
  </div>
</template>

<script setup lang="ts">
import type { PaginationConfig, RowData, TableColumn } from "mc-plus";
import McTable from "../../../../components/mc-table/mc-table.vue";
import { ref } from "vue";

const columns: TableColumn[] = [
  { prop: "name", label: "Name", sortable: true },
  { prop: "age", label: "Age", sortable: true },
  { prop: "gender", label: "Gender", sortable: true },
];

const data: RowData[] = [
  // 随机生成 100 条数据
  ...Array.from({ length: 100 }, (_, index) => ({
    name: `Name ${index}`,
    age: Math.floor(Math.random() * 100),
    gender: Math.random() > 0.5 ? "Male" : "Female",
  })),
];

const pagination = ref<PaginationConfig>({
  currentPage: 1,
  pageSize: 10,
  total: 100,
  pageSizes: [10, 20, 50, 100],
});

const displayData = ref<RowData[]>([
  ...data.slice(0, pagination.value.pageSize),
]);

const handlePageChange = ({
  pageSize,
  pageNum,
}: {
  pageSize: number;
  pageNum: number;
}) => {
  displayData.value = [
    ...data.slice(pageSize * (pageNum - 1), pageSize * pageNum),
  ];
};
</script>

<style scoped lang="scss">
.playground-table {
  background-color: lightblue;
}
</style>
