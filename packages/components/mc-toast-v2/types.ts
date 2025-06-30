export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  type?: ToastType;
  message?: string;
  content?: string;
  closable?: boolean;
  autoClose?: boolean;
  duration?: number;
  hideIcon?: boolean;
}

export interface ToastEmits {
  (e: "close"): void;
}
