import type { Ref } from "vue";

export interface IconProps {
  name: string;
}

export interface IconEmits {
  (e: "click", val: MouseEvent): void;
}

export interface IconInstance {
  ref: Ref<HTMLElement | void>;
}
