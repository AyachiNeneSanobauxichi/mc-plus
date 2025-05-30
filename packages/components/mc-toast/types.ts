/*
 * @Author: Tieju yang
 * @Date: 2025-05-21 09:33:32
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-23 17:49:58
 */
import type { Ref } from "vue";
import type { IconType } from "../mc-icon/types";

export type ToastType = "success" | "warning" | "error" | "info";
export type ToastPosition = "top" | "center" | "bottom";

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
