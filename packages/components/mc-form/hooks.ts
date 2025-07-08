import { computed, inject } from "vue";
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constanst";
import useProp from "@mc-plus/hooks/useProp";

// form item hook
export function useFormItem() {
  const form = inject(FORM_CTX_KEY, void 0);
  const formItemValidate = useProp<boolean>("formValidate");
  const formItem = formItemValidate.value
    ? inject(FORM_ITEM_CTX_KEY, void 0)
    : void 0;

  return { form, formItem };
}

// form disabled hook
export function useFormDisabled() {
  const form = inject(FORM_CTX_KEY, void 0);
  const formItem = inject(FORM_ITEM_CTX_KEY, void 0);
  const disabled = useProp<boolean>("disabled");

  return computed(() => disabled.value || form?.disabled || formItem?.disabled);
}
