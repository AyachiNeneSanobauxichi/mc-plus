<template>
  <div class="playground-draggable">
    <div class="tool-bar">
      <div>Vue Draggable plus</div>
      <div>students: {{ students }}</div>
      <div>classA: {{ classA }}</div>
      <div>classB: {{ classB }}</div>
    </div>
    <div class="vue-draggable-wrapper">
      <draggable-area title="Students" v-model="students"></draggable-area>
      <draggable-area title="Class A" v-model="classA"></draggable-area>
      <draggable-area title="Class B" v-model="classB"></draggable-area>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DraggableArea from "./draggable-area/index.vue";
const students = ref<string[]>([
  "Hirasawa Yui",
  "Nakano Azusa",
  "Akiyama Mio",
  "Tainaka Ritsu",
  "Kotobuku Tsumugi",
]);

const classA = ref<string[]>([]);

const classB = ref<string[]>([]);
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;

.playground-draggable {
  @include mixin.flex-center(column, flex-start, flex-start, 8px);

  .vue-draggable-wrapper {
    @include mixin.flex-center(row, flex-start, flex-start, 40px);
  }
}
</style>
