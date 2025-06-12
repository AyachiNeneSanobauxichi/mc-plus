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
              <div class="mc-lightbox-header">
                <mc-modal-header :title="title" @close="handleCloseIconClick">
                  <template #default>
                    <slot name="header-title"></slot>
                  </template>
                </mc-modal-header>
              </div>
              <div class="mc-lightbox-content-wrapper">
                <div class="mc-lightbox-content">
                  <slot></slot>
                </div>
              </div>
              <div class="mc-drawer-footer" ref="footerRef" v-if="!hideFooter">
                <mc-footer>
                  <template #left>
                    <slot name="footer-left"></slot>
                  </template>
                  <template #right>
                    <slot name="footer-right"></slot>
                  </template>
                  <template #right-button-group>
                    <slot name="footer-right-button-group"></slot>
                  </template>
                  <template #desc>
                    <slot name="footer-desc"></slot>
                  </template>
                </mc-footer>
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
import McModalHeader from "../mc-modal-header/mc-modal-header.vue";
import McFooter from "../mc-footer/mc-footer.vue";
import useResizeObserver from "@mc-plus/hooks/useResizeObserver";

// options
defineOptions({ name: "McLightbox" });

// props
const props = withDefaults(defineProps<LightboxProps>(), {
  modelValue: false,
  size: "medium",
  maskClosable: true,
  fixed: true,
  portCssSelector: "body",
  hideFooter: false,
});

// emits
defineEmits<LightboxEmits>();

// refs
const _ref = ref<HTMLDivElement>();
const footerRef = ref<HTMLDivElement>();

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

// click close icon
const handleCloseIconClick = () => {};

// footer resize
useResizeObserver(footerRef, ({ height }) => {
  const lightbox = _ref.value;
  if (!lightbox) return;
  lightbox.style.paddingBottom = `${height}px`;
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
