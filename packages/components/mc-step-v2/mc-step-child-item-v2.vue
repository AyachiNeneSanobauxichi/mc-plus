<template>
  <div
    class="mc-step-child-item-v2"
    :class="{
      'mc-step-child-item-actived': false,
      'mc-step-child-item-success': false,
    }"
  >
    <div class="mc-step-child-item-content">
      <div class="mc-step-child-item-label" v-if="label || desc">
        <span class="mc-step-child-item-label-title">{{ label }}</span>
        <p class="mc-step-child-item-label-desc">{{ desc }}</p>
      </div>
      <div class="mc-step-child-item-slot">
        <slot></slot>
      </div>
    </div>
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
