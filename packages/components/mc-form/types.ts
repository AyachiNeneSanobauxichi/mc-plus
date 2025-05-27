export interface FormProps {
  model: any;
  rules?: any;
}

export interface FormItemProps {
  label?: string;
  prop?: string;
  required?: boolean;
}

export interface FormItemContext {
  validate: (val?: string) => void;
}
