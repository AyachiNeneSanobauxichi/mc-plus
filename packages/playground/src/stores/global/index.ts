import { ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { ACCESS_TOKEN_KEY } from "../../apis";

// global store
const useGlobalStore = defineStore("GlobalStore", () => {
  // rsa public key
  const rsaPublicKey = ref<string>("");

  // set rsa public key
  const setRsaPublicKey = (key: string) => {
    rsaPublicKey.value = key;
  };

  // get rsa public key
  const getRsaPublicKey = () => {
    return rsaPublicKey.value;
  };

  // clear rsa public key
  const clearRsaPublicKey = () => {
    rsaPublicKey.value = "";
  };

  // access token
  const accessToken = useStorage(ACCESS_TOKEN_KEY, "");

  // set access token
  const setAccessToken = (token: string) => {
    accessToken.value = token;
  };

  // get access token
  const getAccessToken = () => {
    return accessToken.value;
  };

  // clear access token
  const clearAccessToken = () => {
    accessToken.value = "";
  };

  return {
    setRsaPublicKey,
    getRsaPublicKey,
    clearRsaPublicKey,
    setAccessToken,
    getAccessToken,
    clearAccessToken,
  };
});

export default useGlobalStore;
