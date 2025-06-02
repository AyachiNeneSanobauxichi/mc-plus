<template>
  <div class="mc-step mc-step-horizontal" ref="_ref">
    <div
      class="mc-step-item mc-step-horizontal-item"
      :class="{
        'mc-step-item-active': modelValue === step.key,
        'mc-step-item-disabled': step.disabled,
        'mc-step-item-success': isSuccess(index),
      }"
      v-for="(step, index) in steps"
      :key="step.key"
    >
      <div class="mc-step-number-container">
        <div class="mc-step-item-number">
          <template v-if="!isSuccess(index) || step.disabled">
            <span class="mc-step-item-number-text">{{ index + 1 }}</span>
          </template>
          <template v-else>
            <mc-success />
          </template>
        </div>
      </div>
      <div class="mc-step-item-content">
        <h3 class="mc-step-item-label">{{ step.label }}</h3>
        <p class="mc-step-item-desc">{{ step.desc }}</p>
      </div>
    </div>
    <div
      ref="unsuccessLineRef"
      class="mc-step-horizontal-line mc-step-horizontal-unsuccess-line"
    >
      <div ref="successLineRef" class="mc-step-horizontal-success-line"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StepEmits, StepInstance, StepProps } from "../types";
import { onMounted, ref, watch } from "vue";
import { findIndex, throttle } from "lodash-es";
import McSuccess from "../../mc-success-icon/mc-success-icon.vue";
import useWindowResize from "@mc-plus/hooks/useWindowResize";

// options
defineOptions({
  name: "McStepHorizontal",
  inheritAttrs: false,
});

// props
const props = defineProps<StepProps>();

// emit
const emit = defineEmits<StepEmits>();

// value changed
watch(
  () => props.modelValue,
  (value) => {
    emit("change", value);
  }
);

// ref
const _ref = ref<HTMLDivElement>();
const unsuccessLineRef = ref<HTMLDivElement>();
const successLineRef = ref<HTMLDivElement>();

// success
const isSuccess = (index: number) => {
  return (
    findIndex(props.steps, (step) => step.key === props.successStep) >= index
  );
};

onMounted(() => {
  setLineWidth();
  setSuccessLine();
});

// set line width
const setLineWidth = () => {
  const container = _ref.value!;
  const unsuccessLine = unsuccessLineRef.value!;
  const items = container.querySelectorAll(".mc-step-horizontal-item");
  const firstItem = items?.[0]?.querySelector(
    ".mc-step-horizontal-item-number"
  ) as HTMLDivElement;
  const lastItem = items?.[items.length - 1]?.querySelector(
    ".mc-step-horizontal-item-number"
  ) as HTMLDivElement;

  if (!firstItem || !lastItem) {
    unsuccessLine.style.width = "0px";
    return;
  }

  const containerRect = container.getBoundingClientRect();
  const firstItemRect = firstItem.getBoundingClientRect();
  const lastItemRect = lastItem.getBoundingClientRect();

  unsuccessLine.style.width = `${lastItemRect.left - firstItemRect.left}px`;
  unsuccessLine.style.left = `${firstItemRect.left - containerRect.left}px`;
};

// set success line
const setSuccessLine = () => {
  const successStep = props.successStep;
  const successLine = successLineRef.value!;

  const successIdx = findIndex(props.steps, (item) => item.key === successStep);
  if (successIdx < 0) {
    successLine.style.transform = "scaleX(0)";
    return;
  }

  const _percent = (successIdx + 1) / (props.steps.length - 1);
  const percent = _percent > 1 ? 1 : _percent;
  successLine.style.transform = `scaleX(${percent})`;
};

// success step changed
watch(
  () => props.successStep,
  () => {
    setSuccessLine();
  }
);

// window resize
useWindowResize(
  throttle(() => {
    setLineWidth();
    setSuccessLine();
  }, 50)
);

// expose
defineExpose<StepInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./mc-step-horizontal.scss";
</style>
