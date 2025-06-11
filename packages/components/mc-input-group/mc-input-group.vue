<template>
  <div class="mc-input-group">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  useSlots,
  watchEffect,
  provide,
  type VNode,
  type Component,
} from "vue";
import type { InputGroupAffix } from "./types";
import { INPUT_GROUP_INJECTION_KEY } from "./constant";

// slots
const slots = useSlots();

// group
const group = reactive<{
  select: InputGroupAffix;
  input: InputGroupAffix;
}>({
  select: void 0,
  input: void 0,
});

// slots changed
watchEffect(() => {
  const content = slots?.default?.();
  if (!content) return;
  const [fistNode, secNode] = content as VNode[];
  if (
    (fistNode?.type as Component)?.name === "McInput" &&
    (secNode?.type as Component)?.name === "McSelect"
  ) {
    group.input = "prefix";
    group.select = "suffix";
  }
  if (
    (fistNode?.type as Component)?.name === "McSelect" &&
    (secNode?.type as Component)?.name === "McInput"
  ) {
    group.input = "suffix";
    group.select = "prefix";
  }
});

// provide
provide(INPUT_GROUP_INJECTION_KEY, {
  ...group,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
