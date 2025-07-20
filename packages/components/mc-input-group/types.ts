import type { Ref } from "vue";

export interface InputGroupContext {
  disabled: Ref<boolean>;
  setInputGroupExpanded: (expanded: boolean) => void;
}

export interface InputGroupProps {
  disabled?: boolean;
  suffixFlex?: number;
  prefixFlex?: number;
}
