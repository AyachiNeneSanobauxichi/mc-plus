export interface ModalHeaderProps {
  title?: string;
  showClose?: boolean;
}

export interface ModalHeaderEmits {
  (e: "close"): void;
}
