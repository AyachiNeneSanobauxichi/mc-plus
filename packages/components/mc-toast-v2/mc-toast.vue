<template>
  <div class="mc-toast" :class="[`mc-toast-${type}`]">
    <div
      class="mc-toast-msg-container"
      :class="{ 'mc-toast-has-content': content || $slots.content }"
    >
      <div class="mc-toast-msg-text-container">
        <div class="mc-toast-msg-icon" v-if="iconName">
          <mc-icon :name="iconName" :size="22"></mc-icon>
        </div>
        <div class="mc-toast-msg-text" v-if="message || $slots.default">
          <slot>{{ message }}</slot>
        </div>
      </div>
      <div class="mc-toast-msg-close-container">
        <div class="mc-toast-countdown" v-if="duration">
          {{ countDown }}
        </div>
        <div class="mc-toast-msg-close" v-if="closable">
          <mc-icon name="Cross" :size="24" @click="handleClose"></mc-icon>
        </div>
      </div>
    </div>
    <div class="mc-toast-content-container" v-if="content || $slots.content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToastEmits } from "mc-plus";
import type { ToastProps } from "./types";
import type { IconType } from "../mc-icon";
import { computed, onUnmounted, ref } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";

// options
defineOptions({ name: "McToast" });

// props
const props = withDefaults(defineProps<ToastProps>(), {
  type: "info",
  closable: true,
  autoClose: true,
  duration: void 0,
  hideIcon: false,
});

// emits
const emits = defineEmits<ToastEmits>();

// icon
const iconName = computed<IconType | undefined>(() => {
  if (props.hideIcon) return void 0;
  switch (props.type) {
    case "success":
      return "Accept_02";
    case "error":
      return "Error_04";
    case "warning":
      return "Error_02";
    case "info":
      return "Info_02";
    default:
      return void 0;
  }
});

// duration time
const durationTime = computed(() => props.duration || 5000);

// count down
const countDown = ref(Math.floor(durationTime.value / 1000));

// auto close
let countDownTimer: NodeJS.Timeout | null = null;
if (props.autoClose) {
  // count down
  countDownTimer = setInterval(() => {
    if (countDown.value > 0) {
      countDown.value--;
    } else {
      handleClose();
    }
  }, 1000);
}

// close
const handleClose = () => {
  clearTimer();
  emits("close");
};

// clear timer
const clearTimer = () => {
  if (countDownTimer) clearInterval(countDownTimer);
};

onUnmounted(() => {
  clearTimer();
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
