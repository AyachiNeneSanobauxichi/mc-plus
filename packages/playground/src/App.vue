<template>
  <div class="container">
    <div class="show-value">
      <div>Disabled: {{ disabled }}</div>
      <div>Active Step: {{ activeStep }}</div>
      <div>Success Step: {{ successStep }}</div>
    </div>
    <div class="content">
      <mc-step-vertical
        v-model="activeStep"
        :steps="steps"
        :success-step="successStep"
        @change="(val) => handleStepChange(val)"
      />
    </div>
    <div class="tool-bar">
      <mc-button @click="changeDisabled">Disable</mc-button>
      <mc-button @click="handleSetStep">Set Step</mc-button>
      <mc-button @click="handleSetSuccess">Set Success</mc-button>
      <mc-button @click="successStep = 4">Set Success 4</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import McStepHorizontal from "../../components/mc-step/mc-step-horizontal/mc-step-horizontal.vue";
import McStepVertical from "../../components/mc-step/mc-step-vertical/mc-step-vertical.vue";
import type { StepItem } from "@mc-plus/components/mc-step/types";
import { McButton } from "mc-plus";
import Step1 from "./views/step1.vue";
import Step2 from "./views/step2.vue";
import Step3 from "./views/step3.vue";
import Step4 from "./views/step4.vue";
import Step5 from "./views/step5.vue";

const disabled = ref<boolean>(false);

const activeStep = ref<number>(4);
const successStep = ref<number>(0);

const steps = ref<StepItem[]>([
  {
    key: 1,
    label: "Hirasawa Yui",
    desc: "yui",
    component: Step1,
  },
  {
    key: 2,
    label: "Akiyama Mio",
    desc: "mio",
    component: Step2,
  },
  {
    key: 3,
    label: "Nakano Azusa",
    desc: "azusa",
    component: Step3,
  },
  {
    key: 4,
    label: "Tainaka Ritsu",
    desc: "Ritsu",
    component: Step4,
  },
  {
    key: 5,
    label: "Kotobuku Tsumugi",
    desc: "Mugi",
    component: Step5,
  },
]);

const changeDisabled = () => {
  disabled.value = !disabled.value;
};

const handleSetStep = () => {
  activeStep.value = activeStep.value + 1;
  if (activeStep.value > steps.value.length) {
    activeStep.value = 1;
  }
};

const handleSetSuccess = () => {
  successStep.value = successStep.value + 1;
  if (successStep.value > steps.value.length) {
    successStep.value = 0;
  }
};

const handleStepChange = (val: string | number) => {
  console.log("Step: ", val);
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 800px;
  padding: 200px;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;

  .content {
    width: 100%;
  }

  .tool-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    bottom: -200px;
  }
}

.currency-option {
  height: 50px;
  display: flex;
  align-items: center;
  gap: 4px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 100%;
  }

  .currency-option-content-name {
    font-weight: 700;
    color: #222;
    font-size: 14px;
  }

  .currency-option-content-desc {
    color: #808080;
    font-size: 12px;
  }
}
</style>
