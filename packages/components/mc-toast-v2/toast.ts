import type { ToastProps } from "./types";
import { createVNode, render } from "vue";
import McToast from "./mc-toast.vue";

// Toast 实例接口
interface ToastInstance {
  id: string;
  wrapper: HTMLDivElement;
  close: () => void;
}

// Toast 实例队列
const toastInstances: ToastInstance[] = [];
const MAX_TOASTS = 5;

// 创建容器
let container: HTMLDivElement | null = null;

const createContainer = () => {
  if (container) return container;

  container = document.createElement("div");
  container.className = "mc-toast-container";
  container.style.position = "fixed";
  container.style.top = "20px";
  container.style.right = "20px";
  container.style.zIndex = "9999";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "12px";
  container.style.pointerEvents = "none";

  document.body.appendChild(container);
  return container;
};

// 移除容器
const removeContainer = () => {
  if (
    container &&
    document.body.contains(container) &&
    toastInstances.length === 0
  ) {
    document.body.removeChild(container);
    container = null;
  }
};

// 生成唯一ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 移除指定的 toast 实例
const removeToastInstance = (instanceId: string) => {
  const index = toastInstances.findIndex(
    (instance) => instance.id === instanceId
  );
  if (index !== -1) {
    const instance = toastInstances[index];

    // 移除 DOM 元素
    render(null, instance.wrapper);
    if (container && container.contains(instance.wrapper)) {
      container.removeChild(instance.wrapper);
    }

    // 从队列中移除
    toastInstances.splice(index, 1);

    // 检查是否需要移除容器
    removeContainer();
  }
};

// 移除最早的 toast（FIFO策略）
const removeOldestToast = () => {
  if (toastInstances.length > 0) {
    const oldestInstance = toastInstances[0];
    oldestInstance.close();
  }
};

// 创建 toast 实例
const createToast = (options: ToastProps | string) => {
  let props: ToastProps = {};

  // 处理字符串输入
  if (typeof options === "string") {
    props = { message: options };
  } else {
    props = { ...options };
  }

  // 设置默认值
  props.type = props.type || "info";
  props.autoClose = props.autoClose !== false;
  props.closable = props.closable !== false;

  // 如果已达到最大数量，移除最早的 toast
  if (toastInstances.length >= MAX_TOASTS) {
    removeOldestToast();
  }

  // 创建容器
  const toastContainer = createContainer();

  // 创建包装元素
  const toastWrapper = document.createElement("div");
  toastWrapper.style.pointerEvents = "auto";
  toastWrapper.style.animation = "toast-slide-in 0.3s ease-out";

  // 生成实例ID
  const instanceId = generateId();

  // 创建 toast VNode
  const toastVNode = createVNode(McToast, {
    ...props,
    onClose: () => {
      // 添加关闭动画
      toastWrapper.style.animation = "toast-slide-out 0.3s ease-in";

      // 调用用户自定义的关闭回调
      if (props.onClose) {
        props.onClose();
      }

      // 延迟移除实例
      setTimeout(() => {
        removeToastInstance(instanceId);
      }, 300);
    },
  });

  // 渲染 toast
  render(toastVNode, toastWrapper);
  toastContainer.appendChild(toastWrapper);

  // 创建实例对象
  const instance: ToastInstance = {
    id: instanceId,
    wrapper: toastWrapper,
    close: () => {
      const component = toastVNode.component;
      if (component && component.exposed) {
        (component.exposed as any).handleClose();
      }
    },
  };

  // 添加到队列
  toastInstances.push(instance);

  return {
    id: instanceId,
    close: instance.close,
  };
};

// 主要的 toast 函数
export const toast = createToast;

// 便捷方法
export const toastSuccess = (options: ToastProps | string) => {
  if (typeof options === "string") {
    return createToast({ message: options, type: "success" });
  }
  return createToast({ ...options, type: "success" });
};

export const toastError = (options: ToastProps | string) => {
  if (typeof options === "string") {
    return createToast({ message: options, type: "error" });
  }
  return createToast({ ...options, type: "error" });
};

export const toastWarning = (options: ToastProps | string) => {
  if (typeof options === "string") {
    return createToast({ message: options, type: "warning" });
  }
  return createToast({ ...options, type: "warning" });
};

export const toastInfo = (options: ToastProps | string) => {
  if (typeof options === "string") {
    return createToast({ message: options, type: "info" });
  }
  return createToast({ ...options, type: "info" });
};

// 关闭所有 toast
export const closeAllToasts = () => {
  toastInstances.forEach((instance) => {
    instance.close();
  });
};

// 添加CSS动画样式
const addToastStyles = () => {
  if (document.getElementById("mc-toast-v2-styles")) return;

  const style = document.createElement("style");
  style.id = "mc-toast-v2-styles";
  style.textContent = `
    @keyframes toast-slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes toast-slide-out {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

// 初始化样式
addToastStyles();
