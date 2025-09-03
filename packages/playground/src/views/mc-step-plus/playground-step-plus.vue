<template>
  <div class="playground-step-plus">
    <section class="tool-bar">
      <div>Current Step: {{ currentStep }}</div>
      <div class="btn-group">
        <mc-button @click="handlePrevious">Previous</mc-button>
        <mc-button @click="handleNext">Next</mc-button>
      </div>
      <div class="btn-group">
        <mc-input v-model="goStep" placeholder="Please enter step key" />
        <mc-button @click="handleGoStep" type="link">Go</mc-button>
      </div>
    </section>
    <section class="mc-step-wrapper">
      <mc-step-plus
        v-model="currentStep"
        v-model:success-steps="successSteps"
        ref="stepPlusRef"
        @click:step="handleClickStep"
      >
        <mc-step-item-plus
          v-for="step in stepList"
          :key="step.step"
          :step="step.step"
          :label="step.label"
          :desc="step.desc"
          :icon="step.icon"
          :show-content="step.showContent"
          :success="step.success"
        >
          <component :is="step.component" />
          <mc-step-child-item-plus
            v-for="child in step.children"
            :key="child.step"
            :step="child.step"
            :label="child.label"
            :desc="child.desc"
            :show-content="child.showContent"
            :success="child.success"
          >
            <component :is="child.component" />
          </mc-step-child-item-plus>
        </mc-step-item-plus>
      </mc-step-plus>
    </section>
  </div>
</template>

<script setup lang="ts">
import type {
  McStepInstance,
  McStepKey,
} from "@mc-plus/components/mc-step-plus/types";
import { ref } from "vue";
import { McButton, McInput } from "mc-plus";
import McStepPlus from "../../../../components/mc-step-plus/mc-step-plus.vue";
import McStepItemPlus from "../../../../components/mc-step-plus/mc-step-item-plus.vue";
import McStepChildItemPlus from "../../../../components/mc-step-plus/mc-step-child-item-plus.vue";
import { useSteps } from "./hooks";

const stepPlusRef = ref<McStepInstance>();

const { stepList, successSteps, currentStep } = useSteps();

// handle previous
const handlePrevious = () => {
  stepPlusRef.value?.goPreviousStep();
};

// handle next
const handleNext = () => {
  stepPlusRef.value?.goNextStep();
};

// handle click step
const handleClickStep = (step: McStepKey) => {
  currentStep.value = step as string;
};

const goStep = ref<string>("");

// handle go step
const handleGoStep = () => {
  console.log("goStep: ", goStep.value);
  if (goStep.value) {
    stepPlusRef.value?.goStep(goStep.value);
  }
};
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;
.playground-step-plus {
  .tool-bar {
    @include mixin.flex-center(
      $direction: column,
      $justify: flex-start,
      $align: flex-start,
      $gap: 16px
    );

    .btn-group {
      @include mixin.flex-center($justify: flex-start, $gap: 8px);
    }
  }

  .mc-step-wrapper {
    margin-top: 120px;
  }
}
</style>
