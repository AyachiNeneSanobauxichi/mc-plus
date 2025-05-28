import type {
  RuleItem,
  ValidateError,
  ValidateFieldsError,
} from "async-validator";
import type { Ref } from "vue";

export interface FormItemRule extends RuleItem {
  trigger?: string | string[];
}
export type FormRules = Record<string, FormItemRule[]>;

export type FormValidateResult = Promise<boolean>;
export type FormValidateCallback = (
  isValid: boolean,
  invalidFields?: ValidateFieldsError
) => void;

export type ValidateStatus = "success" | "error" | "init" | "validating";

export interface FormValidateFailuer {
  errors?: ValidateError[];
  fields: ValidateFieldsError;
}

export interface FormProps {
  model: Record<string, any>;
  rules?: FormRules;
}

export interface FormEmits {
  (
    event: "validate",
    prop: FormItemProps,
    isValid: boolean,
    message: string
  ): void;
}

export interface FormItemProps {
  prop?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  rules?: FormItemRule[];
}

export interface FormInstance {
  validate(callback?: FormValidateCallback): FormValidateResult;
  validateField(
    keys?: string[],
    callback?: FormValidateCallback
  ): FormValidateResult;
  // resetFields(keys?: string[]): void;
  clearValidate(keys?: string[]): void;
}

export interface FormItemInstance {
  validateStatus: Ref<ValidateStatus>;
  validateMessage: Ref<string>;
  validate(
    trigger: string,
    callback?: FormValidateCallback
  ): FormValidateResult;
  // resetField(): void;
  clearValidate(): void;
}

export interface FormContext extends FormProps {
  emits: FormEmits;
  addField(field: FormItemContext): void;
  removeField(field: FormItemContext): void;
}

export interface FormItemContext extends FormItemProps {
  validate(
    trigger: string,
    callback?: FormValidateCallback
  ): FormValidateResult;
  // resetField(): void;
  clearValidate(): void;
}
