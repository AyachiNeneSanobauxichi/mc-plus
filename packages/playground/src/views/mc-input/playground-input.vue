<template>
  <div class="playground-input">
    <mc-input v-model="inputValue" :maxlength="10" prefix-icon="Search" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McInput from "../../../../components/mc-input/mc-input.vue";

const inputValue = ref("");
</script>

<style scoped lang="scss">
.playground-input {
  width: 100%;
  margin-top: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
