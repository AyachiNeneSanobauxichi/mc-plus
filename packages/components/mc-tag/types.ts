import type { Ref } from "vue";
import type { IconType } from "../mc-icon/types";

export type TagType = "primary" | "plain" | "dark";

export type TagSize = "medium" | "large" | "small";

export interface TagProps {
  type?: TagType;
  size?: TagSize;
  disabled?: boolean;
  closable?: boolean;
  icon?: IconType;
  content?: string;
  height?: string;
  width?: string;
  selected?: boolean;
}

export interface TagEmits {
  (e: "click", val: MouseEvent): void;
  (e: "close", val: MouseEvent): void;
}

export interface TagInstance {
  ref: Ref<HTMLDivElement | void>;
}
