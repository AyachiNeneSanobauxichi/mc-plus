<template>
  <div class="mc-tag" ref="_ref">Mc Tag</div>
</template>

<script setup lang="ts">
import type { TagEmits, TagInstance, TagProps } from "./types";
import { ref } from "vue";

// options
defineOptions({ name: "McTag" });

// props
const props = withDefaults(defineProps<TagProps>(), {
  size: "small",
  type: "basic",
  emphasis: "bold",
  disabled: false,
  deletable: true,
});

// emits
const emits = defineEmits<TagEmits>();

// ref
const _ref = ref<HTMLDivElement | void>();

// expose
defineExpose<TagInstance>({ ref: _ref });
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
