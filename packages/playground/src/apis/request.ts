import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { ACCESS_TOKEN_KEY } from "./constant";

// axios config
const baseConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

// create axios instance
const request = axios.create(baseConfig);

// request interceptor
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // error handling
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // unauthorized, redirect to login page
          console.error("unauthorized");
          break;
        case 403:
          // forbidden
          console.error("forbidden");
          break;
        case 404:
          // resource not found
          console.error("resource not found");
          break;
        case 500:
          // server error
          console.error("server error");
          break;
        default:
          // request failed
          console.error("request failed");
      }
    } else if (error.request) {
      console.error("network error, please check your network connection");
    } else {
      console.error("request config error");
    }
    return Promise.reject(error);
  }
);

// api request
export const apiRequest = async <TRequest = any, TResponse = any>(
  config: AxiosRequestConfig<TRequest>
): Promise<TResponse> => {
  try {
    const response = await request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// convenient methods
export const http = {
  get: <TRequest = any, TResponse = any>(
    url: string,
    config?: AxiosRequestConfig<TRequest>
  ) => apiRequest<TRequest, TResponse>({ ...config, method: "GET", url }),

  post: <TRequest = any, TResponse = any>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig<TRequest>
  ) =>
    apiRequest<TRequest, TResponse>({ ...config, method: "POST", url, data }),

  put: <TRequest = any, TResponse = any>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig<TRequest>
  ) => apiRequest<TRequest, TResponse>({ ...config, method: "PUT", url, data }),

  delete: <TRequest = any, TResponse = any>(
    url: string,
    config?: AxiosRequestConfig<TRequest>
  ) => apiRequest<TRequest, TResponse>({ ...config, method: "DELETE", url }),

  patch: <TRequest = any, TResponse = any>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig<TRequest>
  ) =>
    apiRequest<TRequest, TResponse>({ ...config, method: "PATCH", url, data }),
};

export { request };
