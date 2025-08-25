<template>
  <div class="playground">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGlobalStore } from "./stores";
import { getEncryptPublicKey } from "./apis";

// global store
const { setRsaPublicKey, clearRsaPublicKey } = useGlobalStore();

onMounted(async () => {
  // get encrypt public key
  const { data } = await getEncryptPublicKey();
  data ? setRsaPublicKey(data) : clearRsaPublicKey();
});
</script>
