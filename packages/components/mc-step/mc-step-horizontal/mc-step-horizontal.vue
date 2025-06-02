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
      <div class="mc-step-horizontal-number-container">
        <div class="mc-step-item-number mc-step-horizontal-item-number">
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
    ></div>
    <!-- <div class="mc-step-horizontal-success-line"></div> -->
  </div>
</template>

<script setup lang="ts">
import type { StepEmits, StepInstance, StepProps } from "../types";
import { onMounted, ref, watch } from "vue";
import { findIndex } from "lodash-es";
import McSuccess from "../../mc-success/mc-success.vue";

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
// const successLineRef = ref<HTMLDivElement>();

// success
const isSuccess = (index: number) => {
  return (
    findIndex(props.steps, (step) => step.key === props.successStep) >= index
  );
};

onMounted(() => {
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
});

// expose
defineExpose<StepInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./mc-step-horizontal.scss";
</style>
