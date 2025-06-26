<template>
  <div class="mc-step-v2">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { StepV2Emits, StepV2Props } from "./types";

// options
defineOptions({ name: "McStepV2" });

// props
const props = withDefaults(defineProps<StepV2Props>(), {});

// emits
const emits = defineEmits<StepV2Emits>();
</script>

<style scoped lang="scss">
@use "./styles/mc-step-v2.scss";
</style>
