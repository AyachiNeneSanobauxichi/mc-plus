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
    <mc-table-footer v-if="tableData?.length" />
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
import { onMounted, provide, reactive, ref, useSlots, watch } from "vue";
import { assign, debounce, map, orderBy } from "lodash-es";
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

// pagination default
const PAGINATION_DEFAULT: McTablePaginationType = {
  pageNum: 1,
  pageSize: 25,
  total: 1,
  pageSizes: [25, 50, 75, 100],
};

// pagination
const pagination = reactive<McTablePaginationType>({ ...PAGINATION_DEFAULT });

// init pagination
onMounted(() => {
  setPagination(props.pagination || PAGINATION_DEFAULT);
});

// pagination props change
watch(
  () => props.pagination,
  (_pagination) => {
    setPagination(_pagination || PAGINATION_DEFAULT);
  },
  {
    deep: true,
  }
);

// set pagination
const setPagination = (_pagination: Partial<McTablePaginationType>) => {
  assign(pagination, { ..._pagination });
};

// emit pagination
const emitPagination = debounce(() => {
  emit("change:pagination", pagination);
}, 300);

// handle pagination
const handlePagination = (_pagination: Partial<McTablePaginationType>) => {
  assign(pagination, { ..._pagination });
  emitPagination();
};

// provide
provide(MC_TABLE_CTX_KEY, {
  pagination,
  handleSort,
  handlePagination,
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
