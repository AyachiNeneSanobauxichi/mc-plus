<template>
  <div class="mc-form-item">
    <label
      class="mc-form-item__label"
      :class="{ 'mc-form-item__label--required': required }"
      v-if="label"
      >{{ label }}</label
    >
    <div class="mc-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormItemProps } from "./types";

defineProps<FormItemProps>();
</script>

<style scoped lang="scss">
@use "./styles/mc-form-item.scss";
</style>
