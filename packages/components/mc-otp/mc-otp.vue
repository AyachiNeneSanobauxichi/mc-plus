<template>
  <div class="mc-otp">Mc OTP</div>
</template>

<script setup lang="ts">
import type { OtpProps, OtpEmits } from "./types";
import { watchEffect } from "vue";

// options
defineOptions({ name: "McOtp" });

// props
const props = withDefaults(defineProps<OtpProps>(), {
  disabled: false,
  length: 6,
});

// emits
const emits = defineEmits<OtpEmits>();

// model value length check
watchEffect(() => {
  if (props.modelValue?.length ?? 0 > props.length) {
    throw new Error("modelValue length is greater than length.");
  }
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
