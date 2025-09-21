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
import McRichtext from "./../../../../../components/mc-richtext/index.vue";

const content = ref<string>("<p>I'm running Tiptap with Vue.js. 🎉</p>");
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;

.playground-richtext {
  @include mixin.flex-center(column, flex-start, flex-start, 32px);
}
</style>
