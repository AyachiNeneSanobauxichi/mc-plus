import type { McStepItem, McStepKey } from "../types";
import { computed, ref, useSlots, watchEffect } from "vue";
import { includes } from "lodash-es";
import { useProp } from "@mc-plus/hooks";
import { generateStepItems } from "../utils";

// use step item hook
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

  // actived step
  const activedStep = computed(() => {
    return stepItems.value.find((item) => item.step === modelValue.value);
  });

  // is actived step
  const isActivedStep = (stepItem: McStepItem): boolean => {
    // step is actived
    if (stepItem.step === modelValue.value) {
      return true;
    }

    // child step is actived
    if (
      stepItem.children &&
      includes(stepItem.childrenSteps, modelValue.value)
    ) {
      return true;
    }

    // previous borther step is actived
    if (
      stepItem.isChild &&
      activedStep.value?.isChild &&
      activedStep.value.parentStep === stepItem.parentStep &&
      (activedStep.value.index || -1) > (stepItem.index || -1)
    ) {
      return true;
    }

    return false;
  };

  // is show step
  const isShowStep = (stepItem: McStepItem): boolean => {
    // show parent step
    if (!stepItem.isChild) return true;
    // child step
    else {
      if (stepItem.parentStep && isActivedStep(stepItem.parentStep)) {
        // parent step is actived
        return true;
      } else {
        // borther step is actived
        return includes(stepItem.parentStep?.childrenSteps, modelValue.value);
      }
    }
  };

  // success steps
  const successSteps = useProp<McStepKey[]>("successSteps");

  // is success step
  const isSuccessStep = (stepItem: McStepItem): boolean => {
    if (!successSteps.value?.length) return false;
    return (
      includes(successSteps.value, stepItem.step) ||
      includes(successSteps.value, stepItem.parentStep?.step)
    );
  };

  return {
    stepItems,
    activedStep,
    isActivedStep,
    isShowStep,
    isSuccessStep,
  };
};

export default useStepItem;
