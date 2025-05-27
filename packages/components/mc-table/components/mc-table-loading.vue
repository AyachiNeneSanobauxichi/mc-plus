<template>
  <div v-if="loading" class="mc-table__loading-wrapper" :class="['mc-table__loading-wrapper', loadingConfig?.customClass]" :style="loadingStyle">
    <div class="mc-table__loading-content">
      <!-- 自定义 loading 插槽 -->
      <slot name="loading" :loading="loading" :text="displayText">
        <div class="mc-table__loading-spinner">
          <!-- 默认旋转器 -->
          <div v-if="!loadingConfig?.spinner || loadingConfig.spinner === 'default'" class="mc-table__spinner mc-table__spinner--default">
            <div class="mc-table__spinner-dot"></div>
            <div class="mc-table__spinner-dot"></div>
            <div class="mc-table__spinner-dot"></div>
            <div class="mc-table__spinner-dot"></div>
          </div>

          <!-- 圆形旋转器 -->
          <div v-else-if="loadingConfig.spinner === 'circle'" class="mc-table__spinner mc-table__spinner--circle"></div>

          <!-- 脉冲旋转器 -->
          <div v-else-if="loadingConfig.spinner === 'pulse'" class="mc-table__spinner mc-table__spinner--pulse"></div>

          <!-- 自定义旋转器 -->
          <div v-else class="mc-table__spinner mc-table__spinner--custom" v-html="loadingConfig.spinner"></div>
        </div>

        <div v-if="displayText" class="mc-table__loading-text">
          {{ displayText }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { LoadingConfig } from "../types";

interface Props {
  loading?: boolean;
  loadingText?: string;
  loadingConfig?: LoadingConfig;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  loadingText: "Loading...",
});

const displayText = computed(() => {
  return props.loadingConfig?.text || props.loadingText;
});

const loadingStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.loadingConfig?.background) {
    style.backgroundColor = props.loadingConfig.background;
  }

  return style;
});
</script>

<style scoped lang="scss">
.mc-table__loading-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  backdrop-filter: blur(1px);
}

.mc-table__loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.mc-table__loading-text {
  color: var(--mc-gray-600);
  font-size: 14px;
  font-weight: 500;
}

.mc-table__spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 默认点状旋转器 */
.mc-table__spinner--default {
  gap: 4px;

  .mc-table__spinner-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--mc-purple-500);
    animation: mc-table-dot-pulse 1.4s ease-in-out infinite both;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
    &:nth-child(3) {
      animation-delay: 0s;
    }
    &:nth-child(4) {
      animation-delay: 0.16s;
    }
  }
}

/* 圆形旋转器 */
.mc-table__spinner--circle {
  width: 32px;
  height: 32px;
  border: 3px solid var(--mc-gray-200);
  border-top: 3px solid var(--mc-purple-500);
  border-radius: 50%;
  animation: mc-table-circle-spin 1s linear infinite;
}

/* 脉冲旋转器 */
.mc-table__spinner--pulse {
  width: 32px;
  height: 32px;
  background-color: var(--mc-purple-500);
  border-radius: 50%;
  animation: mc-table-pulse 1.5s ease-in-out infinite;
}

/* 动画定义 */
@keyframes mc-table-dot-pulse {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes mc-table-circle-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes mc-table-pulse {
  0%,
  100% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    transform: scale(1);
    opacity: 0.7;
  }
}

/* 暗色主题支持 */
@media (prefers-color-scheme: dark) {
  .mc-table__loading-wrapper {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .mc-table__loading-text {
    color: var(--mc-gray-300);
  }

  .mc-table__spinner--circle {
    border-color: var(--mc-gray-600);
    border-top-color: var(--mc-purple-300);
  }
}
</style>
