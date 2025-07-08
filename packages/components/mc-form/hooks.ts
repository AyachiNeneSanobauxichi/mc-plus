import { computed, inject } from "vue";
import { isBoolean } from "lodash-es";
import useProp from "@mc-plus/hooks/useProp";
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constanst";

// form item hook
export function useFormItem() {
  const form = inject(FORM_CTX_KEY, void 0);
  const formItemValidate = useProp<boolean>("formValidate");

  console.log("formItemValidate", formItemValidate.value);
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
