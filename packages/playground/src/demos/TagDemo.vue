<!--
 * @Author: Tieju yang
 * @Date: 2025-05-22 11:01:32
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-23 16:57:13
-->
<template>
  <div class="demo-section">
    <h3>Tag Component</h3>

    <div class="demo-block">
      <mc-tag type="primary" color="#301A6D" size="small" closable>Preset Text</mc-tag>
      <mc-tag type="primary" color="#301A6D" selected size="small" closable>Preset Text</mc-tag>
      <mc-tag type="primary" color="#301A6D" disabled size="small" closable>Preset Text</mc-tag>
    </div>

    <div class="demo-block">
      <mc-tag type="primary" color="#E6DDFF" size="medium" closable>Preset Text</mc-tag>
      <mc-tag type="primary" color="#E6DDFF" selected size="medium" closable>Preset Text</mc-tag>
      <mc-tag type="primary" color="#E6DDFF" disabled size="medium" closable>Preset Text</mc-tag>
    </div>

    <div class="demo-block">
      <mc-tag type="plain" color="#301A6D">Preset Text</mc-tag>
    </div>

    <div class="demo-block">
      <mc-tag type="primary">Preset Text</mc-tag>
      <mc-tag type="primary" selected>Preset Text</mc-tag>
      <mc-tag type="primary" disabled>Preset Text</mc-tag>
    </div>

    <div class="demo-block">
      <mc-tag type="plain" radius="round">Preset Text</mc-tag>
      <mc-tag type="plain" radius="round" selected>Preset Text</mc-tag>
      <mc-tag type="plain" radius="round" disabled>Preset Text</mc-tag>
    </div>

    <div class="demo-block">
      <mc-tag v-bind="tag1Props"> Custom Tag </mc-tag>
      <mc-tag v-bind="tag1Props" selected> Custom Tag </mc-tag>
      <mc-tag v-bind="tag1Props" disabled> Custom Tag </mc-tag>
    </div>

    <div class="demo-block">
      <mc-tag v-bind="tag2Props"> Custom Tag<mc-icon :size="24" :name="'Right'" /> </mc-tag>
      <mc-tag v-bind="tag2Props" selected> Custom Tag </mc-tag>
      <mc-tag v-bind="tag2Props" disabled> Custom Tag </mc-tag>
    </div>

    <div class="demo-block">
      <mc-tag v-bind="tag3Props"> Custom Tag <mc-icon :size="24" :name="'Right'" /></mc-tag>
      <mc-tag v-bind="tag3Props" selected> Custom Tag </mc-tag>
      <mc-tag v-bind="tag3Props" disabled> Custom Tag </mc-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { McIcon, McTag, type IconType, type TagSize, type TagType } from "mc-plus";
import { ref } from "vue";

const tag1Props = ref({
  backgroundColor: "#E6DDFF",
  textColor: "#222222",
  selectedBackgroundColor: "#A695D7",
  selectedTextColor: "#FFFFFF",
  icon: "User" as IconType,
  closable: true,
  size: "large" as TagSize,
});

const tag2Props = ref({
  type: "plain" as TagType,
  backgroundColor: "#301A6D",
  textColor: "#FFFFFF",
  selectedBackgroundColor: "#301A6D",
  selectedTextColor: "#FFFFFF",
  icon: "User" as IconType,
  closable: true,
  size: "large" as TagSize,
});

const tag3Props = ref({
  backgroundColor: "#301A6D",
  textColor: "#FFFFFF",
  selectedBackgroundColor: "#211050",
  selectedTextColor: "#FFFFFF",
});
</script>

<style scoped lang="scss">
.demo-section {
  margin-bottom: 32px;
}

.demo-block {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 16px;
}
</style>
