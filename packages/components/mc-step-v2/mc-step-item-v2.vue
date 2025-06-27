<template>
  <div
    class="mc-step-item-v2"
    :class="{
      'mc-step-item-actived': isActive,
      'mc-step-item-success': isSuccess,
    }"
  >
    <div class="mc-step-item-step-bar">
      <div class="mc-step-item-step-bar-number">
        <template v-if="!isSuccess">
          <span class="mc-step-item-step-bar-number-text">
            {{ currentStepIndex + 1 }}
          </span>
        </template>
        <template v-else>
          <mc-success-icon class="mc-step-item-step-bar-success-icon" />
        </template>
      </div>
    </div>
    <div class="mc-step-item-content">
      <div class="mc-step-item-label" v-if="label || desc">
        <span class="mc-step-item-label-title">{{ label }}</span>
        <p class="mc-step-item-label-desc">{{ desc }}</p>
      </div>
      <div class="mc-step-item-slot" v-if="isActive">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StepItemV2Props, StepV2Context } from "./types";
import { computed, inject, onBeforeUnmount, onMounted } from "vue";
import { indexOf, isNil } from "lodash-es";
import { STEP_V2_INJECTION_KEY } from "./constant";
import McSuccessIcon from "../mc-success-icon/mc-success-icon.vue";

// options
defineOptions({ name: "McStepItemV2" });

// props
const props = withDefaults(defineProps<StepItemV2Props>(), {
  succeed: void 0,
});

// step context
const stepCtx = inject<StepV2Context>(STEP_V2_INJECTION_KEY);

// add step item
onMounted(() => {
  stepCtx?.addStepItem(props);
});

// remove step item
onBeforeUnmount(() => {
  stepCtx?.removeStepItem(props);
});

// current step index
const currentStepIndex = computed(() => {
  return indexOf(stepCtx?.stepItems, props);
});

// is active
const isActive = computed(() => {
  return stepCtx?.activeStep?.value === props.name;
});

// is success
const isSuccess = computed(() => {
  if (!isNil(stepCtx?.succeed?.value)) {
    return stepCtx?.succeed?.value;
  } else if (!isNil(props.succeed)) {
    return props.succeed;
  } else {
    return (stepCtx?.successStepIndex?.value ?? -1) >= currentStepIndex.value;
  }
});
</script>

<style scoped lang="scss">
@use "./styles//mc-step-item-v2.scss";
</style>
