<template>
  <div class="mc-reset" @click="handleClickReset">
    <mc-icon
      name="Refresh"
      :size="24"
      class="mc-reset-icon"
      :class="{ 'mc-reset-rotate': isRotate }"
    />
    <span><slot>Reset</slot></span>
  </div>
</template>

<script setup lang="ts">
import type { ResetEmits, ResetProps } from "./types";
import { computed, ref } from "vue";
import { delay } from "@mc-plus/utils";
import McIcon from "../mc-icon/mc-icon.vue";

// options
defineOptions({ name: "mc-reset" });

// props
const props = withDefaults(defineProps<ResetProps>(), {
  rotate: false,
  autoRotate: true,
  duration: 300,
});

// emit
const emit = defineEmits<ResetEmits>();

// route control
const _rotate = ref<boolean>(false);

// is rotate
const isRotate = computed(() => {
  if (props.autoRotate) {
    return _rotate.value;
  }
  return props.rotate;
});

// click reset
const handleClickReset = async () => {
  emit("reset");
  if (props.autoRotate) {
    _rotate.value = true;
    await delay(props.duration);
    _rotate.value = false;
  }
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
