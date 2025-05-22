<template>
  <div class="mc-select-group">{{ label }}</div>
</template>

<script setup lang="ts">
import type { SelectGroupProps } from "./types";

defineProps<SelectGroupProps>();
</script>

<style scoped lang="scss">
@use "./styles/mc-select-group";
</style>
