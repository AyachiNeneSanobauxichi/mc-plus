// use step item hook

import type { McStepItem, McStepKey } from "../types";
import { ref, useSlots, watchEffect } from "vue";
import { includes } from "lodash-es";
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
  const isActivedStep = (step: McStepKey): boolean => {
    return step === modelValue.value;
  };

  // is show step
  const isShowStep = (stepItem: McStepItem): boolean => {
    // show parent step
    if (!stepItem.isChild) return true;
    // child step
    else {
      // parent step is actived
      if (isActivedStep(stepItem.parentStep?.step)) return true;
      // borther step is actived
      else {
        return includes(stepItem.parentStep?.children, modelValue.value);
      }
    }
  };

  return {
    stepItems,
    isActivedStep,
    isShowStep,
  };
};

export default useStepItem;
