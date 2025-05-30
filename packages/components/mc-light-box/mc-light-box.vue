<!--
 * @Author: Tieju yang
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-01-27 10:00:00
-->
<template>
  <teleport to="body">
    <transition name="mc-lightbox-fade">
      <div v-if="modelValue" class="mc-lightbox-overlay" @click.self="handleOverlayClick">
        <div ref="_ref" class="mc-lightbox" :class="[entering ? 'mc-lightbox--entering' : '', leaving ? 'mc-lightbox--leaving' : '', `mc-lightbox--${size}`, `mc-lightbox--${position}`]" :style="lightboxStyle">
          <div class="mc-lightbox__header">
            <div class="mc-lightbox__header-title">
              <div v-if="title" class="mc-lightbox__header-title-text">{{ title }}</div>
            </div>
            <mc-icon name="Cross" class="mc-lightbox__close" :size="32" v-if="showClose" @click="close" />
          </div>

          <div class="mc-lightbox__body">
            <div class="mc-lightbox__content">
              <div v-if="content">{{ content }}</div>
              <slot v-else name="content"></slot>
            </div>
          </div>

          <div v-if="$slots.footer" class="mc-lightbox__footer">
            <slot name="footer"></slot>
          </div>
          <div v-else class="mc-lightbox-footer-placeholder"></div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import McIcon from "../mc-icon/mc-icon.vue";
import type { LightboxEmits, LightboxInstance, LightboxProps } from "./types";

// options
defineOptions({
  name: "McLightBox",
});

// 尺寸映射
const sizesMap = {
  small: {
    width: "430px",
    height: "512px",
  },
  medium: {
    width: "800px",
    height: "512px",
  },
  large: {
    width: "1024px",
    height: "700px",
  },
} as const;

// props
const props = withDefaults(defineProps<LightboxProps>(), {
  modelValue: false,
  title: "",
  content: "",
  showClose: true,
  size: "medium",
  position: "center",
  maskClosable: true,
});

// emits
const emit = defineEmits<LightboxEmits>();

// refs
const _ref = ref<HTMLDivElement>();
const entering = ref(false);
const leaving = ref(false);

// computed
const lightboxStyle = computed(() => {
  const sizeConfig = sizesMap[props.size];
  return {
    width: sizeConfig.width,
    height: sizeConfig.height,
  };
});

// methods
const close = () => {
  leaving.value = true;
  setTimeout(() => {
    emit("update:modelValue", false);
    emit("close");
    if (props.onClose) props.onClose();
    leaving.value = false;
  }, 300);
};

const handleOverlayClick = () => {
  if (props.showClose && props.maskClosable) {
    close();
  }
};

// watch modelValue changes for animations
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      entering.value = true;
      setTimeout(() => {
        entering.value = false;
      }, 20);
    }
  }
);

// expose
defineExpose<LightboxInstance>({
  ref: _ref,
  close,
});
</script>

<style scoped lang="scss">
@use "./index.scss";

.mc-lightbox-fade-enter-active,
.mc-lightbox-fade-leave-active {
  transition: opacity 0.3s ease;
}

.mc-lightbox-fade-enter-from,
.mc-lightbox-fade-leave-to {
  opacity: 0;
}
</style>
