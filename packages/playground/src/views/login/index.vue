<template>
  <div class="playground-login">
    <mc-button @click="handleLogin">Login</mc-button>
  </div>
</template>

<script setup lang="ts">
import { McButton } from "mc-plus";
import { useGlobalStore } from "../../stores";
import { login } from "../../apis";
import { RSAencrypt } from "../../utils";

// global store
const { getRsaPublicKey, setAccessToken, clearAccessToken } = useGlobalStore();

// login
const handleLogin = async () => {
  const { data } = await login({
    userName: "admin",
    passWord: RSAencrypt("test", getRsaPublicKey()),
    faVerificationCode: "123",
  });

  data ? setAccessToken(data.accessToken) : clearAccessToken();
};
</script>
