<template>
  <div class="mc-alert-message" ref="_ref">Mc Alert Message</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type {
  AlertMessageEmits,
  AlertMessageInstance,
  AlertMessageProps,
} from "./types";

// options
defineOptions({ name: "McAlertMessage" });

// props
const props = withDefaults(defineProps<AlertMessageProps>(), {
  modelValue: true,
  type: "info",
  closable: false,
  expandable: false,
  hideIcon: false,
});

// emits
const emits = defineEmits<AlertMessageEmits>();

// ref
const _ref = ref<HTMLDivElement>();

// handle close
const handleClose = () => {};

// handle expand
const handleExpand = () => {};

// expose
defineExpose<AlertMessageInstance>({
  ref: _ref,
  close: handleClose,
  expand: handleExpand,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
