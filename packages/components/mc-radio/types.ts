/*
 * @Author: Tieju yang
 * @Date: 2025-05-20 08:54:26
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-22 09:52:50
 */
import type { ComputedRef, Ref } from "vue";

export type RadioSize = "medium" | "large" | "small";
// radioGroup inject
export type RadioGroupContext = {
  value: ComputedRef<string | number | boolean>;
  size?: ComputedRef<RadioSize>;
  disabled?: ComputedRef<boolean>;
  name?: ComputedRef<string>;
  change: (val: string | number | boolean) => void;
};

export interface RadioProps {
  modelValue?: string | number | boolean;
  value?: string | number | boolean;
  disabled?: boolean;
  label?: string;
}

export interface RadioEmits {
  (e: "update:modelValue", val: string | number | boolean): void;
  (e: "change", val: string | number | boolean): void;
}

export interface RadioInstance {
  ref: Ref<HTMLElement | undefined>;
}

export interface RadioGroupProps {
  modelValue?: string | number | boolean;
  disabled?: boolean;
  size?: RadioSize;
  name?: string;
}

export interface RadioGroupEmits {
  (e: "update:modelValue", val: string | number | boolean): void;
  (e: "change", val: string | number | boolean): void;
}

export interface RadioGroupInstance {
  ref: Ref<HTMLElement | undefined>;
}
