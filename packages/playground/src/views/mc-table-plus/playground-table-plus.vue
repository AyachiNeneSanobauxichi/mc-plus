<template>
  <div class="playground-table-plus">
    <section>
      <mc-table-plus>
        <mc-table-column prop="name" label="Name" />
        <mc-table-column prop="age" label="Age" />
        <mc-table-column prop="position" label="Position" />
      </mc-table-plus>
    </section>
    <section>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="Name" sortable width="180" />
        <el-table-column prop="age" label="Age" sortable width="180" />
        <el-table-column prop="position" label="Position" sortable />
      </el-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import McTablePlus from "../../../../components/mc-table-plus/mc-table-plus.vue";
import McTableColumn from "../../../../components/mc-table-plus/mc-table-column.vue";

interface User {
  name: string;
  age: number;
  position: "guitarist" | "bassist" | "drummer" | "keyboardist";
}

const tableData: User[] = [
  {
    name: "Hirasawa Yui",
    age: 19,
    position: "guitarist",
  },
  {
    name: "Nakano Azusa",
    age: 18,
    position: "guitarist",
  },
  {
    name: "Akiyama Mio",
    age: 19,
    position: "bassist",
  },
  {
    name: "Tainaka Ritsu",
    age: 19,
    position: "drummer",
  },
  {
    name: "Kotobuku Tsumugi",
    age: 19,
    position: "keyboardist",
  },
];
</script>

<style scoped lang="scss">
.playground-table-plus {
  box-sizing: border-box;
  padding: 200px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
