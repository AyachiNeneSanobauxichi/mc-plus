/*
 * @Author: Tieju yang
 * @Date: 2025-05-20 13:57:01
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-20 14:55:16
 */
import type { Ref } from "vue";

export type AlertType = "success" | "info" | "warning" | "error";

export type AlertSize = "medium" | "large" | "small";

export interface AlertProps {
  type?: AlertType;
  size?: AlertSize;
  title?: string;
  description?: string;
  closable?: boolean;
  showIcon?: boolean;
  height?: string;
  width?: string;
}

export interface AlertEmits {
  (e: "close", val: MouseEvent): void;
}

export interface AlertInstance {
  ref: Ref<HTMLDivElement | void>;
}
