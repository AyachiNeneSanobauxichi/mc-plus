<template>
  <div class="mc-step-plus">
    <div class="mc-step-container">
      <template v-for="stepItem in stepItems" :key="stepItem.step">
        <div
          class="mc-step-item"
          :class="{
            'mc-step-item-child': stepItem.isChild,
            'mc-step-item-actived': isActivedStep(stepItem),
          }"
          v-if="isShowStep(stepItem)"
        >
          <div class="mc-step-item-indicator">
            <div class="mc-step-item-icon">
              <div
                class="mc-step-item-icon-number"
                v-if="!stepItem.isChild && !isNil(stepItem.index)"
              >
                {{ stepItem.index + 1 }}
              </div>
              <div class="mc-step-item-icon-point" v-else></div>
            </div>
          </div>
          <div class="mc-step-item-content">
            <div class="mc-step-item-content-title">
              <div class="mc-step-item-label">{{ stepItem.label }}</div>
              <div class="mc-step-item-desc">{{ stepItem.desc }}</div>
            </div>
            <div
              class="mc-step-item-content-display"
              v-if="stepItem.content && isActivedStep(stepItem)"
            >
              <component :is="stepItem.content" :key="stepItem.step" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  McStepEmits,
  McStepInstance,
  McStepKey,
  McStepProps,
} from "./types";
import { computed, watchEffect } from "vue";
import { findIndex, isNil } from "lodash-es";
import { MC_STEP_PLUS } from "./constant";
import { useStepItem } from "./hooks";

// options
defineOptions({ name: MC_STEP_PLUS });

// props
const props = withDefaults(defineProps<McStepProps>(), {
  modelValue: undefined,
});

// emits
const emit = defineEmits<McStepEmits>();

// use step item
const { stepItems, activedStep, isActivedStep, isShowStep } = useStepItem();

// current step index
const currentStepIndex = computed(() => {
  return findIndex(stepItems.value, (item) => item.step === props.modelValue);
});

// go previous step
const goPreviousStep = () => {
  const index = currentStepIndex.value;
  if (index > 0) {
    let previousIndex = index - 1;
    let previousStep = stepItems.value[previousIndex];
    if (
      activedStep.value?.isChild &&
      activedStep.value.parentStep === previousStep
    ) {
      previousStep = stepItems.value[previousIndex - 1];
    }

    if (previousStep?.step) {
      emitChange(previousStep.step);
    }
  }
};

// go next step
const goNextStep = () => {
  const index = currentStepIndex.value;
  if (index < stepItems.value.length - 1) {
    let nextIndex = index + 1;
    let nextStep = stepItems.value[nextIndex];
    if (nextStep.hasChildren) {
      nextStep = stepItems.value[nextIndex + 1];
    }

    if (nextStep?.step) {
      emitChange(nextStep.step);
    }
  }
};

// go step
const goStep = (step?: McStepKey) => {
  if (!step) {
    goNextStep();
  } else {
    emitChange(step);
  }
};

// emit change
const emitChange = (step: McStepKey) => {
  emit("update:modelValue", step);
  emit("change", step);
};

// expose
defineExpose<McStepInstance>({
  goStep,
  goNextStep,
  goPreviousStep,
});

watchEffect(() => {
  console.log("Step Items: ", stepItems.value);
});
</script>

<style scoped lang="scss">
@use "./styles/mc-step-plus.scss";
</style>
