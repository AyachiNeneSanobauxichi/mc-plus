import type { Ref } from "vue";

export interface OverlayPorps {
  visible?: boolean;
  fixed?: boolean;
}

export interface OverlayEmits {
  (e: "click"): void;
}

export interface OverlayInstance {
  ref: Ref<HTMLDivElement | void>;
}
