/*
 * @Author: Tieju yang
 * @Date: 2025-05-20 15:27:59
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-20 15:28:16
 */
import type { Ref } from "vue";

export type MessageType = "success" | "info" | "warning" | "error";
export type MessagePosition = "top" | "bottom";

export interface MessageProps {
  type?: MessageType;
  message?: string;
  description?: string;
  duration?: number;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
}

export interface MessageEmits {
  (e: "close"): void;
}

export interface MessageComponentExposed {
  handleClose: () => void;
}

export interface MessageInstance {
  ref: Ref<HTMLDivElement | undefined>;
}

export interface MessageOptions extends MessageProps {
  id?: string;
}

export interface MessageMethod {
  (options: MessageOptions | string): void;
}

export interface MessageService {
  info: MessageMethod;
  success: MessageMethod;
  warning: MessageMethod;
  error: MessageMethod;
  close: (id: string) => void;
  closeAll: () => void;
}
