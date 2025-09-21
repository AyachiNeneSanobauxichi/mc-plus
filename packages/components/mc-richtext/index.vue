<template>
  <div class="mc-richtext">
    <editor-content :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import type { McRichtextEmits, McRichtextProps } from "./types";
import { watch } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { MC_RICHTEXT } from "./constant";

// options
defineOptions({ name: MC_RICHTEXT });

// props
const props = withDefaults(defineProps<McRichtextProps>(), {
  modelValue: "",
});

// emits
const emit = defineEmits<McRichtextEmits>();

// editor
const editor = useEditor({
  content: `${props.modelValue}`,
  extensions: [StarterKit],
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getHTML());
  },
});

// model value changed
watch(
  () => props.modelValue,
  (value) => {
    // async set content
    const _editor = editor.value;
    const currentContent = _editor?.getHTML();
    if (!_editor || currentContent === value) return;
    _editor.commands.setContent(value);
  }
);
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
