import { computed, watch } from "vue";
import { isFunction } from "lodash-es";
import { useFormDisabled } from "../../mc-form/hooks";

const useSelectDisable = (disableFunc: () => void) => {
  // form item disabled
  const formItemDisabled = useFormDisabled();

  // disabled
  const isDisabled = computed(() => {
    return !!formItemDisabled.value;
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
