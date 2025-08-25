import { ref } from "vue";
import { defineStore } from "pinia";

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

  return {
    setRsaPublicKey,
    getRsaPublicKey,
    clearRsaPublicKey,
  };
});

export default useGlobalStore;
