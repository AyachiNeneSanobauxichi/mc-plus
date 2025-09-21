<template>
  <div class="playground-richtext">
    <section class="tool-bar">
      <span>Content: {{ content }}</span>
    </section>
    <section class="richtext-container">
      <mc-richtext v-model="content" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McRichtext from "@mc-plus/components/mc-richtext/mc-richtext.vue";
import { INIT_CONTENT } from "./constant";

const content = ref<string>(INIT_CONTENT);
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;

.playground-richtext {
  @include mixin.flex-center(column, flex-start, flex-start, 32px);
}
</style>
