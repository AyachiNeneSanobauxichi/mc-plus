<template>
  <div class="playground-lightbox">
    <mc-lightbox
      v-model="visible"
      title="Mc Lightbox"
      size="large"
      :min-height="300"
    ></mc-lightbox>
    <div class="tool-bar">
      <mc-button @click="handleChangeVisible">Change Visible</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McLightbox from "../../../../components/mc-lightbox/mc-lightbox.vue";
import { McButton } from "mc-plus";

const visible = ref<boolean>(false);

const handleChangeVisible = () => {
  visible.value = !visible.value;
};
</script>

<style scoped lang="scss">
.playground-lightbox {
  .tool-bar {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 320px;
  }
}
</style>
