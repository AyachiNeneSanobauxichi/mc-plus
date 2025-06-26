<template>
  <div class="mc-step-item-v2"></div>
</template>

<script setup lang="ts">
import type { StepItemV2Props } from "./types";

// options
defineOptions({ name: "McStepItemV2" });

// props
const props = withDefaults(defineProps<StepItemV2Props>(), {});
</script>

<style scoped lang="scss">
@use "./styles//mc-step-item-v2.scss";
</style>
