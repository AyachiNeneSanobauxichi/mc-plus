import type { McFormDisabledHookOptions } from "./types";
import { computed } from "vue";
import { useProp } from "@mc-plus/hooks";

// form disabled hook
const useFormDisabled = ({
  form,
  formItem,
  externalDisabled,
}: McFormDisabledHookOptions) => {
  const disabledProp = useProp<boolean>("disabled");

  return computed<boolean>(
    () =>
      disabledProp.value ||
      !!form?.disabled ||
      !!formItem?.disabled ||
      !!externalDisabled?.value
  );
};

export default useFormDisabled;
