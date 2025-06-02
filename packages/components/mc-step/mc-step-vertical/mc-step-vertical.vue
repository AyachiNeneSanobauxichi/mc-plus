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
        <div
          class="mc-step-item-component mc-step-item-component-vertical"
          v-if="step.component && step.key === modelValue"
        >
          <component :is="step.component" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
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

// ref
const _ref = ref<HTMLDivElement>();

// success
const isSuccess = (index: number) => {
  return (
    findIndex(props.steps, (step) => step.key === props.successStep) >= index
  );
};

// expose
defineExpose<StepInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./mc-step-vertical.scss";
</style>
