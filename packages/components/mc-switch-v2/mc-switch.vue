<template>
  <label
    class="mc-switch"
    :class="[
      isActive ? 'mc-switch-actived' : 'mc-switch-inactive',
      { 'mc-switch-disabled': disabled },
    ]"
    :style="{ width, height }"
  >
    <input
      type="checkbox"
      class="mc-switch-input"
      :disabled="disabled"
      :value="modelValue"
      @change="handleClick"
    />
    <div class="mc-switch-inner">
      <template v-if="isActive">
        <slot name="active">
          <span class="mc-switch-inner-text">{{ activeText }}</span>
        </slot>
      </template>
      <template v-else>
        <slot name="inactive">
          <span class="mc-switch-inner-text">{{ inactiveText }}</span>
        </slot>
      </template>
    </div>
  </label>
</template>

<script setup lang="ts">
import type { SwitchEmits, SwitchProps } from "./types";
import { computed } from "vue";

// options
defineOptions({ name: "McSwitch" });

// props
const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
});

// emits
const emits = defineEmits<SwitchEmits>();

// active
const isActive = computed(() => props.modelValue);

// click
const handleClick = () => {
  if (props.disabled) return;
  emits("update:modelValue", !props.modelValue);
  emits("change", !props.modelValue);
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
