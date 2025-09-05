<template>
  <div class="playground-title-toolbar">
    <mc-title-tool-bar :show-reset="true" :show-mandatory="true">
      <template #reset>刷新</template>
      <template #mandatory>必填</template>
    </mc-title-tool-bar>
  </div>
</template>

<script setup lang="ts">
import { McTitleToolBar } from "mc-plus";
</script>
