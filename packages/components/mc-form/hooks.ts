import type { ValidateStatus } from "./types";
import { computed, inject } from "vue";
import { isBoolean } from "lodash-es";
import useProp from "@mc-plus/hooks/useProp";
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constanst";

// form item hook
export function useFormItem() {
  const form = inject(FORM_CTX_KEY, void 0);
  const formItemValidate = useProp<boolean>("formValidate");
  const formItem =
    isBoolean(formItemValidate.value) && !formItemValidate.value
      ? void 0
      : inject(FORM_ITEM_CTX_KEY, void 0);

  return { form, formItem };
}

// form disabled hook
export function useFormDisabled() {
  const form = inject(FORM_CTX_KEY, void 0);
  const formItem = inject(FORM_ITEM_CTX_KEY, void 0);
  const disabled = useProp<boolean>("disabled");

  return computed(() => disabled.value || form?.disabled || formItem?.disabled);
}

// form validate hook
export function useFormValidate() {
  // form item context
  const { formItem } = useFormItem();

  // form validate style prop
  const formValidateStyle = useProp<boolean>("formValidateStyle");

  // form item validate status
  const validateStatus = computed<ValidateStatus>(() => {
    if (!formValidateStyle.value) return "init";
    else return formItem?.validateStatus || "init";
  });

  // form item validate status style
  const validateStyle = computed<"success" | "error" | "validating">(() => {
    switch (validateStatus.value) {
      case "success":
        return "success";
      case "error":
        return "error";
      default:
        return "validating";
    }
  });

  // error
  const isError = computed<boolean>(() => validateStyle.value === "error");

  // success
  const isSuccess = computed<boolean>(() => validateStyle.value === "success");

  // status icon
  const statusIcon = computed<"Accept_02" | "Reject_02" | undefined>(() => {
    if (isError.value) return "Reject_02";
    if (isSuccess.value) return "Accept_02";
    return void 0;
  });

  return {
    formItem,
    validateStatus,
    validateStyle,
    isError,
    isSuccess,
    statusIcon,
  };
}
