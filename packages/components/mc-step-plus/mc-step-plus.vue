<template>
  <div class="mc-step-plus">Mc Step Plus</div>
</template>

<script setup lang="ts">
import type { McStepPlusProps } from "./types";
import { MC_STEP_PLUS } from "./constant";
import { useStepItem } from "./hooks";
import { watchEffect } from "vue";

// options
defineOptions({ name: MC_STEP_PLUS });

// props
withDefaults(defineProps<McStepPlusProps>(), {
  modelValue: undefined,
});

// use step item
const { stepItems } = useStepItem();

watchEffect(() => {
  console.log("Step Items: ", stepItems.value);
});
</script>

<style scoped lang="scss">
@use "./styles/mc-step-plus.scss";
</style>
