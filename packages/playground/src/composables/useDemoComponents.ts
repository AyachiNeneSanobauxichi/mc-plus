/*
 * @Author: Tieju yang
 * @Date: 2025-05-26 16:00:00
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-26 16:00:00
 */
import { defineAsyncComponent } from "vue";

export function useDemoComponents() {
  // 使用defineAsyncComponent懒加载组件
  const AlertDemo = defineAsyncComponent(() => import("../demos/AlertDemo.vue"));
  const ButtonDemo = defineAsyncComponent(() => import("../demos/ButtonDemo.vue"));
  const CollapseDemo = defineAsyncComponent(() => import("../demos/CollapseDemo.vue"));
  const FormDemo = defineAsyncComponent(() => import("../demos/FormDemo.vue"));
  const IconDemo = defineAsyncComponent(() => import("../demos/IconDemo.vue"));
  const MessageDemo = defineAsyncComponent(() => import("../demos/MessageDemo.vue"));
  const RadioDemo = defineAsyncComponent(() => import("../demos/RadioDemo.vue"));
  const TableDemo = defineAsyncComponent(() => import("../demos/TableDemo.vue"));
  const TagDemo = defineAsyncComponent(() => import("../demos/TagDemo.vue"));
  const ToastDemo = defineAsyncComponent(() => import("../demos/ToastDemo.vue"));

  // 组件映射
  const componentMap = {
    form: FormDemo,
    button: ButtonDemo,
    radio: RadioDemo,
    tag: TagDemo,
    alert: AlertDemo,
    message: MessageDemo,
    toast: ToastDemo,
    icon: IconDemo,
    collapse: CollapseDemo,
    table: TableDemo,
  };

  // 获取当前演示组件
  const getCurrentDemoComponent = (activeTab: string) => {
    console.log("Loading demo for tab:", activeTab);
    const component = componentMap[activeTab as keyof typeof componentMap];
    if (component) {
      console.log("Component found:", component);
      return component;
    }
    console.log("No component found for:", activeTab);
    return null;
  };

  return {
    getCurrentDemoComponent,
  };
}
