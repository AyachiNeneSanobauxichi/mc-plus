<template>
  <div class="mc-step-child-item-v2">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { StepChildItemV2Props } from "./types";

// options
defineOptions({ name: "McStepChildItemV2" });

// props
const props = withDefaults(defineProps<StepChildItemV2Props>(), {
  succeed: void 0,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-step-child-item-v2.scss";
</style>
