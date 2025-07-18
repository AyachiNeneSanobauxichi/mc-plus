import type { Component } from "vue";

export type SelectPlusValue = string | number | boolean | undefined;

export interface _OptionNode extends _FilteredOptionNode {
  label?: string;
  context?: Component;
}

export interface _FilteredOptionNode {
  value: SelectPlusValue;
  group?: string;
}

export interface _OptionsEmits {
  "update-options": [options: _OptionNode[]];
}
