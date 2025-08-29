<template>
  <div class="mc-table-plus" :style="{ width, height }">
    <div class="mc-table-wrapper">
      <mc-table-header />
      <div class="mc-table-body-wrapper">
        <template v-if="loading">
          <div class="mc-table-loading">
            <slot name="loading">
              <mc-loading loading size="small" type="pulse" />
            </slot>
          </div>
        </template>
        <template v-if="isEmpty">
          <div class="mc-table-empty">
            <slot name="empty">No available data</slot>
          </div>
        </template>
        <template v-else>
          <div
            class="mc-table-body-inner"
            :class="{ 'mc-table-body-fixed-height': !!props.height }"
          >
            <mc-table-body></mc-table-body>
          </div>
        </template>
      </div>
    </div>
    <mc-table-footer v-if="showTableFooter" />
  </div>
</template>

<script setup lang="ts">
import type {
  McTableColumn,
  McTableEmits,
  McTableProps,
  McTableRowState,
  McTableSort,
} from "./types";
import { computed, provide, ref, useSlots, watch } from "vue";
import { map, orderBy } from "lodash-es";
import McLoading from "../mc-loading/mc-loading.vue";
import McTableHeader from "./mc-table-header.vue";
import McTableBody from "./mc-table-body.vue";
import McTableFooter from "./mc-table-footer.vue";
import { useWidthHeight } from "@mc-plus/hooks";
import { usePagination } from "./hooks";
import { generateColumns } from "./utils";
import { MC_TABLE_CTX_KEY, MC_TABLE_PLUS } from "./constant";

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
    resetRowState();
    resetSort();
  }
);

// row state
const rowState = ref<McTableRowState[]>([]);

// reset row state
const resetRowState = () => {
  rowState.value = new Array(tableData.value.length).fill({
    isExpand: false,
  });
};

// set row state by index
const setRowStateByIndex = (
  index: number,
  payload: Partial<McTableRowState>
) => {
  rowState.value[index] = {
    ...rowState.value[index],
    ...payload,
  };

  console.log("After set row state: ", rowState.value);
};

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

// is empty
const isEmpty = computed(() => {
  return !props.loading && !tableData.value?.length;
});

// pagination
const { pagination, hasPagination, handlePagination } = usePagination();

// show table footer
const showTableFooter = computed(() => {
  return hasPagination.value && tableData.value?.length;
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

// provide
provide(MC_TABLE_CTX_KEY, {
  columns,
  data: tableData,
  rowState,
  isLoading: computed(() => !!props.loading),
  pagination,
  handleSort,
  handlePagination,
  setRowStateByIndex,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-table.scss";
</style>
