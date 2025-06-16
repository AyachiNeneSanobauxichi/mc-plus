<template>
  <div class="alert-container">
    <mc-alert title="Mc Alert">
      <template #description>{{ "Description" }}</template>
    </mc-alert>
    <mc-button>Show Alert</mc-button>
  </div>
</template>

<script setup lang="ts">
import McAlert from "../../../components/mc-alert/mc-alert.vue";
import { McButton } from "mc-plus";
</script>

<style scoped lang="scss"></style>
