import type { _FilteredOptionNode, SelectPlusValue } from "../types";
import type { Ref } from "vue";
import { ref } from "vue";
import { findIndex } from "lodash-es";

const useHover = (options?: Ref<_FilteredOptionNode[]>) => {
  // hover option
  const hoverOption = ref<SelectPlusValue>();

  // set hover option
  const setHoverOption = (value: SelectPlusValue) => {
    hoverOption.value = value;
  };

  // handle press arrow
  const handlePressArrow = (e: KeyboardEvent) => {
    if (!options?.value.length) {
      clearHoverOption();
      return;
    }

    // if no hover option, set to first option
    if (!hoverOption.value) {
      hoverOption.value = options.value[0]?.value;
      return;
    }

    // find index of hover option
    const _index = findIndex(options?.value, (item) => {
      return item.value === hoverOption.value;
    });

    if (e.key === "ArrowDown") {
      // handle press arrow down
      hoverOption.value =
        options.value[_index + 1]?.value || options.value[0]?.value;
    } else if (e.key === "ArrowUp") {
      // handle press arrow up
      hoverOption.value =
        options.value[_index - 1]?.value ||
        options.value[options.value.length - 1]?.value;
    }
  };

  // clear hover option
  const clearHoverOption = () => {
    hoverOption.value = void 0;
  };

  return {
    hoverOption,
    setHoverOption,
    handlePressArrow,
    clearHoverOption,
  };
};

export default useHover;
