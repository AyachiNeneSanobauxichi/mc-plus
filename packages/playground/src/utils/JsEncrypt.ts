import JsEncrypt from "jsencrypt";

// rsa encrypt password
export function RSAencrypt(pas: string, publicKey: string) {
  let jse = new JsEncrypt();
  jse.setPublicKey(publicKey);
  return jse.encrypt(pas);
}
