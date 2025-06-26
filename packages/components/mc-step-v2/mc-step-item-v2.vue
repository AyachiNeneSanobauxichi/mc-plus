<template>
  <div class="mc-step-item-v2">
    <div class="mc-step-item-step-bar">
      <div class="mc-step-item-step-bar-number">
        <span class="mc-step-item-step-bar-number-text">{{ "1" }}</span>
      </div>
    </div>
    <div class="mc-step-item-content">
      <div class="mc-step-item-label" v-if="label || desc">
        <span class="mc-step-item-label-title">{{ props.label }}</span>
        <p class="mc-step-item-label-desc">{{ props.desc }}</p>
      </div>
      <div class="mc-step-item-slot">
        <slot></slot>
      </div>
    </div>
  </div>
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
