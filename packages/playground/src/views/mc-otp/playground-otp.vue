<template>
  <div class="playground-otp playground-center">
    <mc-otp v-model="otp" :length="6" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McOtp from "../../../../components/mc-otp/mc-otp.vue";

const otp = ref("");
</script>

<style scoped lang="scss"></style>
