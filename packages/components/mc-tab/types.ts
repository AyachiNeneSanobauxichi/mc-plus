import type { Ref, VNode } from "vue";

export type TabType = "primary" | "plain";

export type TabValue = string | number;

export interface TabProps {
  modelValue?: TabValue | undefined;
  type?: TabType;
}

export interface TabEmits {
  (e: "update:modelValue", value: TabValue): void;
  (e: "change", value: TabValue): void;
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
  _vnode?: VNode;
}
