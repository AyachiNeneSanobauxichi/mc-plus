<template>
  <div class="playground-table">
    <mc-table :columns="columns" :data="data"></mc-table>
  </div>
</template>

<script setup lang="ts">
import type { RowData, TableColumn } from "mc-plus";
import McTable from "../../../../components/mc-table/mc-table.vue";

const columns: TableColumn[] = [
  { prop: "name", label: "Name", sortable: true },
  { prop: "age", label: "Age", sortable: true },
  { prop: "gender", label: "Gender", sortable: true },
];

const data: RowData[] = [
  { name: "Hirasawa Yui", age: 20, gender: "FeMale" },
  { name: "Nakano Azusa", age: 19, gender: "Female" },
  { name: "Akiyama Mio", age: 20, gender: "Female" },
  { name: "Tainaka Ritsu", age: 20, gender: "Female" },
  { name: "Kotobuku Tsumugi", age: 20, gender: "Female" },
];
</script>

<style scoped lang="scss"></style>
