<template>
  <div class="mc-reset" @click="handleClickReset">
    <mc-icon
      name="Refresh"
      :size="24"
      class="mc-reset-icon"
      :class="{ 'mc-reset-rotate': rotate }"
    />
    <span>Reset</span>
  </div>
</template>

<script setup lang="ts">
import McIcon from "../mc-icon/mc-icon.vue";
import type { ResetEmits, ResetProps } from "./types";

// options
defineOptions({ name: "mc-reset" });

// props
withDefaults(defineProps<ResetProps>(), {
  rotate: false,
});

// emit
const emit = defineEmits<ResetEmits>();

// click reset
const handleClickReset = () => {
  emit("reset");
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
