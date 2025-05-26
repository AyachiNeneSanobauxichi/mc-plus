import type { Ref } from "vue";
import type { IconType } from "../mc-icon/types";

// tag types
export type TagType = "primary" | "plain" | "dark";

export type TagSize = "medium" | "large" | "small";

export type TagRadius = "default" | "round";

export interface TagProps {
  type?: TagType;
  size?: TagSize;
  disabled?: boolean;
  closable?: boolean;
  color?: string;
  radius?: TagRadius;
  height?: string;
  width?: string;
  icon?: IconType;
  selected?: boolean;
}

export interface TagEmits {
  (e: "click", val: MouseEvent): void;
  (e: "close", val: MouseEvent): void;
}

export interface TagInstance {
  ref: Ref<HTMLDivElement | void>;
}
