<template>
  <div class="playground-toast">
    <mc-toast
      :message="toastContent.success"
      type="success"
      width="800px"
      :auto-close="false"
      @close="handleClose"
    >
      <template #content>
        {{ toastContent.success }}
      </template>
    </mc-toast>
    <div class="tool-bar">
      <mc-button @click="handleSuccessClick"> Success </mc-button>
      <mc-button @click="toast.error(toastContent.error)"> Error </mc-button>
      <mc-button @click="handleWarningClick"> Warning </mc-button>
      <mc-button @click="toast.info(toastContent.info)">Info</mc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "@mc-plus/components/mc-toast/toast";
import McToast from "../../../../components/mc-toast/mc-toast.vue";
import McButton from "../../../../components/mc-button/mc-button.vue";
const toastContent = {
  success: `submit success!`,

  error: `发生错误！这是一个用于测试的 Error 类型 Toast。我们希望通过这段较长的文字，来验证 toast 组件在展示大量文本时的表现。无论是换行、溢出还是样式适配，都需要确保组件能够正常工作。以下是一些额外的测试内容：

1. 组件是否能够正确显示多行文本？
2. 当内容过长时，是否会出现滚动条或自动换行？
3. 特殊字符（如：@#￥%……&*）是否能够被正常渲染？
4. 组件的边距、内边距是否会因为内容变多而出现异常？

请仔细观察组件的表现，并根据实际效果进行优化。感谢您的配合与测试！`,

  warning: `warning!`,

  info: `提示信息！这是一个用于测试的 Info 类型 Toast。我们希望通过这段较长的文字，来验证 toast 组件在展示大量文本时的表现。无论是换行、溢出还是样式适配，都需要确保组件能够正常工作。以下是一些额外的测试内容：

1. 组件是否能够正确显示多行文本？
2. 当内容过长时，是否会出现滚动条或自动换行？
3. 特殊字符（如：@#￥%……&*）是否能够被正常渲染？
4. 组件的边距、内边距是否会因为内容变多而出现异常？

请仔细观察组件的表现，并根据实际效果进行优化。感谢您的配合与测试！`,
};

const handleSuccessClick = () => {
  toast.success({
    message: toastContent.success,
    autoClose: false,
  });
};

const handleWarningClick = () => {
  toast.warning({
    message: toastContent.warning,
    duration: 2000,
    countDownIcon: false,
  });
};

const handleClose = () => {
  console.log("close");
};
</script>

<style scoped lang="scss">
.playground-toast {
  .tool-bar {
    position: absolute;
    display: flex;
    gap: 16px;
    left: 50%;
    bottom: 60px;
    transform: translateX(-50%);
  }
}
</style>
