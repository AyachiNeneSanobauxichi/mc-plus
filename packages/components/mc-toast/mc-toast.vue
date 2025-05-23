<template>
  <div ref="_ref" class="mc-toast" :class="[entering ? 'mc-toast--entering' : '', leaving ? 'mc-toast--leaving' : '']">
    <div class="mc-toast__header" :class="`mc-toast__header--${type}`">
      <div class="mc-toast__icon" v-if="icon">
        <mc-icon :name="icon"></mc-icon>
      </div>
      <div class="mc-toast__title">{{ title }}</div>
      <div class="mc-toast__close" v-if="showClose" @click="close">
        <mc-icon name="Cross"></mc-icon>
      </div>
    </div>
    <div class="mc-toast__body">
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
  type: "primary",
  message: "",
  title: "",
  showClose: true,
  duration: 0,
  position: "top",
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
