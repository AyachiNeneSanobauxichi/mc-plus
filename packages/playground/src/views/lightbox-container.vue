<template>
  <div class="lightbox-container">
    <div>Visible: {{ visible }}</div>
    <mc-lightbox v-model="visible" title="McLightbox">
      <div class="light-box-content">Light Box</div>
    </mc-lightbox>
    <mc-button @click="handleChangeVisible">Change Visible</mc-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McLightbox from "../../../components/mc-lightbox/mc-lightbox.vue";
import { McButton } from "mc-plus";

const visible = ref<boolean>(false);
const handleChangeVisible = () => {
  visible.value = !visible.value;
};
</script>

<style scoped lang="scss">
.light-box-content {
  width: 100%;
  height: 800px;
  background-color: lightgreen;
}
</style>
