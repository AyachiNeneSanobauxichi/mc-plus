<template>
  <div class="mc-step-item-v2">
    <div class="mc-step-item-step-bar">
      <div class="mc-step-item-step-bar-number">
        <span class="mc-step-item-step-bar-number-text">
          {{ currentStepIndex }}
        </span>
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
import type { StepItemV2Props, StepV2Context } from "./types";
import { computed, inject, onBeforeUnmount, onMounted } from "vue";
import { indexOf } from "lodash-es";
import { STEP_V2_INJECTION_KEY } from "./constant";

// options
defineOptions({ name: "McStepItemV2" });

// props
const props = withDefaults(defineProps<StepItemV2Props>(), {});

// step context
const stepCtx = inject<StepV2Context>(STEP_V2_INJECTION_KEY);

// add step item
onMounted(() => {
  stepCtx?.addStepItem(props);
  console.log("Step Items: ", stepCtx?.stepItems);
});

// remove step item
onBeforeUnmount(() => {
  stepCtx?.removeStepItem(props);
});

// current step index
const currentStepIndex = computed(() => {
  return indexOf(stepCtx?.stepItems, props) + 1;
});
</script>

<style scoped lang="scss">
@use "./styles//mc-step-item-v2.scss";
</style>
