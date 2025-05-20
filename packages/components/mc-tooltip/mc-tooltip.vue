<template>
  <div class="mc-tooltip"></div>
</template>

<script setup lang="ts">
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./types";
import { ref } from "vue";

// options
defineOptions({
  name: "McTooltip",
});

// props
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom",
  trigger: "hover",
  transition: "fade",
  showTimeout: 0,
  hideTimeout: 200,
});

// emits
const emit = defineEmits<TooltipEmits>();

// visible
const visible = ref(false);
// events
const events = ref<Record<string, EventListener>>({});
const outerEvents = ref<Record<string, EventListener>>({});
const dropdownEvents = ref<Record<string, EventListener>>({});

// expose
defineExpose<TooltipInstance>({
  show: () => {},
  hide: () => {},
});
</script>

<style scoped lang="scss"></style>
