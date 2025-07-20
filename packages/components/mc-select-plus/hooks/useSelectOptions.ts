import type { Ref } from "vue";
import type { _OptionNode, SelectInternalInstance } from "../types";
import { getCurrentInstance, ref, watchEffect } from "vue";
import { generateOptions, isSameOptions } from "../utils";

// use select options
const useSelectOptions = (): { selectOptions: Ref<_OptionNode[]> } => {
  // cache options
  let _cachedOptions: _OptionNode[] = [];
  // select options
  const selectOptions = ref<_OptionNode[]>([]);

  // current instance
  const vm = (getCurrentInstance()! as SelectInternalInstance).proxy;

  watchEffect(() => {
    // default slot
    const children = vm.$slots.default?.()!;
    // generate select options
    if (children.length) {
      const newOptions = generateOptions(children![0]?.children);
      selectOptions.value.push(...newOptions);
    }

    // compare options
    if (!isSameOptions(selectOptions.value, _cachedOptions)) {
      _cachedOptions = selectOptions.value;
    }
  });

  return {
    selectOptions,
  };
};

export default useSelectOptions;
