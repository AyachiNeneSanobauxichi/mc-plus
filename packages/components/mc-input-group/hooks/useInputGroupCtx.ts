import type { _InputGroupStatus, InputGroupPosition } from "../types";
import { computed, inject, watch } from "vue";
import { useProp } from "@mc-plus/hooks";
import { INPUT_GROUP_INJECTION_KEY } from "../constant";

// use input group context hook
const useInputGroupCtx = (status: _InputGroupStatus) => {
  // input group context
  const inputGroupCtx = inject(INPUT_GROUP_INJECTION_KEY, void 0);

  // context not found return
  if (!inputGroupCtx) {
    return;
  }

  // input group disabled
  const inputGroupDisabled = computed(() => {
    return inputGroupCtx.disabled.value;
  });

  // position
  const position = useProp<InputGroupPosition>("inputGroupPosition");

  // position not found return
  if (!position || !position.value) {
    return;
  }

  // status
  const { validateStatus, isExpanded, isFocused, isHovering } = status;

  // watch validate status
  if (validateStatus) {
    watch(validateStatus, (val) => {
      inputGroupCtx.setInputGroupValidate(val);
    });
  }

  // if expanded is provided watch expanded
  if (isExpanded) {
    // watch expanded
    watch(isExpanded, (val) => {
      inputGroupCtx.setInputGroupExpanded(val);
    });
  }

  // judge actived
  watch([isFocused, isHovering], ([focused, hovering]) => {
    if (focused) {
      inputGroupCtx.setInputGroupActived(true, position.value!);
    } else if (hovering) {
      inputGroupCtx.setInputGroupActived(true, position.value!);
    } else {
      inputGroupCtx.setInputGroupActived(false, position.value!);
    }
  });

  return {
    inputGroupDisabled,
  };
};

export default useInputGroupCtx;
