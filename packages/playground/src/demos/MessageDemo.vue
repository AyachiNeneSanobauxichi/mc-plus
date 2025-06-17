<!--
 * @Author: Tieju yang
 * @Date: 2025-05-22 11:01:17
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-28 09:39:32
-->
<template>
  <div class="demo-section">
    <h3>Message Component</h3>
    <div class="demo-block">
      <mc-button @click="showMessage('info')">Show Info Message</mc-button>
      <mc-button @click="showMessage('success')">Show Success Message</mc-button>
      <mc-button @click="showMessage('warning')">Show Warning Message</mc-button>
      <mc-button @click="showMessage('error')">Show Error Message</mc-button>
      <mc-button @click="showMessageWithDesc">Show Message with Description</mc-button>
      <mc-button @click="showMessageNoIcon">Show Message without Icon</mc-button>
      <mc-button @click="showClosableMessage">Show Closable Message</mc-button>
      <mc-button @click="showLongDurationMessage">Show Long Duration Message</mc-button>
    </div>

    <!-- Example of a static message (normally messages are used programmatically) -->
    <div class="demo-block-column" style="margin-top: 24px">
      <mc-message type="info" message="Static Info Message" @close="handleClose" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { McButton } from "mc-plus";
import { Message } from "../../../components";

const handleClose = () => {
  console.log("Message closed");
};

const showMessage = (type: "info" | "success" | "warning" | "error") => {
  Message[type]({
    type,
    message: "     快拉上alkyd jails jackal jails阿斯科利jackal  ",
    duration: 0,
    onClose: () => console.log(`${type} message closed`),
  });
};

const showMessageWithDesc = () => {
  Message.info({
    message: "Message with Description",
    description: "This is the detailed description for this message",
    duration: 3000,
  });
};

const showMessageNoIcon = () => {
  Message.info({
    message: "Message without Icon",
    showIcon: false,
    duration: 3000,
  });
};

const showClosableMessage = () => {
  Message.info({
    message: "Closable Message",
    closable: true,
    duration: 0, // Won't auto close
  });
};

const showLongDurationMessage = () => {
  Message.info({
    message: "Long Duration Message",
    duration: 10000, // 10 seconds
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

.demo-block-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
