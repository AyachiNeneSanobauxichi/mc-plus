<template>
  <div class="playground">
    <playground-otp></playground-otp>
  </div>
</template>

<script setup lang="ts">
import PlaygroundOtp from "./views/mc-otp/playground-otp.vue";
</script>

<style scoped lang="scss">
.playground {
  :deep(.playground-center) {
    position: fixed;
    width: 1200px;
    height: 800px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
