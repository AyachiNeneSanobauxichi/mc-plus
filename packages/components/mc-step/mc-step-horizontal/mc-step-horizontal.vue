<template>
  <div class="mc-step mc-step-horizontal">
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
      <div class="mc-step-item-number">
        <template v-if="!isSuccess(index) || step.disabled">
          <span class="mc-step-item-number-text">{{ index + 1 }}</span>
        </template>
        <template v-else>
          <mc-success />
        </template>
      </div>
      <div class="mc-step-item-content">
        <h3 class="mc-step-item-label">{{ step.label }}</h3>
        <p class="mc-step-item-desc">{{ step.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StepEmits, StepInstance, StepProps } from "../types";
import { ref, watch } from "vue";
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
@use "./mc-step-horizontal.scss";
</style>
