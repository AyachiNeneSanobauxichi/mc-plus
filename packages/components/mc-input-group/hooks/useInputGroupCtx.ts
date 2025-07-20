import type {
  _InputGroupStatus,
  InputGroupContext,
  InputGroupPosition,
} from "../types";
import { inject, watch } from "vue";
import { useProp } from "@mc-plus/hooks";
import { INPUT_GROUP_INJECTION_KEY } from "../constant";

// use input group context hook
const useInputGroupCtx = (status: _InputGroupStatus) => {
  // input group context
  const inputGroupCtx = inject<InputGroupContext>(
    INPUT_GROUP_INJECTION_KEY || void 0
  );

  // context not found return
  if (!inputGroupCtx) {
    return;
  }

  // position
  const position = useProp<InputGroupPosition>("inputGroupPosition");

  // position not found return
  if (!position || !position.value) {
    return;
  }

  // status
  const { validateStatus, isExpanded, isFocused, isHovered } = status;

  // watch validate status
  watch(validateStatus, (val) => {
    inputGroupCtx.setInputGroupValidate(val);
  });

  // watch expanded
  watch(isExpanded, (val) => {
    inputGroupCtx.setInputGroupExpanded(val);
  });

  // judge actived
  watch([isFocused, isHovered], ([focused, hovered]) => {
    if (focused) {
      inputGroupCtx.setInputGroupActived(true, position.value!);
    } else if (hovered) {
      inputGroupCtx.setInputGroupActived(true, position.value!);
    } else {
      inputGroupCtx.setInputGroupActived(false, position.value!);
    }
  });
};

export default useInputGroupCtx;
