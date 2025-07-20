<template>
  <div class="mc-input-group">
    <div class="mc-input-group-prefix" :style="{ flex: prefixFlex }">
      <slot name="prefix">prefix</slot>
    </div>
    <div class="mc-input-group-divider"></div>
    <div class="mc-input-group-suffix" :style="{ flex: suffixFlex }">
      <slot name="suffix">suffix</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InputGroupContext, InputGroupProps } from "./types";
import { computed, provide } from "vue";
import { INPUT_GROUP_INJECTION_KEY, MC_INPUT_GROUP } from "./constant";

// options
defineOptions({ name: MC_INPUT_GROUP });

// props
const props = withDefaults(defineProps<InputGroupProps>(), {
  disabled: false,
  suffixFlex: 1,
  prefixFlex: 1,
});

// provide
provide<InputGroupContext>(INPUT_GROUP_INJECTION_KEY, {
  disabled: computed(() => props.disabled),
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
