<template>
  <div class="mc-form">
    <form>
      <slot></slot>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { FormProps } from "./types";

defineProps<FormProps>();
</script>

<style scoped lang="scss">
@use "./styles/mc-form.scss";
</style>
