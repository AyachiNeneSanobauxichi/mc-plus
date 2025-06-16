<template>
  <div class="lightbox-container">
    <div>Visible: {{ visible }}</div>
    <mc-lightbox v-model="visible" title="McLightbox" size="large">
      <template #footer-desc>Please Check</template>
      <template #footer-left>
        <mc-button>Previous Step</mc-button>
      </template>
      <template #footer-right-button-group>
        <mc-button>Cancel</mc-button>
        <mc-button>Next Step</mc-button>
      </template>
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
  height: 300px;
  background-color: lightgreen;
}
</style>
