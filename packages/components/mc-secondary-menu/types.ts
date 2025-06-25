export type SecondaryMenuValue = string | number;

export interface SecondaryMenuItem {
  label?: string;
  name: SecondaryMenuValue;
  children?: SecondaryMenuItem[];
}

export interface SecondaryMenuDisplayItem extends SecondaryMenuItem {
  parent?: SecondaryMenuValue;
}

export interface SecondaryMenuProps {
  modelValue?: SecondaryMenuValue | undefined;
  options?: SecondaryMenuItem[];
}

export interface SecondaryMenuEmits {
  (e: "update:modelValue", value: SecondaryMenuValue): void;
  (e: "change", value: SecondaryMenuValue): void;
}
