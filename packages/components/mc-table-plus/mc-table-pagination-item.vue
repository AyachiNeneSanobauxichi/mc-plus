<template>
  <li
    class="mc-table-pagination-item"
    :class="[
      {
        'mc-table-pagination-item-active': isActive,
        'mc-table-pagination-item-disabled': isDisabled,
      },
      className,
    ]"
  >
    <template v-if="type === 'page'">
      {{ value }}
    </template>
    <template v-else-if="type === 'prev'">
      <mc-icon name="Left-Chevron" />
    </template>
    <template v-else-if="type === 'next'">
      <mc-icon name="Right-Chevron" />
    </template>
    <template v-else-if="type === 'first'">
      <mc-icon name="First" />
    </template>
    <template v-else-if="type === 'last'">
      <mc-icon name="Last" />
    </template>
    <template v-else-if="type === 'ellipsis'">
      <mc-table-ellipsis />
    </template>
  </li>
</template>

<script setup lang="ts">
import type { McTablePaginationItemProps } from "./types";
import { computed } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";
import McTableEllipsis from "./mc-table-ellipsis.vue";
import { MC_TABLE_PAGINATION_ITEM } from "./constant";

// options
defineOptions({ name: MC_TABLE_PAGINATION_ITEM });

// props
const props = withDefaults(defineProps<McTablePaginationItemProps>(), {
  type: "page",
  value: 1,
  isActive: false,
  isDisabled: false,
});

// class name
const className = computed(() => {
  switch (props.type) {
    case "page":
      return "mc-table-pagination-item-page";
    case "prev":
      return "mc-table-pagination-item-prev";
    case "next":
      return "mc-table-pagination-item-next";
    case "first":
      return "mc-table-pagination-item-first";
    case "last":
      return "mc-table-pagination-item-last";
    case "ellipsis":
      return "mc-table-pagination-item-ellipsis";
    default:
      return "mc-table-pagination-item";
  }
});
</script>

<style scoped lang="scss">
@use "./styles/mc-table-pagination-item.scss";
</style>
