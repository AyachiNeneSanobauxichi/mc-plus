<template>
  <div class="playground-step-v2">
    <mc-step-v2 v-model="currentStep">
      <mc-step-item-v2 :name="1" label="Label 1" desc="desc1" show-content>
        <Step1 />
      </mc-step-item-v2>
      <mc-step-item-v2 :name="2" label="Label 2" desc="desc2">
        <Step2 />
      </mc-step-item-v2>
      <mc-step-item-v2 :name="3" label="Label 3" desc="desc3">
        <Step3 />
      </mc-step-item-v2>
      <mc-step-item-v2 :name="4" label="Label 4" desc="desc4">
        <Step4 />
      </mc-step-item-v2>
      <mc-step-item-v2 :name="5" label="Label 5" desc="desc5" icon="Hourglass">
        <mc-step-child-item-v2 :name="51" label="Child 1" desc="child desc1">
          <child-steps1 />
        </mc-step-child-item-v2>
        <mc-step-child-item-v2 :name="52" label="Child 2" desc="child desc2">
          <child-steps2 />
        </mc-step-child-item-v2>
      </mc-step-item-v2>
    </mc-step-v2>
  </div>
  <div class="tool-bar">
    <div>Current Step: {{ currentStep }}</div>
    <mc-button @click="handlePrevious">Previous</mc-button>
    <mc-button @click="handleNext">Next</mc-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McButton } from "mc-plus";
import McStepV2 from "../../../../components/mc-step-v2/mc-step-v2.vue";
import McStepItemV2 from "../../../../components/mc-step-v2/mc-step-item-v2.vue";
import McStepChildItemV2 from "../../../../components/mc-step-v2/mc-step-child-item-v2.vue";
import Step1 from "./steps/step1.vue";
import Step2 from "./steps/step2.vue";
import Step3 from "./steps/step3.vue";
import Step4 from "./steps/step4.vue";
import ChildSteps1 from "./child-steps/child-steps1.vue";
import ChildSteps2 from "./child-steps/child-steps2.vue";

const currentStep = ref<number>(5);

// handle previous
const handlePrevious = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  } else {
    currentStep.value = 1;
  }
};

// handle next
const handleNext = () => {
  if (currentStep.value < 5) {
    currentStep.value++;
  } else {
    currentStep.value = 5;
  }
};
</script>

<style scoped lang="scss">
.tool-bar {
  position: fixed;
  top: 0px;
  right: 0;
  display: flex;
  gap: 16px;
}
</style>
