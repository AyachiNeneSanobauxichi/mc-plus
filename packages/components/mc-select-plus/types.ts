import type { VNode } from "vue";

export type SelectType = "single" | "multi-choice";

export interface SelectProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: SelectType;
  width?: string;
  height?: string;
  search?: boolean;
}

export interface SelectEmits {
  (e: "update:modelValue", val: string | string[]): void;
  (e: "change", val: string | string[]): void;
}

export interface SelecOptinonProps {
  value: string;
  label?: string;
  width?: string;
  height?: string;
}

export interface SelectOptinon extends SelecOptinonProps {
  _group?: string;
  _vnode?: VNode;
  _isGroup?: boolean;
}

export interface SelectGroupProps {
  value: string;
  label?: string;
}
