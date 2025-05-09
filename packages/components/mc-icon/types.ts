import type { Ref } from "vue";

export type IconType =
  | "envelope"
  | "setting"
  | "upload"
  | "clock"
  | "switch"
  | "loading-dot"
  | "fork"
  | "square"
  | "triangle-up"
  | "loading"
  | "application"
  | "warning"
  | "info"
  | "add"
  | "arrow-right"
  | "arrow-left"
  | "download"
  | "attachment"
  | "document"
  | "copy"
  | "refresh"
  | "mandatory"
  | "edit"
  | "delete"
  | "success";

export interface IconProps {
  name: IconType;
}

export interface IconEmits {
  (e: "click", val: MouseEvent): void;
}

export interface IconInstance {
  ref: Ref<HTMLElement | void>;
}
