export interface ProgressBarProps {
  percentage?: number;
  height?: number | string;
  width?: number | string;
  remarks?: string;
  showPercentage?: boolean;
}

export interface ProgressBarEmits {
  (e: "update:percentage", value: number): void;
  (e: "complete"): void;
}

export interface ProgressBarInstance {
  updatePercentage: (value: number) => void;
  complete: () => void;
  reset: () => void;
}
