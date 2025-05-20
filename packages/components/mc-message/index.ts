/*
 * @Author: Tieju yang
 * @Date: 2025-05-20 15:28:46
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-20 17:56:14
 */
import { withInstall } from "@mc-plus/utils";
import { createVNode, render, type App, type VNode } from "vue";
import "./index.scss"; // 确保样式被导入
import _McMessage from "./mc-message.vue";
import type { MessageComponentExposed, MessageOptions, MessageService, MessageType } from "./types";

export * from "./types";
export const McMessage = withInstall(_McMessage);

let seed = 1;
interface MessageInstanceRecord {
  vm: VNode;
  id: string;
  wrapper: HTMLDivElement;
}

const instances: MessageInstanceRecord[] = [];
const MAX_INSTANCES = 20;

// 创建或获取消息容器
const getMessageContainer = (): HTMLDivElement => {
  let container = document.getElementById("mc-message-container") as HTMLDivElement | null;
  if (!container) {
    container = document.createElement("div");
    container.id = "mc-message-container";
    document.body.appendChild(container);
  }
  return container;
};

const Message: MessageService = {
  info: (options) => createMessage(options, "info"),
  success: (options) => createMessage(options, "success"),
  warning: (options) => createMessage(options, "warning"),
  error: (options) => createMessage(options, "error"),
  close: (id) => closeMessage(id),
  closeAll: () => {
    // 复制数组，避免在迭代过程中修改原数组导致的问题
    const instancesCopy = [...instances];
    instancesCopy.forEach((instance) => {
      const exposed = instance.vm.component?.exposed as MessageComponentExposed | undefined;
      exposed?.handleClose?.();
    });
  },
};

function createMessage(options: MessageOptions | string, type: MessageType) {
  if (typeof options === "string") {
    options = {
      message: options,
    };
  }

  const id = `message_${seed++}`;
  const userOnClose = options.onClose;

  // 获取消息容器
  const container = getMessageContainer();

  // 为每条消息创建一个包装容器，使其在DOM中独立存在
  const messageWrapper = document.createElement("div");
  messageWrapper.setAttribute("data-message-id", id);
  messageWrapper.classList.add("mc-message-item");
  const messageProps = {
    ...options,
    type,
    id,
    onClose: () => {
      userOnClose?.();
      closeMessage(id);
    },
  };

  // 检查是否超过最大实例数
  if (instances.length >= MAX_INSTANCES) {
    // 关闭最早的消息
    const oldestInstance = instances[0];
    closeMessage(oldestInstance.id);
  }

  const vm = createVNode(_McMessage, messageProps);

  // 将消息渲染到独立的DOM元素中
  render(vm, messageWrapper);

  // 将消息DOM元素添加到容器中
  container.appendChild(messageWrapper);

  // 保存实例引用
  instances.push({ vm, id, wrapper: messageWrapper });

  return {
    close: () => {
      closeMessage(id);
    },
  };
}

function closeMessage(id: string): void {
  const index = instances.findIndex((instance) => instance.id === id);

  if (index === -1) return;

  const instance = instances[index];
  if (!instance) return;

  // 将消息从DOM中移除前，先清空内容避免内存泄漏
  render(null, instance.wrapper);

  // 从DOM中移除元素
  const container = getMessageContainer();
  if (container.contains(instance.wrapper)) {
    container.removeChild(instance.wrapper);
  }

  // 从实例数组中移除
  instances.splice(index, 1);

  // 如果没有消息了，移除容器
  if (instances.length === 0) {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}

// Install function
const install = (app: App): void => {
  app.config.globalProperties.$message = Message;
};

export { Message };
export default { install };
