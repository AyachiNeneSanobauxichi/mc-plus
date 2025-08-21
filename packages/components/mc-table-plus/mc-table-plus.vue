<template>
  <div class="mc-table-plus">
    <mc-table-header :columns="columns" />
    <mc-table-body :columns="columns" :data="tableData" :loading="loading">
      <template #loading>
        <slot name="loading"></slot>
      </template>
      <template #empty>
        <slot name="empty"></slot>
      </template>
    </mc-table-body>
    <mc-table-footer />
  </div>
</template>

<script setup lang="ts">
import type {
  McTableColumn,
  McTableEmits,
  McTablePaginationType,
  McTableProps,
  McTableSort,
} from "./types";
import { provide, reactive, ref, useSlots, watch } from "vue";
import { map, orderBy } from "lodash-es";
import { MC_TABLE_CTX_KEY, MC_TABLE_PLUS } from "./constant";
import { generateColumns } from "./utils";
import McTableHeader from "./mc-table-header.vue";
import McTableBody from "./mc-table-body.vue";
import McTableFooter from "./mc-table-footer.vue";

// options
defineOptions({ name: MC_TABLE_PLUS });

// props
const props = withDefaults(defineProps<McTableProps>(), {
  data: () => [],
  loading: false,
  sortType: "back",
  paginationType: "back",
});

// emits
const emit = defineEmits<McTableEmits>();

// table columns
const columns = ref<McTableColumn[]>([]);

// table data
const tableData = ref<any[]>(props.data);

// watch data
watch(
  () => props.data,
  () => {
    tableData.value = props.data;
    resetSort();
  }
);

// reset sort
const resetSort = () => {
  if (props.sortType === "front") {
    columns.value = map(columns.value, (column) => {
      if (column.sort) {
        return { ...column, sort: "normal" };
      } else {
        return column;
      }
    });
  }
};

// handle sort
const handleSort = (prop: string, sort: McTableSort) => {
  columns.value = map(columns.value, (column) => {
    if (column.prop === prop) {
      return { ...column, sort };
    } else if (column.sort) {
      return { ...column, sort: "normal" };
    } else {
      return column;
    }
  });

  if (props.sortType === "front") {
    if (sort === "normal") {
      tableData.value = props.data;
    } else {
      tableData.value = orderBy(tableData.value, [prop], [sort]);
    }
  } else {
    emit("change:sort", prop, sort);
  }
};

// pagination
const pagination = reactive<McTablePaginationType>({
  pageNum: 1,
  pageSize: 10,
  size: 10,
  total: 100,
});

// provide
provide(MC_TABLE_CTX_KEY, {
  handleSort,
  pagination,
});

// slots
const slots = useSlots();

// slots change
watch(
  () => slots.default?.(),
  () => {
    columns.value = generateColumns(slots.default?.());
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="scss">
@use "./styles/mc-table.scss";
</style>
