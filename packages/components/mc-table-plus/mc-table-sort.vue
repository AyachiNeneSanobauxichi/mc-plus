<template>
  <div class="mc-table-sort" :class="`mc-table-sort-${sort}`">
    <mc-icon :name="iconName" />
  </div>
</template>

<script setup lang="ts">
import type { IconType } from "../mc-icon";
import type { McTableSortProps } from "./types/mc-table-sort";
import { computed } from "vue";
import { MC_TABLE_SORT } from "./constant";
import McIcon from "../mc-icon/mc-icon.vue";

// options
defineOptions({ name: MC_TABLE_SORT });

// props
const props = withDefaults(defineProps<McTableSortProps>(), {
  sort: "normal",
});

// icon name
const iconName = computed<IconType>(() => {
  switch (props.sort) {
    case "normal":
      return "Sort";
    case "asc":
      return "Sort_Asc";
    case "desc":
      return "Sort_Desc";
  }
});
</script>

<style scoped lang="scss">
@use "./styles/mc-table-sort.scss";
</style>
