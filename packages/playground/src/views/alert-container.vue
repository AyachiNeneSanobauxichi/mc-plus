<template>
  <div class="alert-container">
    <mc-alert title="Mc Alert Tile" type="warning">
      <template #title> {{ "TitleTitleTitleTitleTitleTitleTitle" }}</template>
      <template #description>{{ "11111111111111111111111111" }}</template>
    </mc-alert>
    <mc-button>Show Alert</mc-button>
  </div>
</template>

<script setup lang="ts">
import McAlert from "../../../components/mc-alert/mc-alert.vue";
import { McButton } from "mc-plus";
</script>

<style scoped lang="scss"></style>
