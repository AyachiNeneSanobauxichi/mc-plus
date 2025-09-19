<template>
  <div class="mc-richtext">
    <div>
      <span>Content:</span>
      <span>{{ content }}</span>
    </div>
    <quill-editor
      v-model:content="content"
      theme="snow"
      toolbar="#my-toolbar"
      content-type="html"
      @selectionChange="onSelectionChange"
      @ready="onEditorReady"
    >
      <template #toolbar>
        <div id="my-toolbar">
          <div class="mc-richtext-toolbar">
            <div class="mc-richtext-toolbar-group">
              <div @click="toggleBold">加粗</div>
            </div>
          </div>
        </div>
      </template>
    </quill-editor>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import { MC_RICHTEXT } from "./constant";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

// options
defineOptions({ name: MC_RICHTEXT });

// content
const content = ref<string>("<p>Hello World</p>");
// quill
const quill = ref();

// on editor ready
const onEditorReady = (q: any) => {
  quill.value = q;
  console.log("quill: ", quill.value);
};

// format
let format: any = null;
// on selection change
const onSelectionChange = (range: any) => {
  console.log("range: ", range);
  if (range?.range) {
    format = quill.value.getFormat(range.range);
    console.log("format: ", format);
  }
};

// toggle bold
const toggleBold = () => {
  if (quill.value) {
    quill.value.format("bold", !format?.bold);
  }
};

// toolbar options
const toolbarOptions = [
  [{ header: 1 }, { header: 2 }],
  ["bold", "italic"],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ list: "bullet" }, { list: "ordered" }],
  ["link", "image"],
  ["clean"],
];
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
