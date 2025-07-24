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
              ref="lightboxRef"
              v-if="showLightboxContent"
            >
              <div class="mc-lightbox-header">
                <slot name="header">
                  <mc-modal-header
                    :title="title"
                    :show-border="showBorder"
                    @close="handleCloseIconClick"
                  >
                    <template #default>
                      <slot name="header-title"></slot>
                    </template>
                  </mc-modal-header>
                </slot>
              </div>
              <div class="mc-lightbox-content-wrapper" ref="wrapperRef">
                <div
                  class="mc-lightbox-content"
                  :style="{
                    minHeight: minHeight ? `${minHeight}px` : void 0,
                  }"
                  ref="contentRef"
                >
                  <slot></slot>
                </div>
              </div>
              <div class="mc-lightbox-footer" ref="footerRef">
                <template v-if="hideFooter">
                  <div class="mc-lightbox-bottom-padding"></div>
                </template>
                <template v-else>
                  <slot name="footer">
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
                  </slot>
                </template>
              </div>
            </div>
          </transition>
        </mc-overlay>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import type { LightboxEmits, LightboxInstance, LightboxProps } from "./types";
import { nextTick, ref, watch } from "vue";
import McOverlay from "../mc-overlay/mc-overlay.vue";
import McModalHeader from "../mc-modal-header/mc-modal-header.vue";
import McFooter from "../mc-footer/mc-footer.vue";
import useResizeObserver from "@mc-plus/hooks/useResizeObserver";
import useWindowResize from "@mc-plus/hooks/useWindowResize";

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
  showBorder: false,
  minHeight: undefined,
});

// emits
const emits = defineEmits<LightboxEmits>();

// refs
const lightboxRef = ref<HTMLDivElement>();
const footerRef = ref<HTMLDivElement>();
const wrapperRef = ref<HTMLDivElement>();
const contentRef = ref<HTMLDivElement>();

// show lightbox
const showLightbox = ref<boolean>(false);
// show overlay
const showOverlay = ref<boolean>(false);
// show lightbox content
const showLightboxContent = ref<boolean>(false);

// click  overlay
const handleOverlayClick = () => {
  if (!props.maskClosable) return;
  close();
};

// click close icon
const handleCloseIconClick = () => {
  close();
};

// open
const open = async () => {
  showLightbox.value = true;
  showOverlay.value = true;
  await nextTick();
  showLightboxContent.value = true;
};

// close
const close = async () => {
  showLightboxContent.value = false;
  await nextTick();
  showOverlay.value = false;
  await nextTick();
  showLightbox.value = false;
  emits("close");
  emits("update:modelValue", false);
};

// visible changed
watch(
  () => props.modelValue,
  (val, oldVal) => {
    if (!oldVal && val) {
      open();
    } else {
      close();
    }
  },
  {
    immediate: true,
    flush: "post",
  }
);

// set wrapper height
const setWrapperHeight = () => {
  if (!wrapperRef.value) return;
  const footerHeight = footerRef.value?.offsetHeight ?? 0;
  const maxHeight = window.innerHeight * 0.7 - 84 - footerHeight;
  const height = contentRef.value?.offsetHeight ?? 40;

  wrapperRef.value.style.height = `${
    height > maxHeight ? maxHeight : height
  }px`;
};

// window resize
useWindowResize(() => {
  setWrapperHeight();
});

// footer resize
useResizeObserver(footerRef, async ({ height }) => {
  const lightbox = lightboxRef.value;
  if (!lightbox) return;
  // set padding bootom
  lightbox.style.paddingBottom = `${height}px`;
  await nextTick();
  // set content height
  setWrapperHeight();
});

// content resize
useResizeObserver(contentRef, () => {
  setWrapperHeight();
});

// expose
defineExpose<LightboxInstance>({
  ref: lightboxRef,
  open,
  close,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
