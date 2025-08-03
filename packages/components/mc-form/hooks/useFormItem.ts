import type { McFormItemHookOptions } from "./types";
import { computed, inject } from "vue";
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "../constanst";
import useFormId from "./useFormId";
import useFormDisabled from "./useFormDisabled";
import { useProp } from "@mc-plus/hooks";

// form item hook
const useFormItem = ({
  externalId,
  externalDisabled,
  disableValidation,
}: McFormItemHookOptions = {}) => {
  // disable validation prop
  const _disableValidationProp = useProp<boolean>("disableValidation");

  // disable validation
  const unuseValidation = computed<boolean>(
    () => !!_disableValidationProp.value || !!disableValidation?.value
  );

  // form context
  const form = inject(FORM_CTX_KEY, void 0);

  // form item context
  const formItem = unuseValidation.value
    ? void 0
    : inject(FORM_ITEM_CTX_KEY, void 0);

  // form id
  const formId = formItem ? useFormId({ formItem, externalId }) : void 0;

  // form disabled
  const formDisabled = useFormDisabled({ form, formItem, externalDisabled });

  return { form, formItem, formId, formDisabled };
};

export default useFormItem;
