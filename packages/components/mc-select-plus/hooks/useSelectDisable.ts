import { computed, inject, watch } from "vue";
import { isFunction } from "lodash-es";
import { useFormDisabled } from "../../mc-form/hooks";
import { INPUT_GROUP_INJECTION_KEY } from "../../mc-input-group/constant";

const useSelectDisable = (disableFunc: () => void) => {
  // form item disabled
  const formItemDisabled = useFormDisabled();

  // input group context
  const inputGroupCtx = inject(INPUT_GROUP_INJECTION_KEY, void 0);

  // disabled
  const isDisabled = computed(() => {
    return !!formItemDisabled.value || !!inputGroupCtx?.disabled.value;
  });

  // watch disabled
  watch(isDisabled, (disabled) => {
    if (disabled && isFunction(disableFunc)) {
      disableFunc();
    }
  });

  return {
    isDisabled,
  };
};

export default useSelectDisable;
