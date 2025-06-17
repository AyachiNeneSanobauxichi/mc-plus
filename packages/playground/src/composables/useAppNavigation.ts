/*
 * @Author: Tieju yang
 * @Date: 2025-05-26 16:00:00
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-26 16:00:00
 */
import type { IconType } from "@mc-plus/components/mc-icon/types";
import { computed, ref } from "vue";

export interface TabItem {
  label: string;
  value: string;
  icon: IconType;
  hasDemo: boolean;
  description: string;
}

export function useAppNavigation() {
  const activeTab = ref("form");
  const sidebarCollapsed = ref(false);

  // 导航配置
  const tabs: TabItem[] = [
    { label: "表单组件", value: "form", icon: "Document", hasDemo: true, description: "表单验证和交互演示" },
    { label: "按钮组件", value: "button", icon: "Tick", hasDemo: true, description: "各种样式和状态的按钮组件" },
    { label: "单选框", value: "radio", icon: "Tick", hasDemo: true, description: "单选框和单选框组组件" },
    { label: "标签组件", value: "tag", icon: "Bookmark", hasDemo: true, description: "可关闭和自定义的标签组件" },
    { label: "警告框", value: "alert", icon: "Info", hasDemo: true, description: "不同类型的警告提示组件" },
    { label: "消息提示", value: "message", icon: "Notification", hasDemo: true, description: "全局消息提示组件" },
    { label: "轻提示", value: "toast", icon: "Notification_02", hasDemo: true, description: "轻量级提示组件" },
    { label: "图标组件", value: "icon", icon: "Star", hasDemo: true, description: "丰富的图标库组件" },
    { label: "折叠面板", value: "collapse", icon: "Up-Chevron", hasDemo: true, description: "可折叠的内容面板组件" },
    { label: "表格组件", value: "table", icon: "Tablet", hasDemo: true, description: "功能强大的数据表格组件" },
  ];

  // 计算属性
  const currentTab = computed(() => {
    return tabs.find((tab) => tab.value === activeTab.value);
  });

  const currentTabLabel = computed(() => {
    return currentTab.value?.label || "未知组件";
  });

  const currentTabDescription = computed(() => {
    return currentTab.value?.description || "";
  });

  // 方法
  const switchTab = (tabValue: string) => {
    activeTab.value = tabValue;
    // 在移动端自动收起侧边栏
    if (window.innerWidth < 768) {
      sidebarCollapsed.value = true;
    }
  };

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
  };

  const collapseSidebar = () => {
    sidebarCollapsed.value = true;
  };

  const expandSidebar = () => {
    sidebarCollapsed.value = false;
  };

  return {
    activeTab,
    sidebarCollapsed,
    tabs,
    currentTab,
    currentTabLabel,
    currentTabDescription,
    switchTab,
    toggleSidebar,
    collapseSidebar,
    expandSidebar,
  };
}
