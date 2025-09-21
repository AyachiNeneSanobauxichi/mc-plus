<template>
  <div class="mc-richtext">
    <section class="mc-richtext-toolbar">
      <mc-richtext-tool
        :icons="[TOOL_ICON.BOLD, TOOL_ICON.ITALIC]"
        @click="handleStyleChange"
      />
      <mc-richtext-tool
        :icons="[TOOL_ICON.LIST, TOOL_ICON.ORDERED_LIST]"
        @click="handleStyleChange"
      />
      <mc-richtext-tool
        :icons="[TOOL_ICON.LINK, TOOL_ICON.IMAGE]"
        @click="handleStyleChange"
      />
    </section>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import type { McRichtextEmits, McRichtextProps } from "./types";
import type { IconType } from "../mc-icon";
import { watch } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import McRichtextTool from "./mc-richtext-tool.vue";
import { MC_RICHTEXT, TOOL_ICON } from "./constant";

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

// handle style change
const handleStyleChange = (icon: IconType) => {
  if (icon === TOOL_ICON.BOLD) {
    toggleBold();
  } else if (icon === TOOL_ICON.ITALIC) {
    toggleItalic();
  } else if (icon === TOOL_ICON.LIST) {
    toggleList();
  } else if (icon === TOOL_ICON.ORDERED_LIST) {
    toggleOrderedList();
  } else if (icon === TOOL_ICON.LINK) {
    attachLink();
  } else if (icon === TOOL_ICON.IMAGE) {
    attachImage();
  }
};

// toggle bold
const toggleBold = () => {
  editor.value?.commands.toggleBold();
};

// toggle italic
const toggleItalic = () => {
  editor.value?.commands.toggleItalic();
};

// toggle list
const toggleList = () => {
  editor.value?.commands.toggleList("bulletList", "listItem");
};

// toggle ordered list
const toggleOrderedList = () => {
  editor.value?.commands.toggleList("orderedList", "listItem");
};

// attach link
const attachLink = () => {
  const url = prompt("请输入链接地址:");
  if (url) {
    editor.value?.commands.setLink({ href: url });
  }
};

// attach image
const attachImage = () => {};
</script>

<style scoped lang="scss">
@use "./styles/mc-richtext.scss";
</style>
