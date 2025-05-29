<template>
  <div class="mc-input" :class="{ 'mc-input--disabled': disabled }">
    <slot name="pre">
      <span class="mc-input-icon" v-if="search"><mc-icon name="Search" /></span>
    </slot>
    <input
      ref="inputRef"
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
import type { InputEmits, InputProps } from "./types";
import { computed, ref } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";

// options
defineOptions({ name: "McInput", inheritAttrs: false });

// props
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",
  autofocus: false,
  clearable: false,
  disabled: false,
  placeholder: "Please enter",
  readonly: false,
  showPassword: false,
});

// emit
const emit = defineEmits<InputEmits>();

// input ref
const inputRef = ref<HTMLInputElement>();

// current value
const currentValue = ref<string>(props.modelValue);

// password visible
const passwordVisible = ref<boolean>(false);

// show clear
const showClear = computed(() => props.clearable && !!currentValue.value && isF)
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
