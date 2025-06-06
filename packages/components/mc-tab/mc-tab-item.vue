<template>
  <div class="mc-tab-item">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { TabItemProps } from "./types";

// options
defineOptions({ name: "McTabItem" });

// props
defineProps<TabItemProps>();
</script>

<style scoped lang="scss">
@use "./styles/mc-tab-item.scss";
</style>
