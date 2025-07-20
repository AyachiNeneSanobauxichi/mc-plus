import { useProp } from "@mc-plus/hooks";
import { useFormDisabled } from "../../mc-form/hooks";
import { computed } from "vue";

// use disabled hook
const useInputGroupDisabled = () => {
  // form item disabled
  const formItemDisabled = useFormDisabled();

  // input group disabled
  const inputGroupDisabled = useProp<boolean>("disabled");

  // disabled
  const isDisabled = computed(() => {
    return !!formItemDisabled.value || !!inputGroupDisabled.value;
  });

  return {
    isDisabled,
  };
};

export default useInputGroupDisabled;
