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
        {{ tab.label }}
      </div>
      <div class="mc-tab-line" ref="tabLineRef" v-if="isPlain"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TabEmits, TabInstance, TabItem, TabProps } from "./types";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { findIndex } from "lodash-es";

// options
defineOptions({ name: "McTabItem" });

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

// plain
const isPlain = computed(() => props.type === "plain");

// tab items
const tabItems = ref<TabItem[]>([
  { name: "tab-1", label: "HirasawaYui" },
  { name: "tab-2", label: "NakanoAzusa" },
  { name: "tab-3", label: "AkiyamaMio" },
  { name: "tab-4", label: "TainakaRitsu" },
  { name: "tab-5", label: "KotobukuTsumugi" },
]);

onMounted(async () => {
  setTabLine(props.modelValue);
  setTimeout(() => {
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
const setTabLine = (tabName?: string) => {
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
  if (!isPlain.value) return;
  const line = tabLineRef.value!;
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
@use "./styles/mc-tab.scss";
</style>
