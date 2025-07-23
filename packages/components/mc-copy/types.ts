interface CopyProps {
  text?: string | undefined;
  showToast?: boolean;
  toastSuccessText?: string;
  toastErrorText?: string;
  manual?: boolean;
}

interface CopyEmits {
  (e: "copy", text: string): void;
  (e: "success", text: string): void;
  (e: "error", text: string, error: Error): void;
}

export type { CopyProps, CopyEmits };
