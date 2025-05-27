<template>
  <div class="mc-form-item">
    <label
      class="mc-form-item__label"
      :class="{ 'mc-form-item__label--required': required }"
      v-if="label"
    >
      {{ label }}
    </label>
    <div class="mc-form-item__content">
      <slot></slot>
    </div>
    <transition name="mc-form-item-error">
      <div class="mc-form-item__error" v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { FormItemProps } from "./types";
import { ref, provide } from "vue";
import { FORM_ITEM_CONTEXT_KEY } from "./constanst";

// options
defineOptions({
  name: "McFormItem",
});

// porps
defineProps<FormItemProps>();

// error message
const errorMessage = ref<string>("");

// handle validate
const handleValidate = (val?: string) => {
  console.log("validate: ", val);
  errorMessage.value = val ? "" : "This field is required";
};

// provide
provide(FORM_ITEM_CONTEXT_KEY, {
  validate: handleValidate,
});
</script>

<style scoped lang="scss">
@use "./styles/mc-form-item.scss";
</style>
