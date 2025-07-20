import type { Ref } from "vue";

export interface InputGroupContext {
  disabled?: Ref<boolean>;
}

export interface InputGroupProps {
  disabled?: boolean;
}
