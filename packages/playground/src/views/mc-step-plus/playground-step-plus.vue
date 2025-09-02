<template>
  <div class="playground-step-plus">
    <section class="tool-bar">
      <div>Current Step: {{ currentStep }}</div>
      <mc-button @click="handlePrevious">Previous</mc-button>
      <mc-button @click="handleNext">Next</mc-button>
    </section>
    <section class="mc-step-wrapper">
      <mc-step-plus v-model="currentStep" ref="stepPlusRef">
        <mc-step-item-plus
          v-for="step in stepList"
          :key="step.name"
          :step="step.name"
          :label="step.label"
          :desc="step.desc"
        >
          <component :is="step.component" />
          <mc-step-child-item-plus
            v-for="child in step.children"
            :key="child.name"
            :step="child.name"
            :label="child.label"
            :desc="child.desc"
          >
            <component :is="child.component" />
          </mc-step-child-item-plus>
        </mc-step-item-plus>
      </mc-step-plus>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, type Component } from "vue";
import { McButton } from "mc-plus";
import type { McStepInstance } from "@mc-plus/components/mc-step-plus/types";
import McStepPlus from "../../../../components/mc-step-plus/mc-step-plus.vue";
import McStepItemPlus from "../../../../components/mc-step-plus/mc-step-item-plus.vue";
import McStepChildItemPlus from "../../../../components/mc-step-plus/mc-step-child-item-plus.vue";
import Step1 from "./steps/step1.vue";
import Step2 from "./steps/step2.vue";
import Step3 from "./steps/step3.vue";
import Step4 from "./steps/step4.vue";
import Step5 from "./steps/step5.vue";
import ChildSteps1 from "./child-steps/child-steps1.vue";
import ChildSteps2 from "./child-steps/child-steps2.vue";

interface Step {
  name: string;
  label: string;
  desc: string;
  component: Component;
  children?: Step[];
}

const stepPlusRef = ref<McStepInstance>();

const stepList = shallowRef<Step[]>([
  { name: "1", label: "Label 1", desc: "desc1", component: Step1 },
  { name: "2", label: "Label 2", desc: "desc2", component: Step2 },
  {
    name: "3",
    label: "Label 3",
    desc: "desc3",
    component: Step3,
    children: [
      {
        name: "5-1",
        label: "Child 1",
        desc: "child desc1",
        component: ChildSteps1,
      },
      {
        name: "5-2",
        label: "Child 2",
        desc: "child desc2",
        component: ChildSteps2,
      },
    ],
  },
  { name: "4", label: "Label 4", desc: "desc4", component: Step4 },
  { name: "5", label: "Label 5", desc: "desc5", component: Step5 },
]);

const currentStep = ref<string>("1");

// handle previous
const handlePrevious = () => {
  stepPlusRef.value?.goPreviousStep();
};

// handle next
const handleNext = () => {
  stepPlusRef.value?.goNextStep();
};
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;
.playground-step-plus {
  .tool-bar {
    @include mixin.flex-center($justify: flex-start, $gap: 16px);
  }

  .mc-step-wrapper {
    margin-top: 72px;
  }
}
</style>
