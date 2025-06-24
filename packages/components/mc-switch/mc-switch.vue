<template>
  <div class="mc-switch">
    <template v-if="isLeft">
      <mc-switch-label
        :label="label"
        :help-text="helpText"
        :help-icon="helpIcon"
      >
        <template #label v-if="$slots.label">
          <slot name="label"></slot>
        </template>
        <template #help v-if="$slots.help">
          <slot name="help"></slot>
        </template>
      </mc-switch-label>
    </template>
    <label
      class="mc-switch-wrapper"
      :class="[
        isActive ? 'mc-switch-actived' : 'mc-switch-inactive',
        { 'mc-switch-disabled': isDisabled },
        `mc-switch-${size}`,
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
    <template v-if="isRight">
      <mc-switch-label
        :label="label"
        :help-text="helpText"
        :help-icon="helpIcon"
      >
        <template #label v-if="$slots.label">
          <slot name="label"></slot>
        </template>
        <template #help v-if="$slots.help">
          <slot name="help"></slot>
        </template>
      </mc-switch-label>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { SwitchEmits, SwitchProps } from "./types";
import { computed, useSlots, watch } from "vue";
import McSwitchLabel from "./mc-switch-label.vue";
import { useFormDisabled, useFormItem } from "../mc-form/hooks";

// options
defineOptions({ name: "McSwitch" });

// props
const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
  size: "medium",
  helpIcon: "Info",
  labelPosition: "right",
});

// emits
const emits = defineEmits<SwitchEmits>();

// slots
const slots = useSlots();

// active
const isActive = computed(() => props.modelValue);

// click
const handleClick = () => {
  if (isDisabled.value) return;
  emits("update:modelValue", !props.modelValue);
  emits("change", !props.modelValue);
};

// label position
const labelPosition = computed(() => {
  if (!slots.label && !props.label && !slots.help && !props.helpText) {
    return void 0;
  } else {
    return props.labelPosition;
  }
});

// left
const isLeft = computed(() => labelPosition.value === "left");

// right
const isRight = computed(() => labelPosition.value === "right");

// form item
const { formItem } = useFormItem();

// form item disable
const isDisabled = useFormDisabled();

// model value changed
watch(
  () => props.modelValue,
  () => {
    formItem?.validate("change");
  }
);
</script>

<style scoped lang="scss">
@use "./styles//mc-switch.scss";
</style>
