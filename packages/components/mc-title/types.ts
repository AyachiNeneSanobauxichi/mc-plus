import type { Ref } from "vue";

export interface TitleProps {
  width?: string;
  height?: string;
  title?: string;
  showToolBar?: boolean;
  showBorder?: boolean;
  showReset?: boolean;
  showMandatory?: boolean;
}

export interface TitleEmits {
  (e: "reset"): void;
}

export interface TitleInstance {
  ref: Ref<HTMLDivElement | void>;
}

export interface TitleToolBarEmits {
  (e: "reset"): void;
}

export interface TitleToolBarInstance {
  ref: Ref<HTMLDivElement | void>;
}
