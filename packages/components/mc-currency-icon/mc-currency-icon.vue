<template>
  <div class="mc-currency-icon">
    <div class="mc-currency-icon-icon">
      <slot name="icon">Icon</slot>
    </div>
    <div class="mc-currency-icon-text">
      <slot name="desc">Desc</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CurrencyIconProps } from "./types";
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
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
