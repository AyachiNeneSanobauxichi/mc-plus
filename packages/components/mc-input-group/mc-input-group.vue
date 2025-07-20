<template>
  <div class="mc-input-group">Input Group</div>
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
});

// provide
provide<InputGroupContext>(INPUT_GROUP_INJECTION_KEY, {
  disabled: computed(() => props.disabled),
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
