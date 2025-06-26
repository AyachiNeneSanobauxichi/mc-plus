<template>
  <div class="playground-step-v2">
    <mc-step-v2>
      <mc-step-item-v2 :name="1" label="Label 1" desc="desc1">
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
      <mc-step-item-v2 :name="5" label="Label 5" desc="desc5">
        <Step5 />
      </mc-step-item-v2>
    </mc-step-v2>
  </div>
</template>

<script setup lang="ts">
import McStepV2 from "../../../../components/mc-step-v2/mc-step-v2.vue";
import McStepItemV2 from "../../../../components/mc-step-v2/mc-step-item-v2.vue";
import Step1 from "./steps/step1.vue";
import Step2 from "./steps/step2.vue";
import Step3 from "./steps/step3.vue";
import Step4 from "./steps/step4.vue";
import Step5 from "./steps/step5.vue";
</script>

<style scoped lang="scss"></style>
