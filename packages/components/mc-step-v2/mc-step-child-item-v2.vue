<template>
  <div class="mc-step-child-item-v2"></div>
</template>

<script setup lang="ts">
import type { StepChildItemV2Props } from "./types";

// options
defineOptions({ name: "McStepChildItemV2" });

// props
const props = withDefaults(defineProps<StepChildItemV2Props>(), {});
</script>

<style scoped lang="scss">
@use "./mc-step-child-item-v2.vue";
</style>
