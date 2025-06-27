<template>
  <div class="mc-button-playground">
    <div class="mc-button-group-container">
      <div class="mc-button-group">
        <mc-button
          :disabled="disabled"
          :loading="loading"
          size="medium"
          @click="handleClick"
        >
          Primary
        </mc-button>
        <mc-button
          :disabled="disabled"
          :loading="loading"
          type="plain"
          size="medium"
          @click="handleClick"
        >
          Plain
        </mc-button>
        <mc-button
          :disabled="disabled"
          :loading="loading"
          type="link"
          size="medium"
          @click="handleClick"
        >
          Link
        </mc-button>
      </div>
      <div class="mc-button-group">
        <mc-button
          :disabled="disabled"
          :loading="loading"
          size="small"
          @click="handleClick"
        >
          Primary
        </mc-button>
        <mc-button
          :disabled="disabled"
          :loading="loading"
          type="plain"
          size="small"
          @click="handleClick"
        >
          Plain
        </mc-button>
        <mc-button
          :disabled="disabled"
          :loading="loading"
          type="link"
          size="small"
          @click="handleClick"
        >
          Link
        </mc-button>
      </div>
    </div>
    <div class="tool-bar">
      <mc-button @click="handleDisable">Disable</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import McButton from "../../../../components/mc-button/mc-button.vue";
import { ref } from "vue";

const disabled = ref<boolean>(false);

const loading = ref<boolean>(false);

const handleDisable = () => {
  disabled.value = !disabled.value;
};

const handleClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};
</script>

<style scoped lang="scss">
.mc-button-group-container {
  display: flex;
  flex-direction: column;
  gap: 32px;

  .mc-button-group {
    display: flex;
    align-items: center;
    gap: 32px;
  }
}

.tool-bar {
  position: absolute;
  left: 0;
  bottom: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
