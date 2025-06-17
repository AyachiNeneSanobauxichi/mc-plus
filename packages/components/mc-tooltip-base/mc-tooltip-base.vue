<template>
  <div class="mc-tooltip-base" ref="containerNode" v-on="outerEvents">
    <div class="mc-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot></slot>
    </div>
    <transition :name="transitionName">
      <div
        class="mc-tooltip__popper"
        ref="popperNode"
        v-on="dropdownEvents"
        v-if="visible"
      >
        <slot name="content">{{ content }}</slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type {
  TooltipBaseProps,
  TooltipBaseEmits,
  TooltipBaseInstance,
} from "./types";
import { computed, onUnmounted, ref, watch, watchEffect } from "vue";
import { createPopper, type Instance } from "@popperjs/core";
import { bind, debounce, isNil, type DebouncedFunc } from "lodash-es";
import { useClickOutside } from "@mc-plus/hooks";

// options
defineOptions({ name: "McTooltipBase" });

// props
const props = withDefaults(defineProps<TooltipBaseProps>(), {
  placement: "bottom",
  trigger: "hover",
  transitionName: "fade",
  showTimeout: 0,
  hideTimeout: 300,
});

// emits
const emits = defineEmits<TooltipBaseEmits>();

// events
const events = ref<Record<string, EventListener>>({});
const outerEvents = ref<Record<string, EventListener>>({});
const dropdownEvents = ref<Record<string, EventListener>>({});

// refs
const containerNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();
const popperNode = ref<HTMLElement>();

// visible
const visible = ref<boolean>(false);

// set visible
const setVisible = (val: boolean) => {
  if (props.disabled) val = false;
  visible.value = val;
  emits("visible:change", val);
};

// popper options
const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 8],
      },
    },
  ],
  ...props.popperOptions,
}));

// poper instance
let popperInstance: Instance | undefined;

// visible change
watch(
  visible,
  (val) => {
    if (!val) return;
    if (triggerNode.value && popperNode.value) {
      // create popper instance
      popperInstance = createPopper(
        triggerNode.value,
        popperNode.value,
        popperOptions.value
      );
    }
  },
  {
    flush: "post",
  }
);

// destroy popper instance
const destroyPopperInstance = () => {
  if (isNil(popperInstance)) return;
  popperInstance.destroy();
  popperInstance = undefined;
};

// destroy popper instance when unmounted
onUnmounted(() => {
  destroyPopperInstance();
});

let openDebounce: DebouncedFunc<() => void> | undefined;
let closeDebounce: DebouncedFunc<() => void> | undefined;

// attach events
const attachEvents = () => {
  // clear existing events
  clearEvents();

  // close popper when disabled
  if (props.disabled) {
    closePopper(false);
    return;
  }

  // attach events
  if (props.trigger === "click") {
    // click
    events.value["click"] = () => {
      visible.value ? closePopper() : openPopper();
    };
  } else if (props.trigger === "hover") {
    // hover
    events.value["mouseenter"] = () => openPopper();
    outerEvents.value["mouseleave"] = () => closePopper();
    dropdownEvents.value["mouseenter"] = () => openPopper();
  }
};

// clear events
const clearEvents = () => {
  events.value = {};
  outerEvents.value = {};
  dropdownEvents.value = {};
};

// open delay
const openDelay = computed(() =>
  props.trigger === "hover" ? props.showTimeout : 0
);

// close delay
const closeDelay = computed(() =>
  props.trigger === "hover" ? props.hideTimeout : 0
);

// reset events when props changed
watchEffect(() => {
  attachEvents();
  openDebounce = debounce(bind(setVisible, null, true), openDelay.value);
  closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value);
});

// open popper
const openPopper = (useDebounce = true) => {
  closeDebounce?.cancel();
  if (useDebounce) {
    openDebounce?.();
  } else {
    setVisible(false);
  }
};

// close popper
const closePopper = (useDebounce = true) => {
  openDebounce?.cancel();
  if (useDebounce) {
    closeDebounce?.();
  } else {
    setVisible(false);
  }
};

// click outside
useClickOutside(containerNode, () => {
  emits("click:outside");
  if (props.trigger === "hover") return;
  visible.value && closePopper(false);
});

// expose
defineExpose<TooltipBaseInstance>({
  show: () => openPopper(false),
  hide: () => closePopper(false),
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
