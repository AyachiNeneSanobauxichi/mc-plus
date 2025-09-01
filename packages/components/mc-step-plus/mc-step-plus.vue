<template>
  <div class="mc-step-plus">Mc Step Plus</div>
</template>

<script setup lang="ts">
import type { McStepPlusProps, McStepItemPlusProps } from "./types";
import { ref } from "vue";
import { MC_STEP_PLUS } from "./constant";

// options
defineOptions({ name: MC_STEP_PLUS });

// props
withDefaults(defineProps<McStepPlusProps>(), {
  modelValue: undefined,
});

// step items
const stepItems = ref<McStepItemPlusProps[]>([]);
</script>

<style scoped lang="scss">
@use "./styles/mc-step-plus.scss";
</style>
