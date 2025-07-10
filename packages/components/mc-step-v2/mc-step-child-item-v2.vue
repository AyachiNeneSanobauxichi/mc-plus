<template>
  <div
    class="mc-step-child-item-v2"
    :class="{
      'mc-step-child-item-actived': isActive,
      'mc-step-child-item-success': isSuccess,
    }"
  >
    <div class="mc-step-child-item-content">
      <div class="mc-step-child-item-label" v-if="label || desc">
        <span class="mc-step-child-item-label-title">{{ label }}</span>
        <p class="mc-step-child-item-label-desc">{{ desc }}</p>
      </div>
      <div class="mc-step-child-item-slot" v-if="$slots.default">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StepChildItemV2Props, StepItemV2Context } from "./types";
import { computed, inject } from "vue";
import { STEP_ITEM_V2_INJECTION_KEY } from "./constant";

// options
defineOptions({ name: "McStepChildItemV2" });

// props
const props = withDefaults(defineProps<StepChildItemV2Props>(), {
  succeed: void 0,
});

// step item context
const stepItemCtx = inject<StepItemV2Context | undefined>(
  STEP_ITEM_V2_INJECTION_KEY,
  void 0
);

// is active
const isActive = computed(() => {
  return stepItemCtx?.actived?.value;
});

// is success
const isSuccess = computed(() => {
  if (stepItemCtx?.succeed?.value) {
    return stepItemCtx?.succeed?.value;
  } else {
    return props.succeed;
  }
});
</script>

<style scoped lang="scss">
@use "./styles/mc-step-child-item-v2.scss";
</style>
