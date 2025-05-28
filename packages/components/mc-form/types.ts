import type { RuleItem } from "async-validator";

export interface FormItemRule extends RuleItem {
  trigger?: string;
}

export type FormRules = Record<string, FormItemRule[]>;

export interface FormProps {
  model: any;
  rules?: FormRules;
}

export interface FormItemProps {
  label?: string;
  prop?: string;
  required?: boolean;
}

export interface FormItemContext {
  validate: (val?: string) => void;
}
