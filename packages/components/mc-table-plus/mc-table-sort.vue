<template>
  <div class="mc-table-sort" :class="`mc-table-sort-${sort}`">
    <mc-icon
      name="Up-Chevron02"
      :class="{ 'mc-table-sort-actived': sort === 'asc' }"
      :style="{ height: '8px' }"
    />
    <mc-icon
      name="Down-Chevron02"
      :class="{ 'mc-table-sort-actived': sort === 'desc' }"
      :style="{ height: '8px' }"
    />
  </div>
</template>

<script setup lang="ts">
import type { McTableSortProps } from "./types/mc-table-sort";
import { MC_TABLE_SORT } from "./constant";
import McIcon from "../mc-icon/mc-icon.vue";

// options
defineOptions({ name: MC_TABLE_SORT });

// props
withDefaults(defineProps<McTableSortProps>(), {
  sort: "normal",
});
</script>

<style scoped lang="scss">
@use "./styles/mc-table-sort.scss";
</style>
