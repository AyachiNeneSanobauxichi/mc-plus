<template>
  <div class="icon-card">
    <mc-icon class="icon-card-icon" :name="icon" />
    <p class="icon-card-name">{{ icon }}</p>
    <div class="icon-card-cover">
      <mc-icon
        class="icon-card-cover-copy"
        name="Duplicate"
        :size="32"
        @click="handleCopy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IconCardProps } from "./types";
import { throttle } from "lodash-es";
import { McIcon, toast } from "mc-plus";

// options
defineOptions({ name: "IconCard" });

// props
const props = defineProps<IconCardProps>();

// handle copy
const handleCopy = throttle(async () => {
  if (!props.icon) return;
  await navigator.clipboard.writeText(props.icon);
  toast.success(`icon "${props.icon}" copy succeed`);
}, 1500);
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;

$copy_color: var(--mc-gray-100);
$name_color: var(--mc-gray-800);

.icon-card {
  @include mixin.flex-center($direction: column, $gap: 8px);
  width: 102px;
  height: 139px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;

  &:hover {
    @include mixin.shadow;
    .icon-card-cover {
      transform: scaleY(1);
    }
  }

  .icon-card-cover {
    @include mixin.flex-center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    transform-origin: bottom center;
    transform: scaleY(0);
    transition: transform 0.3s ease-in-out;
    background-color: rgba(0, 0, 0, 0.5);

    .icon-card-cover-copy {
      color: $copy_color;
      transition: transform 0.3s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .icon-card-name {
    @include mixin.reset-p-style;
    @include mixin.font-style($size: 12px, $color: $name_color);
    text-align: center;
    width: 100%;
    word-break: break-all;
  }
}
</style>
