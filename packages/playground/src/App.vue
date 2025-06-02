<template>
  <div class="container">
    <div class="show-value">
      <div>Disabled: {{ disabled }}</div>
      <div>Active Step: {{ activeStep }}</div>
      <div>Success Step: {{ successStep }}</div>
    </div>
    <div class="content">
      <mc-step-horizontal
        v-model="activeStep"
        :steps="steps"
        :success-step="successStep"
      />
    </div>
    <div class="tool-bar">
      <mc-button @click="changeDisabled">Disable</mc-button>
      <mc-button @click="handleSetStep">Set Step</mc-button>
      <mc-button @click="handleSetSuccess">Set Success</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McStepHorizontal from "../../components/mc-step/mc-step-horizontal/mc-step-horizontal.vue";
import type { StepItem } from "@mc-plus/components/mc-step/types";
import { McButton } from "mc-plus";

const disabled = ref<boolean>(false);

const activeStep = ref<number>(1);
const successStep = ref<number>(0);

const steps = ref<StepItem[]>([
  {
    key: 1,
    label: "Hirasawa Yui",
    desc: "yui",
  },
  {
    key: 2,
    label: "Akiyama Mio",
    desc: "mio",
  },
  {
    key: 3,
    label: "Nakano Azusa",
    desc: "azusa",
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
    width: 820px;
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
