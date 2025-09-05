import type { CheckboxValue } from "../types";
import { computed, inject } from "vue";
import { includes, isFunction, isNil } from "lodash-es";
import { CHECKBOX_GROUP_INJECTION_KEY } from "../constant";

// use checkbox group hook
const useCheckboxGroup = () => {
  // checkbox group context
  const checkboxGroupCtx = inject(CHECKBOX_GROUP_INJECTION_KEY, void 0);

  // checkbox group disabled
  const checkboxGroupDisabled = computed<boolean>(() => {
    return !!checkboxGroupCtx?.disabled?.value;
  });

  // is checkbox group
  const isCheckboxGroup = computed<boolean>(() => {
    return !!checkboxGroupCtx && isFunction(checkboxGroupCtx?.handleSelect);
  });

  // is checkbox selected
  const isCheckboxSelected = (value?: CheckboxValue): boolean => {
    return (
      !isNil(value) && includes(checkboxGroupCtx?.modelValue?.value, value)
    );
  };

  // handle checkbox select
  const handleCheckboxSelect = (value?: CheckboxValue) => {
    checkboxGroupCtx?.handleSelect(value);
  };

  return {
    checkboxGroupCtx,
    checkboxGroupDisabled,
    isCheckboxGroup,
    isCheckboxSelected,
    handleCheckboxSelect,
  };
};

export default useCheckboxGroup;
