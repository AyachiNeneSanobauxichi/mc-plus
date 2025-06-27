export interface ModalHeaderProps {
  title?: string;
  showBorder?: boolean;
  showClose?: boolean;
}

export interface ModalHeaderEmits {
  (e: "close"): void;
}
