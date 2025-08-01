import type { McFormIdHookOptions } from "./types";
import { onBeforeUnmount, onMounted } from "vue";
import { useId } from "@mc-plus/hooks";

// form id hook
const useFormId = ({ formItem, externalId }: McFormIdHookOptions) => {
  // form id
  const formId = useId(externalId?.value);

  // set form item id
  onMounted(() => {
    if (formItem) formItem.id = formId;
  });

  // remove form item id
  onBeforeUnmount(() => {
    if (formItem) formItem.id = "";
  });

  return formId;
};

export default useFormId;
