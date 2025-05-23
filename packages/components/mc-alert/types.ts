/*
 * @Author: Tieju yang
 * @Date: 2025-05-20 13:57:01
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-23 11:02:41
 */
import type { Ref } from "vue";

export type AlertType = "success" | "info" | "warning" | "error";

export interface AlertProps {
  type?: AlertType;
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
