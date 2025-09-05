import JsEncrypt from "jsencrypt";

// rsa encrypt password
export function RSAencrypt(pas: string, publicKey: string): string {
  let jse = new JsEncrypt();
  jse.setPublicKey(publicKey);
  return jse.encrypt(pas) || "";
}
