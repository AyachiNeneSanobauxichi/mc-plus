import type { ComponentInternalInstance, ComponentPublicInstance } from "vue";
import type { SelectPlusValue } from "./common";

export interface SelectOptionPlusProps {
  label?: string;
  value: SelectPlusValue;
  height?: number | string;
  width?: number | string;
}

export type SelectOptionPublicInstance =
  ComponentPublicInstance<SelectOptionPlusProps>;

export type SelectOptionInternalInstance = ComponentInternalInstance & {
  proxy: SelectOptionPublicInstance;
};
