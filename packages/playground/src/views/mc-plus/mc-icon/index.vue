<template>
  <div class="playground-icon">
    <ul class="playground-icon-list">
      <li class="playground-icon-item" v-for="icon in iconList" :key="icon">
        <icon-card :icon="icon" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import IconCard from "./components/icon-card/index.vue";
import { useIcon } from "./hooks";

// icon list
const iconList = useIcon();
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;

.playground-icon {
  .playground-icon-list {
    @include mixin.reset-ul-style;
    @include mixin.flex-center(row, flex-start, flex-start, 16px);
    align-content: flex-start;
    flex-wrap: wrap;

    .playground-icon-item {
      @include mixin.reset-li-style;
    }
  }
}
</style>
