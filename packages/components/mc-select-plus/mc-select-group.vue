<template>
  <ul class="mc-select-group">
    <li class="mc-select-group-label">{{ label }}</li>
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
