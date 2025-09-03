export interface DraggableAreaProps {
  modelValue: string[];
  title: string;
  group: string;
  removable?: boolean;
}

export interface DraggableAreaEmits {
  (event: "update:modelValue", value: string[]): void;
  (event: "remove", value: string): void;
}
