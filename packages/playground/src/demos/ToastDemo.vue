<!--
 * @Author: Tieju yang
 * @Date: 2025-05-22 11:01:47
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-23 17:52:17
-->
<template>
  <div class="demo-section">
    <h3>Toast Component</h3>
    <div class="demo-block">
      <mc-button @click="showToast('success')">Show Primary Toast</mc-button>
      <mc-button @click="showToast('info')">Show Info Toast</mc-button>
      <mc-button @click="showToast('success')">Show Success Toast</mc-button>
      <mc-button @click="showToast('warning')">Show Warning Toast</mc-button>
      <mc-button @click="showToast('error')">Show Error Toast</mc-button>
      <mc-button @click="showCustomToast">Show Custom Toast</mc-button>
      <mc-button @click="showToastWithoutIcon">Show Toast without Icon</mc-button>
      <mc-button @click="showToastNonClosable">Show Non-closable Toast</mc-button>
      <mc-button @click="showPersistentToast">Show Persistent Toast</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { McButton, toast, type IconType } from "../../../components";

const showToast = (type: "success" | "warning" | "error" | "info") => {
  toast({
    type,
    icon: "SpeedUp" as IconType,
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Toast`,
    message: `This is a ${type} toast message 21312312esqeqwe123123wqsdqe213ewqr32qewd2314eqwfgr21312312esqeqwe123123wqsdqe213ewqr32qewd2314eqwfgr21312312esqeqwe123123wqsdqe213ewqr32qewd2314eqwfgr21312312esqeqwe123123wqsdqe213ewqr32qewd2314eqwfgr21312312esqeqwe123123wqsdqe213ewqr32qewd2314eqwfgr21312312esqeqwe123123wqsdqe213ewqr32qewd2314eqwfgr`,
    onClose: () => console.log(`${type} toast closed`),
    position: "center",
  });
};

const showCustomToast = () => {
  toast({
    type: "success",
    title: "Custom Toast",
    message: "This is a custom toast with a specific icon",
    icon: "Star",
    duration: 5000,
  });
};

const showToastWithoutIcon = () => {
  toast({
    type: "success",
    title: "No Icon Toast",
    message: "This toast does not display an icon",
    icon: undefined,
    duration: 5000,
  });
};

const showToastNonClosable = () => {
  toast({
    type: "success",
    title: "Non-closable Toast",
    message: "This toast cannot be manually closed",
    showClose: false,
    duration: 5000,
  });
};

const showPersistentToast = () => {
  toast({
    type: "warning",
    title: "Persistent Toast",
    message: "This toast will stay until manually closed",
    icon: "Error_02",
    duration: 0, // 0 means no auto close
  });
};
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
