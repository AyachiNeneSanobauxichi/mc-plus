<template>
  <div class="mc-modal-header">
    <mc-title
      :title="title"
      :show-border="showBorder"
      height="100%"
      class="mc-modal-header-title"
    >
      <slot></slot>
      <template #tool-bar>
        <mc-icon
          name="Cross"
          :size="24"
          class="mc-modal-header-close-icon"
          @click="emit('close')"
        />
      </template>
    </mc-title>
  </div>
</template>

<script setup lang="ts">
import type { ModalHeaderEmits, ModalHeaderProps } from "./types";
import McIcon from "../mc-icon/mc-icon.vue";
import McTitle from "../mc-title/mc-title.vue";

// options
defineOptions({ name: "McModalHeader" });

// props
withDefaults(defineProps<ModalHeaderProps>(), {
  showClose: true,
  showBorder: true,
});

// emit
const emit = defineEmits<ModalHeaderEmits>();
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
