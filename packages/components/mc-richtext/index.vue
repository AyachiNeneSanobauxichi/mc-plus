<template>
  <div class="mc-richtext">
    <quill-editor theme="snow" :toolbar="toolbarOptions" />
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import { MC_RICHTEXT } from "./constant";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

// options
defineOptions({ name: MC_RICHTEXT });

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
