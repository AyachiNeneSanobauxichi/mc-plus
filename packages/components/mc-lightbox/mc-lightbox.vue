<template>
  <div class="mc-lightbox-container" v-if="showLightbox">
    <teleport :to="portCssSelector">
      <transition name="mc-lightbox-overlay">
        <mc-overlay
          :visible="showOverlay"
          :fixed="fixed"
          @click="handleOverlayClick"
        >
          <transition name="mc-lightbox-content">
            <div
              class="mc-lightbox"
              :class="[`mc-lightbox-${size}`]"
              ref="_ref"
              v-if="showLightboxContent"
            >
              <div class="mc-lightbox-content-wrapper">
                <div class="mc-lightbox-content">
                  <slot></slot>
                </div>
              </div>
            </div>
          </transition>
        </mc-overlay>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import type { LightboxEmits, LightboxProps } from "./types";
import { ref } from "vue";
import McOverlay from "../mc-overlay/mc-overlay.vue";

// options
defineOptions({ name: "McLightbox" });

// props
const props = withDefaults(defineProps<LightboxProps>(), {
  modelValue: false,
  size: "medium",
  maskClosable: true,
  fixed: true,
  portCssSelector: "body",
});

// emits
defineEmits<LightboxEmits>();

// refs
const _ref = ref<HTMLDivElement>();

// show lightbox
const showLightbox = ref<boolean>(true);
// show overlay
const showOverlay = ref<boolean>(true);
// show lightbox content
const showLightboxContent = ref<boolean>(true);

// click  overlay
const handleOverlayClick = () => {
  if (!props.maskClosable) return;
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
