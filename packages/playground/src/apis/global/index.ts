import { http } from "../request";

// get encrypt public key
export const getEncryptPublicKey = async () => {
  return http.post<void, string>("/auth/file/getPublicKey.do");
};
