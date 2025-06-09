<template>
  <li class="mc-select-option">
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
import type { SelecOptinonProps } from "./types";

// options
defineOptions({ name: "McSelectOption" });

// props
defineProps<SelecOptinonProps>();
</script>

<style scoped lang="scss">
@use "./styles/mc-select-option.scss";
</style>
