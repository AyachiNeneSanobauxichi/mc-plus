import type { McStepItem, McStepKey, McStepSuccessBehavior } from "../types";
import { computed, ref, useSlots, watchEffect } from "vue";
import { includes, isNil } from "lodash-es";
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
    if (isNil(stepItem.index) || isNil(activedStep.value?.index)) {
      return false;
    } else {
      // step item index is less than actived step index
      return stepItem.index <= activedStep.value?.index;
    }
  };

  // show step
  const showStep = (stepItem: McStepItem): boolean => {
    // parent step always show
    if (!stepItem.isChild) return true;

    // child step
    // parent step show content or parent step is actived or borther step is actived
    return (
      !!stepItem.parentStep?.showContent ||
      (!!stepItem.parentStep && activedStep.value === stepItem.parentStep) ||
      includes(stepItem.parentStep?.childrenSteps, modelValue.value)
    );
  };

  // success steps
  const successSteps = useProp<McStepKey[]>("successSteps");

  // success behavior
  const successBehavior = useProp<McStepSuccessBehavior>("successBehavior");

  // is success step
  const isSuccessStep = (stepItem: McStepItem): boolean => {
    // step success or parent step success
    if (stepItem.success || stepItem.parentStep?.success) return true;

    if (successBehavior.value === "auto") {
      // auto success behavior

      // has children step
      if (stepItem.hasChildren) {
        return (
          !isNil(stepItem.index) &&
          stepItem.index + (stepItem.children?.length ?? 0) <
            (activedStep.value?.index ?? -1)
        );
      } else {
        return (
          !isNil(stepItem.index) &&
          stepItem.index < (activedStep.value?.index ?? -1)
        );
      }
    } else {
      // manual success behavior
      // success steps is empty
      if (!successSteps.value?.length) return false;

      // success steps includes step or parent step success
      return (
        includes(successSteps.value, stepItem.step) ||
        includes(successSteps.value, stepItem.parentStep?.step)
      );
    }
  };

  // show content
  const showContent = (stepItem: McStepItem): boolean => {
    // step has content && step is current step or show content is true
    return (
      !!stepItem.content &&
      (stepItem.step === modelValue.value || !!stepItem.showContent)
    );
  };

  return {
    stepItems,
    activedStep,
    isActivedStep,
    showStep,
    isSuccessStep,
    showContent,
  };
};

export default useStepItem;
