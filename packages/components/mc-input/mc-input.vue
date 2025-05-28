<template>
  <div class="mc-input" :class="{ 'mc-input--disabled': disabled }">
    <slot name="pre">
      <span class="mc-input-icon" v-if="search"><mc-icon name="Search" /></span>
    </slot>
    <input
      class="mc-input__inner"
      :type="isHidden && password ? 'password' : 'text'"
      v-model="innerValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input.stop="handleInput"
      @focus.stop="(e) => emit('focus', e)"
      @blur.stop="(e) => emit('blur', e)"
    />
    <slot class="post">
      <span class="mc-input-icon mc-input-icon-eye" v-if="password">
        <mc-icon
          :name="!isHidden ? 'Review' : 'Review-Hidden'"
          @click="isHidden = !isHidden"
        />
      </span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { InputProps, InputEmits } from "./types";
import McIcon from "../mc-icon/mc-icon.vue";
import { ref, watch, inject } from "vue";

// options
defineOptions({ name: "McInput" });

// props
const props = withDefaults(defineProps<InputProps>(), {
  placeholder: "Please input",
});

// emit
const emit = defineEmits<InputEmits>();

// inner value
const innerValue = ref<string | undefined>(props.modelValue ?? "");

watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
    emit("change", newValue);
  }
);

// hidden value
const isHidden = ref<boolean>(false);

// input
const handleInput = () => {
  emit("update:modelValue", innerValue.value);
  emit("input", innerValue.value);
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
