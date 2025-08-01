import type { McFormItemHookOptions } from "./types";
import { inject } from "vue";
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "../constanst";
import useFormId from "./useFormId";
import useFormDisabled from "./useFormDisabled";

// form item hook
const useFormItem = ({
  externalId,
  externalDisabled,
}: McFormItemHookOptions = {}) => {
  // form context
  const form = inject(FORM_CTX_KEY, void 0);
  // form item context
  const formItem = inject(FORM_ITEM_CTX_KEY, void 0);

  // form id
  let formId: string | undefined;
  if (formItem) formId = useFormId({ formItem, externalId });

  // form disabled
  const formDisabled = useFormDisabled({ form, formItem, externalDisabled });

  return { form, formItem, formId, formDisabled };
};

export default useFormItem;
