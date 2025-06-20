<template>
  <div class="step-container">
    <div class="step-wrapper">
      <mc-step v-model="step" :steps="stepConfig" type="horizontal"></mc-step>
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
import McStep from "../../../components/mc-step/mc-step.vue";

const step = ref<number>(1);

const stepConfig = ref<StepItem[]>([
  {
    key: 1,
    label: "Step 1",
    desc: "Step 1 description",
  },
  {
    key: 2,
    label: "Step 2",
    desc: "Step 2 description",
  },
  {
    key: 3,
    label: "Step 3",
    desc: "Step 3 description",
  },
  {
    key: 4,
    label: "Step 4",
    desc: "Step 4 description",
  },
  {
    key: 5,
    label: "Step 5",
    desc: "Step 5 description",
  },
  {
    key: 6,
    label: "Step 6",
    desc: "Step 6 description",
  },
  {
    key: 7,
    label: "Step 7",
    desc: "Step 7 description",
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
