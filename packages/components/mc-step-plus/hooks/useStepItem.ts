// use step item hook

import type { McStepItem, McStepKey } from "../types";
import { ref, useSlots, watchEffect } from "vue";
import { generateStepItems } from "../utils";
import { useProp } from "@mc-plus/hooks";

const useStepItem = () => {
  const stepItems = ref<McStepItem[]>([]);

  // slots
  const slots = useSlots();

  // watch slots
  watchEffect(() => {
    stepItems.value = generateStepItems(slots.default?.());
  });

  // model value
  const modelValue = useProp<McStepKey>("modelValue");

  // is actived step
  const isActivedStep = (step: McStepItem): boolean => {
    return step.step === modelValue.value;
  };

  return {
    stepItems,
    isActivedStep,
  };
};

export default useStepItem;
