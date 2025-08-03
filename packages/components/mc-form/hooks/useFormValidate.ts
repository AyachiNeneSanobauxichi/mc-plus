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
  disableValidation,
  validator,
}: McFormValidateHookOptions = {}) => {
  // form item context
  const { form, formItem, formId, formDisabled } = useFormItem({
    externalId,
    externalDisabled,
    disableValidation,
  });

  // form item validate status
  const validateStatus = formItem
    ? computed<ValidateStatus>(() => {
        if (isFunction(validator)) {
          const result = validator();
          if (result === "error") return "error";
        }
        return formItem?.validateStatus || "init";
      })
    : void 0;

  // form validate style
  const validateStyle = validateStatus
    ? computed<string>(() => `mc-form-validate-${validateStatus.value}`)
    : "";

  // error
  const isError = validateStatus
    ? computed<boolean>(() => validateStatus.value === "error")
    : false;

  // success
  const isSuccess = validateStatus
    ? computed<boolean>(() => validateStatus.value === "success")
    : false;

  // status icon
  const statusIcon = validateStatus
    ? computed<"Accept_02" | "Reject_02" | false>(() => {
        if (isError && isError.value) return "Reject_02";
        if (isSuccess && isSuccess.value) return "Accept_02";
        return false;
      })
    : false;

  // enable validation
  if (formItem) {
    // model value
    const modelValue = useProp<any>("modelValue");

    // model value changed
    watch(
      () => modelValue.value,
      () => {
        formItem.validate("change");
      }
    );
  }

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
