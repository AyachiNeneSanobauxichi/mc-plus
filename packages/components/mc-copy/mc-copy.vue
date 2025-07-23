<template>
  <div class="mc-copy">
    <slot>
      <span class="mc-copy-text">{{ text }}</span>
    </slot>
    <mc-icon name="Duplicate" class="mc-copy-icon" @click="handleCopy" />
  </div>
</template>

<script setup lang="ts">
import type { CopyEmits, CopyProps } from "./types";
import McIcon from "../mc-icon/mc-icon.vue";
import { toast } from "../mc-toast";

// options
defineOptions({ name: "McCopy" });

// props
const props = withDefaults(defineProps<CopyProps>(), {
  showToast: false,
  toastSuccessText: "copy succeed",
  toastErrorText: "copy failed",
  manual: false,
});

// emits
const emit = defineEmits<CopyEmits>();

// methods
const handleCopy = async () => {
  if (!props.text) return;
  if (props.manual) {
    emit("copy", props.text);
  } else {
    try {
      await navigator.clipboard.writeText(props.text);
      emit("success", props.text);
      if (props.showToast) {
        toast.success(props.toastSuccessText);
      }
    } catch (err) {
      console.error(err);
      emit("error", props.text, err as Error);
      if (props.showToast) {
        toast.error(props.toastErrorText);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
