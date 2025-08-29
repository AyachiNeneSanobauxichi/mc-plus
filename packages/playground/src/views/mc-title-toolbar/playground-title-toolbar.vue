<template>
  <div class="playground-title-toolbar">
    <mc-title-toolbar :show-reset="true" :show-mandatory="true">
      <template #reset>刷新</template>
      <template #mandatory>必填</template>
    </mc-title-toolbar>
  </div>
</template>

<script setup lang="ts">
import McTitleToolbar from "../../../../components/mc-title-toolbar/mc-title-toolbar.vue";
</script>

<style scoped lang="scss"></style>
