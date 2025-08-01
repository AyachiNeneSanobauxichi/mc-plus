import type { Ref } from "vue";
import type { FormContext, FormItemContext, ValidateStatus } from "../types";

// form id hook options
export interface McFormIdHookOptions {
  formItem: FormItemContext;
  externalId?: Ref<string>;
}

// form disabled hook options
export interface McFormDisabledHookOptions {
  form?: FormContext;
  formItem?: FormItemContext;
  externalDisabled?: Ref<boolean>;
}

// form item hook options
export interface McFormItemHookOptions {
  externalDisabled?: McFormDisabledHookOptions["externalDisabled"];
  externalId?: McFormIdHookOptions["externalId"];
}

// form validate hook options
export interface McFormValidateHookOptions extends McFormItemHookOptions {
  validator?: () => ValidateStatus | void;
}
