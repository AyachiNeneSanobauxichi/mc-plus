<template>
  <th class="mc-table-header-cell" :style="{ width }">
    <div
      class="mc-table-header-cell-wrapper"
      :style="{ justifyContent: align }"
    >
      <div class="mc-table-header-cell-inner" :style="{ alignItems: align }">
        <div class="mc-table-header-cell-title">
          <div class="mc-table-header-cell-title-text">
            <slot name="title">{{ title }}</slot>
          </div>
          <div class="mc-table-header-cell-help" v-if="help">
            <mc-tooltip :content="help" icon-name="Help"></mc-tooltip>
          </div>
          <div class="mc-table-header-cell-sort" v-if="sort">
            <mc-table-sort
              :sort="sort"
              @update:sort="emit('update:sort', $event)"
            />
          </div>
        </div>
        <template v-if="desc || $slots.desc">
          <slot name="desc">
            <div class="mc-table-header-cell-desc">{{ desc }}</div>
          </slot>
        </template>
      </div>
    </div>
  </th>
</template>

<script setup lang="ts">
import type { McTableHeaderCellEmits, McTableHeaderCellProps } from "./types";
import { computed } from "vue";
import { useWidthHeight } from "@mc-plus/hooks";
import McTooltip from "../mc-tooltip/mc-tooltip.vue";
import { MC_TABLE_HEADER_CELL } from "./constant";
import McTableSort from "./mc-table-sort.vue";

// options
defineOptions({ name: MC_TABLE_HEADER_CELL });

// props
const props = withDefaults(defineProps<McTableHeaderCellProps>(), {
  columnAlign: "left",
  sort: undefined,
});

// emits
const emit = defineEmits<McTableHeaderCellEmits>();

// use size
const { width } = useWidthHeight();

// align
const align = computed(() => {
  switch (props.columnAlign) {
    case "left":
      return "flex-start";
    case "center":
      return "center";
    case "right":
      return "flex-end";
  }
});
</script>

<style scoped lang="scss">
@use "./styles/mc-table-header-cell.scss";
</style>
