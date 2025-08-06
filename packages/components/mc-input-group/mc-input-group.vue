<template>
  <div
    :id="formId"
    class="mc-input-group"
    :class="{ 'mc-input-group-disabled': formDisabled }"
  >
    <div
      class="mc-input-group-prefix"
      :class="{
        'mc-input-group-prefix-expanded': isExpanded,
        'mc-input-group-prefix-actived': isPrefixActived,
        'mc-input-group-prefix-error': isError,
      }"
      :style="{ flex: prefixFlex }"
    >
      <slot name="prefix"></slot>
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
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InputGroupContext, InputGroupProps } from "./types";
import { computed, provide } from "vue";
import { useFormItem } from "../mc-form/hooks";
import { INPUT_GROUP_INJECTION_KEY, MC_INPUT_GROUP } from "./constant";
import { useStatus } from "./hooks";

// options
defineOptions({ name: MC_INPUT_GROUP });

// props
withDefaults(defineProps<InputGroupProps>(), {
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

// use form item hook
const { formId, formDisabled } = useFormItem();

// show divider
const showDivider = computed<boolean>(
  () =>
    (!isPrefixActived.value && !isSuffixActived.value && !isExpanded.value) ||
    formDisabled.value
);

// provide
provide<InputGroupContext>(INPUT_GROUP_INJECTION_KEY, {
  disabled: formDisabled,
  setInputGroupExpanded,
  setInputGroupValidate,
  setInputGroupActived,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
