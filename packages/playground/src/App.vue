<template>
  <div>
    <div id="drawer"></div>
    <div><mc-success-icon /></div>
    <div>
      <mc-step
        :model-value="step"
        :steps="stepConfig"
        type="horizontal"
      ></mc-step>
    </div>
    <div>
      <mc-button @click="handleNextStep">Next Step</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McSuccessIcon from "../../components/mc-success-icon/mc-success-icon.vue";
import { McStep, McButton, type StepItem } from "mc-plus";

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
]);

const handleNextStep = () => {
  step.value++;
  if (step.value > stepConfig.value.length) {
    step.value = 1;
  }
};
</script>

<style scoped lang="scss">
#drawer {
  width: 100%;
  height: 800px;
  background-color: lightgreen;
  position: relative;
}
</style>
