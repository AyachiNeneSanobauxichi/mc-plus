import type { Ref } from "vue";

export interface McTitleToolbarProps {
  showReset?: boolean; // 是否显示重置按钮
  showMandatory?: boolean; // 是否显示必填标识
}

export interface McTitleToolbarEmits {
  (e: "reset"): void;
}

export interface McTitleToolbarInstance {
  ref: Ref<HTMLDivElement | void>;
}
