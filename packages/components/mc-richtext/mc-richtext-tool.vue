<template>
  <div class="mc-richtext-tool">
    <mc-icon
      v-for="icon in icons"
      class="mc-richtext-tool-icon"
      :key="icon"
      :name="icon"
      @click="handleIconClick(icon)"
    />
  </div>
</template>

<script setup lang="ts">
import type { McRichTextToolEmits, McRichtextToolProps } from "./types";
import type { IconType } from "../mc-icon";
import McIcon from "../mc-icon/mc-icon.vue";
import { MC_RICHTEXT_TOOL } from "./constant";

// options
defineOptions({ name: MC_RICHTEXT_TOOL });

// props
withDefaults(defineProps<McRichtextToolProps>(), {
  icons: () => [],
});

// emits
const emit = defineEmits<McRichTextToolEmits>();

// click icon
const handleIconClick = (icon: IconType) => {
  emit("click", icon);
};
</script>

<style scoped lang="scss">
@use "./styles/mc-richtext-tool.scss";
</style>
