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
  StepV2Instance,
  StepV2Props,
  StepV2Value,
} from "./types";
import { computed, onMounted, provide, ref, watch } from "vue";
import { findIndex } from "lodash-es";
import { STEP_V2_INJECTION_KEY } from "./constant";

// options
defineOptions({ name: "McStepV2" });

// props
const props = withDefaults(defineProps<StepV2Props>(), {
  succeed: void 0,
});

// emits
defineEmits<StepV2Emits>();

// step items
const stepItems = ref<StepItemV2Props[]>([]);

// add step item
const addStepItem = (item: StepItemV2Props) => {
  stepItems.value.push(item);
};

// remove step item
const removeStepItem = (item: StepItemV2Props) => {
  const index = findIndex(stepItems.value, (_item) => _item.name === item.name);
  index > -1 && stepItems.value.splice(index, 1);
};

// success step index
const successStepIndex = ref<number>(-1);

// set success index
const setSuccessIndex = (index: number) => {
  if (index > -1) {
    if (index > stepItems.value.length - 1) {
      successStepIndex.value = stepItems.value.length - 1;
    } else {
      successStepIndex.value = index;
    }
  } else {
    successStepIndex.value = -1;
  }
};

// set success step
const setSuccessStep = (step: StepV2Value) => {
  const index = findIndex(stepItems.value, (_item) => _item.name === step);
  setSuccessIndex(index);
};

// set default success step
const setDefaultSuccessStep = () => {
  const index = findIndex(
    stepItems.value,
    (item) => item.name === props.modelValue
  );
  setSuccessIndex(index - 1);
};

// init success step
onMounted(() => {
  setDefaultSuccessStep();
});

// watch model value
watch(
  () => props.modelValue,
  () => {
    setDefaultSuccessStep();
  },
  {
    flush: "post",
  }
);

// provide
provide<StepV2Context>(STEP_V2_INJECTION_KEY, {
  successStepIndex,
  activeStep: computed(() => props.modelValue),
  succeed: computed(() => props.succeed),
  stepItems: stepItems.value,
  addStepItem,
  removeStepItem,
});

// expose
defineExpose<StepV2Instance>({
  setSuccessIndex,
  setSuccessStep,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-step-v2.scss";
</style>
