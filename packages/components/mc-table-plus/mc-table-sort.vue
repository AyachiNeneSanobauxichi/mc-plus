<template>
  <div class="mc-table-sort" :class="`mc-table-sort-${sort}`">
    <mc-icon :name="iconName" />
  </div>
</template>

<script setup lang="ts">
import type { IconType } from "../mc-icon";
import type { McTableSortProps } from "./types/mc-table-sort";
import { MC_TABLE_SORT } from "./constant";
import McIcon from "../mc-icon/mc-icon.vue";
import { computed } from "vue";

// options
defineOptions({ name: MC_TABLE_SORT });

// props
const props = withDefaults(defineProps<McTableSortProps>(), {
  sort: "normal",
});

// handle click
// const handleClick = () => {
//   let _sort: McTableSort = "normal";

//   switch (props.sort) {
//     case "normal":
//       _sort = "desc";
//       break;
//     case "desc":
//       _sort = "asc";
//       break;
//     case "asc":
//       _sort = "normal";
//       break;
//   }
// };

// icon name
const iconName = computed<IconType>(() => {
  switch (props.sort) {
    case "normal":
      return "Down-Chevron02";
    case "asc":
      return "Up-Chevron02";
    case "desc":
      return "Down-Chevron02";
  }
});
</script>

<style scoped lang="scss">
@use "./styles/mc-table-sort.scss";
</style>
