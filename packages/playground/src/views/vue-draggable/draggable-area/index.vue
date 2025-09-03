<template>
  <div class="draggable-area-container">
    <div class="draggable-title">{{ title }}</div>
    <vue-draggable
      class="draggable-area"
      :model-value="modelValue"
      :group="title"
      @update:modelValue="handleChange"
    >
      <div class="draggable-tag" v-for="tag in modelValue" :key="tag">
        {{ tag }}
      </div>
    </vue-draggable>
  </div>
</template>

<script setup lang="ts">
import type { DraggableAreaEmits, DraggableAreaProps } from "./types";
import { VueDraggable } from "vue-draggable-plus";

// options
defineOptions({ name: "DraggableArea" });

// props
defineProps<DraggableAreaProps>();

// emits
const emit = defineEmits<DraggableAreaEmits>();

// handle change
const handleChange = (newValue: any) => {
  emit("update:modelValue", newValue);
};
</script>

<style scoped lang="scss">
@use "@mc-plus/theme/mixins.scss" as mixin;

$border_color: var(--mc-gray-500);
$bg_color: var(--mc-purple-500);
$text_color: var(--mc-white);

.draggable-area-container {
  .draggable-area {
    width: 500px;
    min-height: 200px;
    padding: 16px;
    box-sizing: border-box;
    border: 1px solid $border_color;
    border-radius: 4px;

    .draggable-tag {
      width: fit-content;
      padding: 4px 8px;
      box-sizing: border-box;
      background-color: $bg_color;
      color: $text_color;
      cursor: move;
    }
  }
}
</style>
