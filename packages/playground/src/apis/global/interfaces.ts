import type { ILoginRequest, ILoginResponse } from "./types";
import { http } from "../request";

// get encrypt public key
export const getEncryptPublicKey = async () => {
  return await http.post<void, string>("/auth/file/getPublicKey.do");
};

// login
export const login = async (params: ILoginRequest) => {
  return await http.post<ILoginRequest, ILoginResponse>(
    "/auth/sysUser/login.do",
    params
  );
};
