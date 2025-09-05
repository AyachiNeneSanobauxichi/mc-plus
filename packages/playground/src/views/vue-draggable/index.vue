<template>
  <div class="playground-draggable">
    <div class="tool-bar">
      <div>Vue Draggable plus</div>
      <div>students: {{ students }}</div>
      <div>classA: {{ classA }}</div>
      <div>classB: {{ classB }}</div>
    </div>
    <div class="vue-draggable-wrapper">
      <draggable-area
        v-model="students"
        group="school"
        title="Students"
      ></draggable-area>
      <draggable-area
        v-model="classA"
        group="school"
        title="Class A"
        removable
        @remove="handleRemove"
      ></draggable-area>
      <draggable-area
        v-model="classB"
        group="school"
        title="Class B"
        removable
        @remove="handleRemove"
      ></draggable-area>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DraggableArea from "./draggable-area/index.vue";

// all students
const students = ref<string[]>([
  "John",
  "Emma",
  "Michael",
  "Sophia",
  "William",
  "Olivia",
  "James",
  "Ava",
  "Alexander",
  "Isabella",
  "Daniel",
  "Mia",
  "David",
  "Charlotte",
  "Joseph",
  "Amelia",
  "Henry",
  "Harper",
  "Samuel",
  "Evelyn",
  "Benjamin",
  "Abigail",
  "Matthew",
  "Emily",
  "Andrew",
  "Elizabeth",
  "Christopher",
  "Sofia",
  "Joshua",
  "Victoria",
]);

// class a students
const classA = ref<string[]>([]);

// class b studnets
const classB = ref<string[]>([]);

// handle remove
const handleRemove = (tag: string) => {
  students.value.push(tag);
};
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
