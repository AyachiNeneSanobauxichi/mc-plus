import type { Ref } from "vue";
import { nextTick, ref } from "vue";
import { useClickOutside, useProp } from "@mc-plus/hooks";

// otp focus hook
const useOtpFocus = (
  inputItemRefs: Ref<HTMLElement[]>,
  onBlur?: () => void
) => {
  // focus index
  const focusIndex = ref<number>();

  // set focus index
  const setFocusIndex = (index: number | undefined) => {
    focusIndex.value = index;
  };

  // use click outside
  useClickOutside(inputItemRefs, () => {
    setFocusIndex(void 0);
    onBlur?.();
  });

  // length prop
  const length = useProp<number>("length");

  // set focus
  const setFocus = (index: number) => {
    const _length = length.value ?? 0;
    if (index < 0) index = 0;
    if (index > _length - 1) index = _length - 1;
    focusIndex.value = index;
    const itemRef = inputItemRefs.value[index];
    const inputRef = itemRef?.children?.[0] as HTMLInputElement;
    inputRef?.focus();
  };

  // model value
  const modelValue = useProp<string | undefined>("modelValue");

  // next focus
  const nextFocus = () => {
    nextTick(() => {
      const _length = modelValue.value?.length ?? 0;
      if (_length < (length.value ?? 0)) {
        setFocus(_length);
      }
    });
  };

  // prev focus
  const prevFocus = () => {
    nextTick(() => {
      const _length = modelValue.value?.length ?? 0;
      if (_length - 1 >= 0) {
        setFocus(_length - 1);
      }
    });
  };

  return {
    focusIndex,
    setFocusIndex,
    setFocus,
    nextFocus,
    prevFocus,
  };
};

export default useOtpFocus;
