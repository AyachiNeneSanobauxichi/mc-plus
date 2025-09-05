import type { Ref } from "vue";
import { computed, inject, watch } from "vue";
import { isFunction } from "lodash-es";
import { INPUT_GROUP_INJECTION_KEY } from "../../mc-input-group/constant";

const useSelectDisable = (
  formDisabled: Ref<boolean>,
  disableFunc: () => void
) => {
  // input group context
  const inputGroupCtx = inject(INPUT_GROUP_INJECTION_KEY, void 0);

  // disabled
  const isDisabled = computed(() => {
    return !!formDisabled.value || !!inputGroupCtx?.disabled.value;
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
