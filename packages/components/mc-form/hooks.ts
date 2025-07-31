import type { ValidateStatus } from "./types";
import type { Ref } from "vue";
import { computed, inject, onBeforeUnmount, onMounted } from "vue";
import { isFunction } from "lodash-es";
import { useId, useProp } from "@mc-plus/hooks";
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constanst";

// form item hook
export function useFormItem() {
  const form = inject(FORM_CTX_KEY, void 0);
  const formItem = inject(FORM_ITEM_CTX_KEY, void 0);

  // form id
  const formId = useId();

  // set form item id
  onMounted(() => {
    if (formItem) {
      formItem.id = formId;
    }
  });

  // remove form item id
  onBeforeUnmount(() => {
    if (formItem) {
      formItem.id = "";
    }
  });

  return { form, formItem, formId };
}

// form disabled hook
export function useFormDisabled(externalDisabled?: Ref<boolean>) {
  const form = inject(FORM_CTX_KEY, void 0);
  const formItem = inject(FORM_ITEM_CTX_KEY, void 0);
  const disabledProp = useProp<boolean>("disabled");

  return computed(
    () =>
      disabledProp.value ||
      form?.disabled ||
      formItem?.disabled ||
      externalDisabled?.value
  );
}

// form validate hook
export function useFormValidate(validator?: () => ValidateStatus | void) {
  // form item context
  const { form, formItem, formId } = useFormItem();

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

  return {
    form,
    formItem,
    formId,
    validateStatus,
    validateStyle,
    isError,
    isSuccess,
    statusIcon,
  };
}
