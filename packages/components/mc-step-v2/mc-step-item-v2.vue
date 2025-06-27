<template>
  <div
    class="mc-step-item-v2"
    :class="{
      'mc-step-item-actived': isActive,
      'mc-step-item-success': isSuccess,
    }"
  >
    <div class="mc-step-item-step-bar" ref="stepBarRef">
      <div class="mc-step-item-step-bar-number">
        <template v-if="!isSuccess">
          <div class="mc-step-item-step-bar-number-text">
            <template v-if="icon">
              <mc-icon :name="icon" class="mc-step-item-step-bar-icon" />
            </template>
            <template v-else>
              <slot name="step-number">{{ currentStepIndex + 1 }}</slot>
            </template>
          </div>
        </template>
        <template v-else>
          <mc-success-icon class="mc-step-item-step-bar-success-icon" />
        </template>
      </div>
    </div>
    <div class="mc-step-item-content" ref="contentRef">
      <div class="mc-step-item-label" v-if="label || desc">
        <slot name="label">
          <span class="mc-step-item-label-title">{{ label }}</span>
        </slot>
        <slot name="desc">
          <p class="mc-step-item-label-desc">{{ desc }}</p>
        </slot>
      </div>
      <div class="mc-step-item-slot" v-if="isActive">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  StepItemV2Context,
  StepItemV2Props,
  StepV2Context,
} from "./types";
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
} from "vue";
import { indexOf, isNil } from "lodash-es";
import { STEP_ITEM_V2_INJECTION_KEY, STEP_V2_INJECTION_KEY } from "./constant";
import McIcon from "../mc-icon/mc-icon.vue";
import McSuccessIcon from "../mc-success-icon/mc-success-icon.vue";
import useResizeObserver from "@mc-plus/hooks/useResizeObserver";

// options
defineOptions({ name: "McStepItemV2" });

// props
const props = withDefaults(defineProps<StepItemV2Props>(), {
  succeed: void 0,
});

// refs
const contentRef = ref<HTMLDivElement>();
const stepBarRef = ref<HTMLDivElement>();

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

// is last step
const isLastStep = computed(() => {
  return stepCtx?.stepItems?.length === currentStepIndex.value + 1;
});

/* set currenct line height when is last step */
// content resize observer
useResizeObserver(contentRef, () => {
  if (isLastStep.value && contentRef.value && stepBarRef.value) {
    const childItems = Array.from(
      contentRef.value.querySelectorAll(".mc-step-child-item-v2") ?? []
    );

    if (childItems.length > 0) {
      const lastChildItem = childItems[childItems.length - 1];
      const { top } = lastChildItem.getBoundingClientRect();
      const { top: stepBarTop } = stepBarRef.value.getBoundingClientRect();
      const lineHeight = top - stepBarTop;
      stepBarRef.value.style.height = `${lineHeight + 4}px`;
    } else {
      stepBarRef.value.style.height = `${40}px`;
    }
  }
});

// provide
provide<StepItemV2Context>(STEP_ITEM_V2_INJECTION_KEY, {
  succeed: computed(() => isSuccess.value),
  actived: computed(() => isActive.value),
});
</script>

<style scoped lang="scss">
@use "./styles//mc-step-item-v2.scss";
</style>
