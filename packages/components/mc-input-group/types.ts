export type InputGroupAffix = "prefix" | "suffix" | undefined;

export interface InputGroupContext {
  select: InputGroupAffix;
  input: InputGroupAffix;
}
