<template>
  <div>
    <p>isError: {{ isError }}</p>
    <p>isExpanded: {{ isExpanded }}</p>
    <p>isPrefixActived: {{ isPrefixActived }}</p>
    <p>isSuffixActived: {{ isSuffixActived }}</p>
  </div>
  <div class="mc-input-group">
    <div
      class="mc-input-group-prefix"
      :class="{
        'mc-input-group-prefix-expanded': isExpanded,
        'mc-input-group-prefix-actived': isPrefixActived,
        'mc-input-group-prefix-error': isError,
      }"
      :style="{ flex: prefixFlex }"
    >
      <slot name="prefix">prefix</slot>
    </div>
    <div class="mc-input-group-divider" v-if="showDivider"></div>
    <div
      class="mc-input-group-suffix"
      :class="{
        'mc-input-group-suffix-expanded': isExpanded,
        'mc-input-group-suffix-actived': isSuffixActived,
        'mc-input-group-suffix-error': isError,
      }"
      :style="{ flex: suffixFlex }"
    >
      <slot name="suffix">suffix</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InputGroupContext, InputGroupProps } from "./types";
import { computed, provide } from "vue";
import { INPUT_GROUP_INJECTION_KEY, MC_INPUT_GROUP } from "./constant";
import { useStatus } from "./hooks";

// options
defineOptions({ name: MC_INPUT_GROUP });

// props
const props = withDefaults(defineProps<InputGroupProps>(), {
  disabled: false,
  suffixFlex: 1,
  prefixFlex: 1,
});

// use status
const {
  isError,
  isExpanded,
  isPrefixActived,
  isSuffixActived,
  setInputGroupValidate,
  setInputGroupExpanded,
  setInputGroupActived,
} = useStatus();

// show divider
const showDivider = computed<boolean>(
  () => !isPrefixActived.value && !isSuffixActived.value && !isExpanded.value
);

// provide
provide<InputGroupContext>(INPUT_GROUP_INJECTION_KEY, {
  disabled: computed(() => props.disabled),
  setInputGroupExpanded,
  setInputGroupValidate,
  setInputGroupActived,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
