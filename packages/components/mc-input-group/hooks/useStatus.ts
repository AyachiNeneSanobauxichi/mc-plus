import { computed, ref } from "vue";
import type { ValidateStatus } from "../../mc-form";
import type { InputGroupPosition } from "../types";

// use status hook
const useStatus = () => {
  // validate status
  const validateStatus = ref<ValidateStatus>("init");

  // is error
  const isError = computed(() => validateStatus.value === "error");

  // is expanded
  const isExpanded = ref<boolean>(false);

  // prefix actived
  const isPrefixActived = ref<boolean>(false);

  // suffix actived
  const isSuffixActived = ref<boolean>(false);

  // set validate status
  const setInputGroupValidate = (status: ValidateStatus) => {
    validateStatus.value = status;
  };

  // set expanded
  const setInputGroupExpanded = (expanded: boolean) => {
    isExpanded.value = expanded;
  };

  // set actived
  const setInputGroupActived = (
    actived: boolean,
    position: InputGroupPosition
  ) => {
    if (position === "prefix") {
      isPrefixActived.value = actived;
    } else {
      isSuffixActived.value = actived;
    }
  };

  return {
    validateStatus,
    isError,
    isExpanded,
    isPrefixActived,
    isSuffixActived,
    setInputGroupValidate,
    setInputGroupExpanded,
    setInputGroupActived,
  };
};

export default useStatus;
