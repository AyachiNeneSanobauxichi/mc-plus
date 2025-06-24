<template>
  <div class="mc-switch-label-wrapper">
    <template v-if="label || $slots.label">
      <slot name="label">
        <span class="mc-switch-label">{{ label }}</span>
      </slot>
    </template>
    <template v-if="helpText || $slots.help">
      <slot name="help">
        <div class="mc-switch-help">
          <mc-tooltip
            :icon-name="helpIcon"
            :content="helpText"
            :icon-size="22"
          />
        </div>
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { SwitchLabelProps } from "./types";
import McTooltip from "../mc-tooltip/mc-tooltip.vue";

// props
withDefaults(defineProps<SwitchLabelProps>(), {
  helpIcon: "Info",
});
</script>

<style scoped lang="scss">
@use "./styles/mc-switch-label.scss";
</style>
