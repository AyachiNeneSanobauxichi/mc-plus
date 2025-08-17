<template>
  <div class="playground-table-plus">
    <section>
      <mc-table-plus
        :data="tableData"
        :loading="loading"
        @change:sort="handleSort"
      >
        <template #loading>
          <div>Data is loading...</div>
        </template>
        <template #empty>
          <div>No Students</div>
        </template>
        <mc-table-column
          prop="name"
          label="Name"
          desc="Student Name"
          width="33%"
          sortable
        >
          <template #header-title>
            <div>Student Name</div>
          </template>
          <template #header-desc>
            <div>the name of the student</div>
          </template>
        </mc-table-column>
        <mc-table-column
          prop="age"
          label="Age"
          desc="Student Age"
          width="33%"
          sortable
        >
        </mc-table-column>
        <mc-table-column prop="position" width="33%">
          <template #value>
            <div class="position-action">
              <mc-button>Position</mc-button>
            </div>
          </template>
        </mc-table-column>
      </mc-table-plus>
    </section>
    <section>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="Name" sortable width="180" />
        <el-table-column prop="age" label="Age" sortable width="180" />
        <el-table-column prop="position" label="Position" sortable />
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
import { delay } from "@mc-plus/utils";
import { orderBy } from "lodash-es";

interface User {
  name: string;
  age: number;
  position: "guitarist" | "bassist" | "drummer" | "keyboardist";
}

const _data: User[] = [
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

const tableData = ref<User[]>([]);

const loading = ref<boolean>(false);

onMounted(async () => {
  loading.value = true;
  await delay(8000);
  tableData.value = _data;
  loading.value = false;
  console.log("tableData: ", tableData.value);
});

// handle fetch data
const handleFetchData = async () => {
  await delay(3000);
  console.log("fetch data");
  tableData.value = _data.slice(0, 2);
};

// handle reset data
const handleResetData = () => {
  tableData.value = _data;
};

// handle empty data
const handleEmptyData = () => {
  tableData.value = [];
};

// handle sort
const handleSort = async (prop: string, sort: McTableSort) => {
  console.log("handleSort", prop, sort);
  loading.value = true;
  await delay(8000);
  if (sort === "normal") {
    tableData.value = _data;
  } else {
    tableData.value = orderBy(tableData.value, [prop], [sort]);
  }
  loading.value = false;
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
