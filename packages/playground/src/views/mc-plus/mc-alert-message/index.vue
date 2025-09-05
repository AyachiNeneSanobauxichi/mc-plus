<template>
  <div class="playground-alert-message">
    <mc-alert-message type="success">
      <template #default>{{ text.message }}</template>
      <template #content>{{ text.content }}</template>
    </mc-alert-message>
  </div>
</template>

<script setup lang="ts">
import { McAlertMessage } from "mc-plus";

const message = "测试提示信息";
const content = `这是一个用于测试的内容段落。我们希望通过这段较长的文字，来验证 mc-alert-message 组件在展示大量文本时的表现。无论是换行、溢出还是样式适配，都需要确保组件能够正常工作。以下是一些额外的测试内容：

1. 组件是否能够正确显示多行文本？
2. 当内容过长时，是否会出现滚动条或自动换行？
3. 特殊字符（如：@#￥%……&*）是否能够被正常渲染？
4. 组件的边距、内边距是否会因为内容变多而出现异常？

请仔细观察组件的表现，并根据实际效果进行优化。感谢您的配合与测试！
`;
const text = { message, content };
</script>

<style scoped lang="scss">
.playground-alert-message {
  width: 1000px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}
</style>
