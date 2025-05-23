/*
 * @Author: Tieju yang
 * @Date: 2025-05-21 09:33:32
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-21 09:34:25
 */
import type { Ref } from "vue";
import type { IconType } from "../mc-icon/types";

export type ToastType = "primary" | "success" | "warning" | "error";
export type ToastPosition = "top" | "bottom";

export interface ToastProps {
  type?: ToastType;
  title?: string;
  message?: string;
  icon?: IconType;
  showClose?: boolean;
  duration?: number;
  position?: ToastPosition;
  onClose?: () => void;
}

export interface ToastEmits {
  (e: "close"): void;
}

export interface ToastInstance {
  ref: Ref<HTMLDivElement | void>;
  close: () => void;
}
