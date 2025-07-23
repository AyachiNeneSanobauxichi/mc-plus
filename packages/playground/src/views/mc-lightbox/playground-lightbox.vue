<template>
  <div class="playground-lightbox">
    <mc-lightbox v-model="visible" title="Mc Lightbox" size="large" hide-footer>
      <div class="lightbox-content"></div>
      <template v-if="showExtraContent">
        <div class="lightbox-extra-content"></div>
      </template>
    </mc-lightbox>
    <div class="tool-bar">
      <mc-button @click="handleChangeVisible">Change Visible</mc-button>
      <mc-button @click="handleAddContent">Add/Remove Content</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import McLightbox from "../../../../components/mc-lightbox/mc-lightbox.vue";
import { McButton } from "mc-plus";

const visible = ref<boolean>(false);

const showExtraContent = ref<boolean>(true);

const handleChangeVisible = () => {
  visible.value = !visible.value;
};

const handleAddContent = () => {
  showExtraContent.value = !showExtraContent.value;
};
</script>

<style scoped lang="scss">
.playground-lightbox {
  .tool-bar {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    z-index: 999999;
  }
}
.lightbox-content {
  width: 100%;
  height: 200px;
  background-color: pink;
}

.lightbox-extra-content {
  width: 100%;
  height: 1000px;
  background-color: lightblue;
}
</style>
