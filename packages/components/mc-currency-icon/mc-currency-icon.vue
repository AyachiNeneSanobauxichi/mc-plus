<template>
  <div
    class="mc-currency-icon"
    :style="{ width: style.width, height: style.height }"
  >
    <div class="mc-currency-icon-img-wrapper">
      <slot name="icon">
        <img
          :src="generateFileUrl(currency)"
          class="mc-currency-icon-img"
          :alt="`${currency}-icon`"
        />
      </slot>
    </div>
    <div
      class="mc-currency-icon-content"
      :class="[`mc-currency-icon-content-${direction}`]"
    >
      <div class="mc-currency-icon-label">
        <slot>
          <span>{{ currency }}</span>
        </slot>
      </div>
      <div class="mc-currency-icon-text">
        <slot name="desc">
          <span>{{ desc }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CurrencyIconProps } from "./types";
import { computed } from "vue";
import { useCDNPath } from "@mc-plus/hooks";

// options
defineOptions({ name: "McCurrencyIcon" });

// props
const props = withDefaults(defineProps<CurrencyIconProps>(), {
  direction: "horizontal",
  suffix: "svg",
});

// use cdn path hook
const { generateFileUrl } = useCDNPath(props.cdnUrl, props.suffix);

// style
const style = computed(() => {
  return {
    height:
      typeof props.height === "number" ? `${props.height}px` : props.height,
    width: typeof props.width === "number" ? `${props.width}px` : props.width,
  };
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
