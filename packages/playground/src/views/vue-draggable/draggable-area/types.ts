export interface DraggableAreaProps {
  modelValue: string[];
  title: string;
}

export interface DraggableAreaEmits {
  (event: "update:modelValue", value: string[]): void;
}
