<template>
  <div class="mc-switch-wrapper">
    <label
      ref="_ref"
      :class="[
        'mc-switch',
        {
          'is-active': modelValue,
          'is-disabled': disabled,
        },
      ]"
    >
      <input
        type="checkbox"
        class="mc-switch-input"
        :disabled="disabled"
        :value="modelValue"
        @change="toggleSwitch"
      />
      <span class="mc-switch-core" :style="{ width: width }">
        <span v-if="onText || offText" class="mc-switch-text">
          {{ modelValue ? onText : offText }}
        </span>
      </span>
      <span v-if="$slots.default || label" class="mc-switch-label">
        <slot>{{ label }}</slot>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import type { SwitchProps, SwitchEmits, SwitchInstance } from "./types";
import { ref, defineExpose } from "vue";

// options
defineOptions({ name: "McSwitch" });

// props
const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
});

// emits
const emit = defineEmits<SwitchEmits>();

// ref
const _ref = ref<HTMLLabelElement>();

/**
 * Toggle the switch state and emit the update event
 */
const toggleSwitch = () => {
  if (!props.disabled) {
    emit("update:modelValue", !props.modelValue);
  }
};

// expose
defineExpose<SwitchInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
