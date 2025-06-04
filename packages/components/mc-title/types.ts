import type { Ref } from "vue";

export interface TitleToolBarEmits {
  (e: "reset"): void;
}

export interface TitleToolBarInstance {
  ref: Ref<HTMLDivElement | void>;
}
