<!--
 * @Author: Tieju yang
 * @Date: 2025-05-22 11:02:03
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-22 11:02:34
-->
<template>
  <div class="demo-section">
    <h3>Icon Component</h3>
    <div class="demo-block">
      <mc-icon name="Accept_02" @click="handleIconClick" />
      <mc-icon name="Info" @click="handleIconClick" />
      <mc-icon name="Error" @click="handleIconClick" />
      <mc-icon name="Error_02" @click="handleIconClick" />
      <mc-icon name="Cross" @click="handleIconClick" />
      <mc-icon name="Tick" @click="handleIconClick" />
      <mc-icon name="Add" @click="handleIconClick" />
      <mc-icon name="Remove_User" @click="handleIconClick" />
      <mc-icon name="Edit" @click="handleIconClick" />
      <mc-icon name="Trash" @click="handleIconClick" />
      <mc-icon name="Search" @click="handleIconClick" />
      <mc-icon name="Download" @click="handleIconClick" />
      <mc-icon name="Upload" @click="handleIconClick" />
      <mc-icon name="Setting" @click="handleIconClick" />
      <mc-icon name="User" @click="handleIconClick" />
      <mc-icon name="Star" @click="handleIconClick" />
      <mc-icon name="Lock" @click="handleIconClick" />
      <mc-icon name="Unlock" @click="handleIconClick" />
      <mc-icon name="Calendar" @click="handleIconClick" />
      <mc-icon name="Notification" @click="handleIconClick" />
    </div>

    <h4 style="margin-top: 16px">Custom Styled Icons</h4>
    <div class="demo-block">
      <mc-icon name="Star" class="custom-icon" />
      <mc-icon name="Favourite" class="custom-icon-red" />
      <mc-icon name="Accept_02" class="custom-icon-green" />
      <mc-icon name="Error" class="custom-icon-red" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { McIcon } from "mc-plus";

const handleIconClick = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement;
  const iconName = target.className.split("--")[1].split(" ")[0]; // Extract icon name from class
  console.log(`Icon ${iconName} clicked`);
};
</script>

<style scoped lang="scss">
.demo-section {
  margin-bottom: 32px;
}

.demo-block {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.custom-icon {
  font-size: 24px;
  color: #6366f1;
}

.custom-icon-red {
  font-size: 24px;
  color: #ef4444;
}

.custom-icon-green {
  font-size: 24px;
  color: #10b981;
}
</style>
