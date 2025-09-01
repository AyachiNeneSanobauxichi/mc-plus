<template>
  <div class="playground-title">
    <mc-title
      title="Mc Title"
      show-tool-bar
      @reset="handleReset"
    >
      <template #reset> 刷新 </template>
      <template #mandatory> 必填 </template>
    </mc-title>
  </div>
</template>

<script setup lang="ts">
import McTitle from "../../../../components/mc-title/mc-title.vue";

const handleReset = () => {
  console.log("Rest");
};
</script>

<style scoped lang="scss"></style>
