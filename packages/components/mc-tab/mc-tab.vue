<template>
  <div class="mc-tab"></div>
</template>

<script setup lang="ts">
import type { TabEmits, TabInstance } from "./types";
import { ref } from "vue";

// options
defineOptions({ name: "McTabItem" });

// emit
const emit = defineEmits<TabEmits>();

// ref
const _ref = ref<HTMLDivElement | void>();

// expose
defineExpose<TabInstance>();
</script>

<style scoped lang="scss">
@use "./styles/mc-tab.scss";
</style>
