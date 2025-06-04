import type { Ref } from "vue";

export interface FooterProps {
  width?: string;
  height?: string;
  wrapperWidth?: string;
  showborder?: boolean;
}

export interface FooterInstance {
  ref: Ref<HTMLDivElement | void>;
}
