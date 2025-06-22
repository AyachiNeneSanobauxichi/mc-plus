<template>
  <div class="step-container">
    <div class="step-wrapper">
      <mc-step v-model="step" :steps="stepConfig" type="vertical"></mc-step>
    </div>
    <div class="tool-bar">
      <mc-button @click="handleNextStep">Next Step</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StepItem } from "mc-plus";
import { ref } from "vue";
import { McButton } from "mc-plus";
import McStep from "../../../../components/mc-step/mc-step.vue";
import Step1 from "./steps/step1.vue";
import Step2 from "./steps/step2.vue";
import Step3 from "./steps/step3.vue";
import Step4 from "./steps/step4.vue";
import Step5 from "./steps/step5.vue";

const step = ref<number>(1);

const stepConfig = ref<StepItem[]>([
  {
    key: 1,
    label: "Step 1",
    desc: "Step 1 description",
    component: Step1,
  },
  {
    key: 2,
    label: "Step 2",
    desc: "Step 2 description",
    component: Step2,
  },
  {
    key: 3,
    label: "Step 3",
    desc: "Step 3 description",
    component: Step3,
  },
  {
    key: 4,
    label: "Step 4",
    desc: "Step 4 description",
    component: Step4,
  },
  {
    key: 5,
    label: "Step 5",
    desc: "Step 5 description",
    component: Step5,
  },
]);

const handleNextStep = () => {
  step.value++;
  if (step.value > stepConfig.value.length) {
    step.value = 1;
  }
};
</script>

<style scoped lang="scss">
.step-container {
  .step-wrapper {
    width: 1300px;
    padding: 100px;
    box-sizing: border-box;
  }
  .tool-bar {
    margin-top: 200px;
  }
}
</style>
