<template>
  <div class="mc-drawer-container" v-if="showDrawer">
    <teleport :to="portCssSelector">
      <transition name="mc-drawer-overlay">
        <mc-overlay
          :visible="showOverlay"
          :fixed="fixed"
          @click="handleOverlayClick"
        >
          <transition name="mc-drawer-content">
            <div
              class="mc-drawer"
              :class="[`mc-drawer-${size}`]"
              ref="_ref"
              v-if="showDrawerContent"
            >
              <div class="mc-drawer-header">
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
              <div class="mc-drawer-content-wrapper">
                <div class="mc-drawer-content">
                  <slot></slot>
                </div>
              </div>
              <div class="mc-drawer-footer" ref="footerRef" v-if="!hideFooter">
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
              </div>
            </div>
          </transition>
        </mc-overlay>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import type { DrawerEmits, DrawerInstance, DrawerProps } from "./types";
import { nextTick, ref, watch } from "vue";
import McOverlay from "../mc-overlay/mc-overlay.vue";
import McModalHeader from "../mc-modal-header/mc-modal-header.vue";
import McFooter from "../mc-footer/mc-footer.vue";
import useResizeObserver from "@mc-plus/hooks/useResizeObserver";

// options
defineOptions({ name: "McDrawer" });

// props
const props = withDefaults(defineProps<DrawerProps>(), {
  size: "medium",
  fixed: true,
  portCssSelector: "body",
  showBorder: true,
  maskClosable: true,
  hideFooter: false,
});

// show drawer
const showDrawer = ref<boolean>(false);
// show overlay
const showOverlay = ref<boolean>(false);
// show drawer content
const showDrawerContent = ref<boolean>(false);

// open
const open = async () => {
  showDrawer.value = true;
  showOverlay.value = true;
  await nextTick();
  showDrawerContent.value = true;
};

// close
const close = async () => {
  showDrawerContent.value = false;
  await nextTick();
  showOverlay.value = false;
  await nextTick();
  showDrawer.value = false;
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

// emits
const emits = defineEmits<DrawerEmits>();

// click  overlay
const handleOverlayClick = () => {
  if (!props.maskClosable) return;
  close();
};

// click close icon
const handleCloseIconClick = () => {
  close();
};

// refs
const _ref = ref<HTMLDivElement | undefined>();
const footerRef = ref<HTMLDivElement | undefined>();

// footer resize
useResizeObserver(footerRef, ({ height }) => {
  const drawer = _ref.value;
  if (!drawer) return;
  drawer.style.paddingBottom = `${height}px`;
});

// expose
defineExpose<DrawerInstance>({
  ref: _ref,
  open,
  close,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
