import type { Ref, VNode } from "vue";

export type TabType = "primary" | "plain";

export interface TabProps {
  modelValue?: string;
  type?: TabType;
}

export interface TabEmits {
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
}

export interface TabInstance {
  ref: Ref<HTMLDivElement | void>;
}

export interface TabItemProps {
  name: string;
  label?: string;
  disabled?: boolean;
  count?: number;
}

export interface TabItem extends TabItemProps {
  vn?: VNode;
}
