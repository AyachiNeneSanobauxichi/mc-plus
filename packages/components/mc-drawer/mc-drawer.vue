<template>
  <transition name="mc-drawer-overlay">
    <mc-overlay :visible="showOverlay" @click="handleOverlayClick">
      <div class="mc-drawer" :class="[`mc-drawer-${size}`]">
        <div class="mc-drawer-header">
          <mc-modal-header :title="title" @close="handleCloseIconClick" />
        </div>
        <div class="mc-drawer-content-wrapper">
          <div class="mc-drawer-content">
            <slot></slot>
          </div>
        </div>
        <div class="mc-drawer-footer">
          <mc-footer>
            <template #left>
              <slot name="footer-left">
                <template v-if="!leftButton?.hidden">
                  <mc-button
                    type="plain"
                    class="mc-drawer-button"
                    :left-icon="leftButton?.leftIcon"
                    :right-icon="leftButton?.rightIcon"
                    :disabled="leftButton?.disable"
                  >
                    {{ leftButton?.text }}
                  </mc-button>
                </template>
              </slot>
            </template>
            <template #right-button-group>
              <slot name="footer-right">
                <template v-if="!cancel?.hidden">
                  <mc-button
                    type="link"
                    width="58px"
                    :left-icon="cancel?.leftIcon"
                    :right-icon="cancel?.rightIcon"
                    :disabled="cancel?.disable"
                  >
                    {{ cancel?.text || "Cancel" }}
                  </mc-button>
                </template>
                <template v-if="!middleButton?.hidden">
                  <mc-button
                    type="plain"
                    class="mc-drawer-button"
                    :left-icon="middleButton?.leftIcon"
                    :right-icon="middleButton?.rightIcon"
                    :disabled="middleButton?.disable"
                  >
                    {{ middleButton?.text }}
                  </mc-button>
                </template>
                <template v-if="!rightButton?.hidden">
                  <mc-button
                    type="primary"
                    class="mc-drawer-button"
                    :left-icon="rightButton?.leftIcon"
                    :right-icon="rightButton?.rightIcon"
                    :disabled="rightButton?.disable"
                  >
                    {{ rightButton?.text }}
                  </mc-button>
                </template>
              </slot>
            </template>
          </mc-footer>
        </div>
      </div>
    </mc-overlay>
  </transition>
</template>

<script setup lang="ts">
import type { DrawerEmits, DrawerProps } from "./types";
import { nextTick, ref, watch } from "vue";
import McOverlay from "../mc-overlay/mc-overlay.vue";
import McModalHeader from "../mc-modal-header/mc-modal-header.vue";
import McFooter from "../mc-footer/mc-footer.vue";
import McButton from "../mc-button/mc-button.vue";

// options
defineOptions({ name: "McDrawer" });

// props
const props = withDefaults(defineProps<DrawerProps>(), {
  size: "medium",
  clickOverlayClose: true,
});

// show overlay
const showOverlay = ref<boolean>(false);

// show drawer
const showDrawer = ref<boolean>(false);

// open
const open = async () => {
  showOverlay.value = true;
  await nextTick();
  showDrawer.value = true;
  console.log("Open: ", showOverlay.value, showDrawer.value);
};

// close
const close = async () => {
  showDrawer.value = false;
  await nextTick();
  showOverlay.value = false;
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

// emit
const emit = defineEmits<DrawerEmits>();

// click  overlay
const handleOverlayClick = () => {
  if (!props.clickOverlayClose) return;
  emit("close");
  emit("update:modelValue", false);
};

// click close icon
const handleCloseIconClick = () => {
  emit("close");
  emit("update:modelValue", false);
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
