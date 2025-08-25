export interface IResponse<T = any> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}
