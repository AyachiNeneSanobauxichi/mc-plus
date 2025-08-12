import type { Ref } from "vue";
import { getCurrentInstance, ref } from "vue";
import useEventListener from "./useEventListener";
import { isFunction } from "lodash-es";

interface UseFocusOptions {
  afterFocus?(): void;
  beforeBlur?(event: FocusEvent): boolean | void;
  afterBlur?(): void;
}

// use focus hook
function useFocus<T extends HTMLElement | { focus(): void }>(
  target: Ref<T | void>,
  { afterFocus, beforeBlur, afterBlur }: UseFocusOptions = {}
) {
  // vue instance
  const instance = getCurrentInstance()!;
  // emit
  const { emit } = instance;
  // wrapper
  const wrapperRef = ref<HTMLElement>();
  // focused
  const isFocused = ref<boolean>(false);

  // focus event
  const handleFocus = (event: FocusEvent) => {
    if (isFocused.value) return;
    isFocused.value = true;
    emit("focus", event);
    afterFocus?.();
  };

  // blur event
  const handleBlur = (event: FocusEvent) => {
    const forbidBlur = isFunction(beforeBlur) ? beforeBlur(event) : false;

    // forbid blur callback is true or next focus in wrapper
    if (
      forbidBlur ||
      (event.relatedTarget &&
        wrapperRef.value?.contains(event.relatedTarget as Node))
    )
      return;

    isFocused.value = false;
    emit("blur", event);
    afterBlur?.();
  };

  // click event
  const handleClick = () => {
    target.value?.focus();
  };

  // listen click event
  useEventListener(wrapperRef, "click", handleClick);

  return {
    wrapperRef,
    isFocused,
    handleFocus,
    handleBlur,
  };
}

export default useFocus;
