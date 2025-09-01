// use step item hook

import type { McStepItem } from "../types";
import { ref, useSlots, watchEffect } from "vue";
import { generateStepItems } from "../utils";

const useStepItem = () => {
  const stepItems = ref<McStepItem[]>([]);

  // slots
  const slots = useSlots();

  // watch slots
  watchEffect(() => {
    stepItems.value = generateStepItems(slots.default?.());
  });

  return {
    stepItems,
  };
};

export default useStepItem;
