import type { Ref } from "vue";
import type { IconType } from "../mc-icon/types";

// tag types
export type TagType = "primary" | "plain";

export type TagSize = "medium" | "large" | "small";

export type TagRadius = "default" | "round" | "circle" | "square";

export interface TagProps {
  type?: TagType;
  size?: TagSize;
  disabled?: boolean;
  closable?: boolean;
  color?: string;
  textColor?: string;
  backgroundColor?: string;
  selectedTextColor?: string;
  selectedBackgroundColor?: string;
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
