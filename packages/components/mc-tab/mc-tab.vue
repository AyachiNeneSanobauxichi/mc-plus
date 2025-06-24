<template>
  <div class="mc-tab" :class="`mc-tab-${type}`" ref="_ref">
    <div class="mc-tab-nav" ref="tabNavRef">
      <div
        class="mc-tab-nav-item"
        :class="{
          'mc-tab-nav-item-active': tab.name === modelValue,
          'mc-tab-nav-item-disabled': tab.disabled,
        }"
        v-for="tab in tabItems"
        :key="tab.name"
        @click="handleTabClick(tab)"
      >
        <span>
          {{ tab.label }}
        </span>
        <span v-if="tab.count" class="mc-tab-nav-item-count">
          {{ tab.count }}
        </span>
      </div>
      <div class="mc-tab-line" ref="tabLineRef" v-if="isPlain"></div>
    </div>
    <template v-if="activeTab?._vnode">
      <div class="mc-tab-actived-component">
        <component :key="activeTab.name" :is="activeTab._vnode"></component>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type {
  TabEmits,
  TabInstance,
  TabItem,
  TabItemProps,
  TabProps,
  TabValue,
} from "./types";
import {
  computed,
  h,
  onMounted,
  onUnmounted,
  ref,
  useSlots,
  watch,
  watchEffect,
  Fragment,
  type VNode,
} from "vue";
import { filter, find, findIndex, map } from "lodash-es";

// options
defineOptions({ name: "McTab" });

// props
const props = withDefaults(defineProps<TabProps>(), {
  type: "plain",
});

// emit
const emit = defineEmits<TabEmits>();

// refs
const _ref = ref<HTMLDivElement | void>();
const tabNavRef = ref<HTMLDivElement | void>();
const tabLineRef = ref<HTMLDivElement | void>();

// tab items
const tabItems = ref<TabItem[]>([]);

// slots
const slots = useSlots();

// watch default slot
watchEffect(() => {
  // @ts-ignore
  if (!slots.default) {
    tabItems.value = [];
    return;
  }
  // @ts-ignore
  let vnodes = slots.default();
  // handle v-for
  if (vnodes.length && vnodes[0].type === Fragment) {
    vnodes = [...Array.from(vnodes[0].children as VNode[])];
  }

  // filter tab items
  tabItems.value = map(
    filter(vnodes, (vn) => (vn.type as { name: string }).name === "McTabItem"),
    (vn) => {
      const props = vn.props as TabItemProps;
      return {
        _vnode: h(
          "div",
          (vn.children as { default: () => VNode[] })?.default?.()?.[0]
        ),
        ...props,
      } as TabItem;
    }
  );

  console.log("Tab Items: ", tabItems.value);
});

// active tab
const activeTab = computed(() =>
  find(tabItems.value, (tab) => tab.name === props.modelValue)
);

// plain
const isPlain = computed(() => props.type === "plain");

onMounted(async () => {
  // set tab line
  setTabLine(props.modelValue);
  setTimeout(() => {
    // start transition
    setTransition();
  });
});

onUnmounted(() => {
  setTransition(false);
});

// click tab
const handleTabClick = (tab: TabItem) => {
  if (tab.disabled) return;
  emit("update:modelValue", tab.name);
  emit("change", tab.name);
};

// set active tab line
const setTabLine = (tabName?: TabValue) => {
  if (!isPlain.value) return;
  const line = tabLineRef.value!;
  const navContainer = tabNavRef.value!;

  const activeTabIdx = findIndex(
    tabItems.value,
    (item) => item.name === tabName
  );

  if (activeTabIdx < 0) {
    line.style.width = "0";
    return;
  }

  const tabItemNodes = Array.from(navContainer.children);
  const activeTabItem = tabItemNodes[activeTabIdx] as HTMLDivElement;
  const { x, width } = activeTabItem.getBoundingClientRect();
  const { x: containerX } = navContainer.getBoundingClientRect();
  line.style.width = `${width}px`;
  line.style.transform = `translateX(${x - containerX}px)`;
};

// set transition
const setTransition = (transition: boolean = true) => {
  const line = tabLineRef.value;
  if (!isPlain.value || !line) return;
  line.style.transition = transition ? "transform 0.3s ease-in-out" : "";
};

// active tab changed
watch(
  () => props.modelValue,
  (newValue) => {
    setTabLine(newValue);
  }
);

// expose
defineExpose<TabInstance>({
  ref: _ref,
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
