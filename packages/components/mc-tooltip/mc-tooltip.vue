<template>
  <div class="mc-tooltip">
    <mc-popper :placement="placement" :show-arrow="showArrow">
      <slot>
        <mc-icon
          class="mc-tooltip-icon"
          :name="iconName"
          :size="iconSize"
        ></mc-icon>
      </slot>
      <template #content>
        <div class="mc-tooltip-content" :class="`mc-tooltip-content-${theme}`">
          <slot name="content">
            {{ content }}
          </slot>
        </div>
      </template>
    </mc-popper>
  </div>
</template>

<script setup lang="ts">
import type { TooltipProps } from "./types";
import McIcon from "../mc-icon/mc-icon.vue";
import McPopper from "../mc-popper/mc-popper.vue";

// options
defineOptions({ name: "McTooltip" });

// props
withDefaults(defineProps<TooltipProps>(), {
  iconName: "Info",
  theme: "light",
  placement: "top",
  showArrow: true,
  iconSize: 24,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
