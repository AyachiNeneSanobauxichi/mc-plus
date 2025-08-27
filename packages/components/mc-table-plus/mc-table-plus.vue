<template>
  <div class="mc-table-plus" :style="{ width, height }">
    <div class="mc-table-wrapper">
      <mc-table-header :columns="columns" />
      <div class="mc-table-body-wrapper">
        <mc-table-body :columns="columns" :data="tableData" :loading="loading">
          <template #loading>
            <slot name="loading"></slot>
          </template>
          <template #empty>
            <slot name="empty"></slot>
          </template>
        </mc-table-body>
      </div>
    </div>
    <mc-table-footer v-if="tableData?.length" />
  </div>
</template>

<script setup lang="ts">
import type {
  McTableColumn,
  McTableEmits,
  McTableProps,
  McTableSort,
} from "./types";
import { computed, provide, ref, useSlots, watch } from "vue";
import { map, orderBy } from "lodash-es";
import { MC_TABLE_CTX_KEY, MC_TABLE_PLUS } from "./constant";
import { generateColumns } from "./utils";
import McTableHeader from "./mc-table-header.vue";
import McTableBody from "./mc-table-body.vue";
import McTableFooter from "./mc-table-footer.vue";
import { usePagination } from "./hooks";
import { useWidthHeight } from "@mc-plus/hooks";

// options
defineOptions({ name: MC_TABLE_PLUS });

// props
const props = withDefaults(defineProps<McTableProps>(), {
  data: () => [],
  loading: false,
  sortType: "back",
  width: "100%",
});

// emits
const emit = defineEmits<McTableEmits>();

// size
const { width, height } = useWidthHeight();

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

const { pagination, handlePagination } = usePagination();

// provide
provide(MC_TABLE_CTX_KEY, {
  isLoading: computed(() => !!props.loading),
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
