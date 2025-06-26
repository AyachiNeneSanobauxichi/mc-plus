<template>
  <div class="mc-step-v2">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type {
  StepItemV2Props,
  StepV2Context,
  StepV2Emits,
  StepV2Props,
} from "./types";
import { provide, ref } from "vue";
import { indexOf } from "lodash-es";
import { STEP_V2_INJECTION_KEY } from "./constant";

// options
defineOptions({ name: "McStepV2" });

// props
const props = withDefaults(defineProps<StepV2Props>(), {});

// emits
const emits = defineEmits<StepV2Emits>();

// step items
const stepItems = ref<StepItemV2Props[]>([]);

// add step item
const addStepItem = (item: StepItemV2Props) => {
  stepItems.value.push(item);
};

// remove step item
const removeStepItem = (item: StepItemV2Props) => {
  const index = indexOf(stepItems.value, item);
  index > -1 && stepItems.value.splice(index, 1);
};

// provide
provide<StepV2Context>(STEP_V2_INJECTION_KEY, {
  stepItems: stepItems.value,
  addStepItem,
  removeStepItem,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-step-v2.scss";
</style>
