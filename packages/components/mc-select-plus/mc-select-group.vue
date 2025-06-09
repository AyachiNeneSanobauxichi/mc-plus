<template>
  <ul class="mc-select-group">
    <div class="mc-select-group-label">{{ label }}</div>
    <slot></slot>
  </ul>
</template>

<script setup lang="ts">
import type { SelectGroupProps } from "./types";

// options
defineOptions({ name: "McSelectGroup" });

// props
defineProps<SelectGroupProps>();
</script>

<style scoped lang="scss">
@use "./styles/mc-select-group.scss";
</style>
