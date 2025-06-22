import type { Ref } from "vue";
import type { IconType } from "mc-plus";

export type TagType = "basic" | "selectable";

export type TagEmphasis = "bold" | "minimal" | "subtle";

export type TagSize = "x-small" | "small" | "medium";

export interface TagProps {
  width?: string;
  height?: string;
  size?: TagSize;
  type?: TagType;
  emphasis?: TagEmphasis;
  disabled?: boolean;
  deletable?: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
}

export interface TagEmits {
  (e: "delete"): void;
  (e: "click"): void;
}

export interface TagInstance {
  ref: Ref<HTMLDivElement | void>;
}
