<template>
  <div class="mc-step mc-step-vertical" ref="_ref">
    <div
      class="mc-step-item mc-step-vertical-item"
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
        <h3 class="mc-step-item-label mc-step-item-label-vertical">
          {{ step.label }}
        </h3>
        <p class="mc-step-item-desc mc-step-item-desc-vertical">
          {{ step.desc }}
        </p>
        <transition name="mc-step-item-component">
          <div
            class="mc-step-item-component mc-step-item-component-vertical"
            v-if="step.component && step.key === modelValue"
          >
            <component :is="step.component" />
          </div>
        </transition>
      </div>
    </div>
    <div
      ref="unsuccessLineRef"
      class="mc-step-vertical-line mc-step-vertical-unsuccess-line"
    >
      <div ref="successLineRef" class="mc-step-vertical-success-line"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import type { StepEmits, StepInstance, StepProps } from "../types";
import { findIndex } from "lodash-es";
import McSuccess from "../../mc-success-icon/mc-success-icon.vue";

// options
defineOptions({
  name: "McStepVertical",
  inheritAttrs: false,
});

// props
const props = defineProps<StepProps>();

// emit
const emit = defineEmits<StepEmits>();

// value changed
watch(
  () => props.modelValue,
  async (value) => {
    await nextTick();
    setSuccessLine();
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
  setSuccessLine();
});

// set success line
const setSuccessLine = () => {
  const index = findIndex(
    props.steps,
    (step) => step.key === props.successStep
  );

  const successLine = successLineRef.value!;
  if (index < 0) {
    successLine.style.transform = `scaleY(0)`;
    return;
  }
  const container = _ref.value!;
  const items = container.querySelectorAll(".mc-step-vertical-item");

  if (index + 1 > items.length - 1) {
    successLine.style.transform = `scaleY(1)`;
    return;
  }

  const successNextItem = items?.[index + 1] as HTMLDivElement;

  console.log("container", container);
  console.log("successNextItem", successNextItem);

  const containerRect = container.getBoundingClientRect();
  const successNextItemRect = successNextItem.getBoundingClientRect();
  const successLineHeight = successNextItemRect.top - containerRect.top;

  const percent = successLineHeight / (containerRect.height - 24);

  successLine.style.transform = `scaleY(${percent})`;
};

// success step changed
watch(
  () => props.successStep,
  () => {
    setSuccessLine();
  }
);

// expose
defineExpose<StepInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./mc-step-vertical.scss";
</style>
