<template>
  <div class="mc-title-tool-bar" ref="_ref">
    <div class="mc-title-tool-bar-reset">
      <mc-reset :rotate="isRotate" @reset="handleReset" />
    </div>
    <div class="mc-title-tool-bar-line"></div>
    <div class="mc-title-tool-bar-mandatory">Mandatory</div>
  </div>
</template>

<script setup lang="ts">
import type { TitleToolBarEmits, TitleToolBarInstance } from "./types";
import { ref } from "vue";
import McReset from "../mc-reset/mc-reset.vue";
import { throttle } from "lodash-es";

// options
defineOptions({ name: "McTitleToolBar" });

// ref
const _ref = ref<HTMLDivElement>();

// emit
const emit = defineEmits<TitleToolBarEmits>();

// route
const isRotate = ref<boolean>(false);
// settimeout timer
let timer: number | undefined;

// reset
const handleReset = throttle(() => {
  clearTimeout(timer);
  isRotate.value = true;
  timer = setTimeout(() => {
    isRotate.value = false;
  }, 300) as unknown as number;
  emit("reset");
}, 300);

// expose
defineExpose<TitleToolBarInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-title-tool-bar.scss";
</style>
