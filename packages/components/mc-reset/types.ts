export interface ResetProps {
  rotate?: boolean;
  autoRotate?: boolean;
  duration?: number;
}

export interface ResetEmits {
  (e: "reset"): void;
}
