import type { AxiosRequestConfig } from "axios";

export type RequestType = "formData" | "json";

export interface RequestConfig<T> extends AxiosRequestConfig<T> {
  requestType?: RequestType;
}

export interface IResponse<T = any> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}
