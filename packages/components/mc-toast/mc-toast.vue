<!--
 * @Author: Tieju yang
 * @Date: 2025-05-21 09:34:05
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-23 17:50:45
-->
<template>
  <div ref="_ref" class="mc-toast" :class="[entering ? 'mc-toast--entering' : '', leaving ? 'mc-toast--leaving' : '']">
    <div class="mc-toast__header" :class="`mc-toast__header--${type}`">
      <mc-icon v-if="icon" class="mc-toast__icon" :name="icon" :size="24"></mc-icon>
      <div class="mc-toast__title">{{ title }}</div>
      <mc-icon name="Cross" class="mc-toast__close" :size="24" v-if="showClose" @click="close"></mc-icon>
    </div>
    <div class="mc-toast__body" :class="`mc-toast__body--${type}`">
      <div class="mc-toast__message">{{ message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";
import type { ToastEmits, ToastInstance, ToastProps } from "./types";

// options
defineOptions({
  name: "McToast",
});

// props
const props = withDefaults(defineProps<ToastProps>(), {
  type: "success",
  message: "",
  title: "",
  showClose: true,
  duration: 0,
});

// emits
const emit = defineEmits<ToastEmits>();

// refs
const _ref = ref<HTMLDivElement>();
const entering = ref(true);
const leaving = ref(false);

// timer
let timer: NodeJS.Timeout | null = null;

// methods
const close = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }

  leaving.value = true;
  setTimeout(() => {
    emit("close");
    if (props.onClose) props.onClose();
  }, 300);
};

// lifecycle
onMounted(() => {
  setTimeout(() => {
    entering.value = false;
  }, 20);

  if (props.duration > 0) {
    timer = setTimeout(() => {
      close();
    }, props.duration);
  }
});

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
});

// expose
defineExpose<ToastInstance>({
  ref: _ref,
  close,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
