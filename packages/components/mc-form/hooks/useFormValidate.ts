import type { ValidateStatus } from "../types";
import type { McFormValidateHookOptions } from "./types";
import { computed, watch } from "vue";
import { isFunction } from "lodash-es";
import { useProp } from "@mc-plus/hooks";
import useFormItem from "./useFormItem";

// form validate hook
const useFormValidate = ({
  externalId,
  externalDisabled,
  validator,
}: McFormValidateHookOptions = {}) => {
  // form item context
  const { form, formItem, formId, formDisabled } = useFormItem({
    externalId,
    externalDisabled,
  });

  // form item validate status
  const validateStatus = computed<ValidateStatus>(() => {
    if (isFunction(validator)) {
      const result = validator();
      if (result === "error") return "error";
    }
    return formItem?.validateStatus || "init";
  });

  // form validate style
  const validateStyle = computed<string>(
    () => `mc-form-validate-${validateStatus.value}`
  );

  // error
  const isError = computed<boolean>(() => validateStatus.value === "error");

  // success
  const isSuccess = computed<boolean>(() => validateStatus.value === "success");

  // status icon
  const statusIcon = computed<"Accept_02" | "Reject_02" | undefined>(() => {
    if (isError.value) return "Reject_02";
    if (isSuccess.value) return "Accept_02";
    return void 0;
  });

  // model value
  const modelValue = useProp<any>("modelValue");

  // model value changed
  watch(
    () => modelValue.value,
    () => {
      formItem?.validate("change");
    }
  );

  return {
    form,
    formItem,
    formId,
    formDisabled,
    validateStatus,
    validateStyle,
    isError,
    isSuccess,
    statusIcon,
  };
};

export default useFormValidate;
