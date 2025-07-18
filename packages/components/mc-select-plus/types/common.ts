import type { Component } from "vue";

export type SelectPlusValue = string | number | boolean;

export interface _OptionNode {
  label?: string;
  value: SelectPlusValue;
  context?: Component;
}

export interface _OptionsEmits {
  "update-options": [options: _OptionNode[]];
}
