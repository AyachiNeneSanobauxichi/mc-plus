<template>
  <section
    class="mc-footer"
    :class="{ 'mc-footer-border': showborder }"
    :style="{ width: width, height: height }"
    ref="_ref"
  >
    <div class="mc-footer-content" v-if="$slots.default">
      <div class="mc-footer-wrapper" :style="{ width: wrapperWidth }">
        <slot name="desc"></slot>
      </div>
    </div>
    <div class="mc-footer-bottom">
      <div class="mc-footer-wrapper" :style="{ width: wrapperWidth }">
        <div class="mc-footer-bottom-content">
          <div class="mc-footer-left">
            <slot name="left"></slot>
          </div>
          <div class="mc-footer-right">
            <slot name="right">
              <div class="mc-footer-right-button-group">
                <slot name="right-button-group"></slot>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { FooterInstance, FooterProps } from "./types";

// options
defineOptions({ name: "McFooter", inheritAttrs: false });

// props
withDefaults(defineProps<FooterProps>(), {
  showborder: true,
});

// ref
const _ref = ref<HTMLDivElement | void>();

// expose
defineExpose<FooterInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
