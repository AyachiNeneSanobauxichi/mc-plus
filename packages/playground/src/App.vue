<template>
  <div class="app-container">
    <!-- 移动端遮罩层 -->
    <MobileOverlay :visible="sidebarCollapsed && isMobile" @close="collapseSidebar" />

    <!-- 头部导航 -->
    <header class="app-header">
      <div class="header-content">
        <div class="header-left">
          <mc-button v-if="isMobile" @click="toggleSidebar" type="plain" size="small" class="mobile-menu-btn">
            <mc-icon name="Menu" :size="20" />
          </mc-button>
          <h1 class="app-title">
            <mc-icon name="Tick" :size="32" class="logo-icon" />
            MC-Plus 组件库演示
          </h1>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="app-main">
      <!-- 侧边栏导航 -->
      <aside class="sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
        <div class="sidebar-header">
          <h3>组件导航</h3>
          <mc-button @click="toggleSidebar" :type="sidebarCollapsed ? 'primary' : 'plain'" size="small">
            <mc-icon :name="sidebarCollapsed ? 'Menu' : 'X'" :size="16" />
          </mc-button>
        </div>

        <nav class="sidebar-nav">
          <div
            v-for="tab in tabs"
            :key="tab.value"
            class="nav-item"
            :class="{
              active: activeTab === tab.value,
              'has-demo': tab.hasDemo,
            }"
            @click="switchTab(tab.value)">
            <mc-icon :name="tab.icon" :size="16" class="nav-icon" />
            <span class="nav-label">{{ tab.label }}</span>
            <mc-icon v-if="tab.hasDemo" name="external" :size="12" class="demo-indicator" />
          </div>
        </nav>
      </aside>

      <!-- 内容区域 -->
      <div class="content-area">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
          <span class="breadcrumb-item">组件库</span>
          <mc-icon name="Right-Chevron" :size="12" />
          <span class="breadcrumb-item active">{{ currentTabLabel }}</span>
        </div>

        <!-- 演示内容 -->
        <div class="demo-container">
          <!-- 组件演示区域 -->
          <div class="component-demo-section">
            <div class="demo-header">
              <h2>{{ currentTabLabel }}</h2>
              <p class="demo-description">{{ currentTabDescription }}</p>
            </div>

            <div class="demo-content">
              <!-- 调试信息 -->
              <div class="debug-info" style="background: #f0f0f0; padding: 10px; margin-bottom: 10px; font-size: 12px">
                <p>当前Tab: {{ activeTab }}</p>
                <p>组件函数: {{ getCurrentDemoComponent(activeTab) }}</p>
                <p>标签: {{ currentTabLabel }}</p>
                <p>描述: {{ currentTabDescription }}</p>
              </div>

              <!-- 动态加载的组件 -->
              <Suspense>
                <template #default>
                  <component :is="getCurrentDemoComponent(activeTab)" />
                </template>
                <template #fallback>
                  <div class="loading-container">
                    <div class="loading-spinner"></div>
                    <p>加载组件中...</p>
                  </div>
                </template>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="app-footer">
      <div class="footer-content">
        <p>&copy; 2024 MC-Plus 组件库. 基于 Vue 3 + TypeScript 构建.</p>
        <div class="footer-links">
          <a href="#" target="_blank">文档</a>
          <a href="#" target="_blank">GitHub</a>
          <a href="#" target="_blank">问题反馈</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { McButton, McIcon } from "@mc-plus/components";
import { useWindowResize } from "@mc-plus/hooks";
import { computed } from "vue";
import MobileOverlay from "./components/MobileOverlay.vue";
import { useAppNavigation } from "./composables/useAppNavigation";
import { useDemoComponents } from "./composables/useDemoComponents";

// 使用组合式函数
const { activeTab, sidebarCollapsed, tabs, currentTabLabel, currentTabDescription, switchTab, toggleSidebar, collapseSidebar } = useAppNavigation();

const { getCurrentDemoComponent } = useDemoComponents();

// 响应式窗口大小
const { width } = useWindowResize();
const isMobile = computed(() => width.value < 768);
</script>

<style lang="scss" scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--mc-gray-50);
  color: var(--mc-gray-900);
}

// 头部样式
.app-header {
  background: linear-gradient(135deg, var(--mc-teal-500) 0%, var(--mc-blue-500) 100%);
  color: rgb(86, 86, 86);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mobile-menu-btn {
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
}

.app-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
}

.logo-icon {
  filter: brightness(0) invert(1);
}

// 主内容区域
.app-main {
  flex: 1;
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

// 侧边栏
.sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid var(--mc-gray-200);
  transition: all 0.3s ease;
  overflow: hidden;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 200;
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    &.sidebar-collapsed {
      transform: translateX(0);
    }
  }

  &.sidebar-collapsed {
    width: 60px;

    .nav-label,
    .sidebar-header h3 {
      display: none;
    }

    .nav-item {
      justify-content: center;
      padding: 0.75rem;
    }
  }
}

.sidebar-header {
  padding: 1.5rem 1rem 1rem;
  border-bottom: 1px solid var(--mc-gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--mc-gray-900);
  }
}

.sidebar-nav {
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--mc-gray-600);
  position: relative;

  &:hover {
    background-color: var(--mc-gray-50);
    color: var(--mc-teal-600);
  }

  &.active {
    background-color: var(--mc-teal-50);
    color: var(--mc-teal-600);
    border-right: 3px solid var(--mc-teal-500);
  }

  &.has-demo .demo-indicator {
    margin-left: auto;
    opacity: 0.6;
  }
}

.nav-icon {
  flex-shrink: 0;
}

.nav-label {
  font-weight: 500;
  flex: 1;
}

// 内容区域
.content-area {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: var(--mc-gray-600);
}

.breadcrumb-item {
  &.active {
    color: var(--mc-teal-600);
    font-weight: 500;
  }
}

// 演示容器
.demo-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

// 加载状态
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: var(--mc-gray-600);

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--mc-gray-200);
    border-top: 3px solid var(--mc-teal-500);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// 组件演示区域
.component-demo-section {
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.demo-header {
  margin-bottom: 2rem;

  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--mc-gray-900);
  }
}

.demo-description {
  margin: 0;
  color: var(--mc-gray-600);
  font-size: 1rem;
  line-height: 1.5;
}

.demo-content {
  min-height: 400px;
}

.test-component {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.test-component h3 {
  color: var(--mc-teal-600);
  margin-bottom: 1rem;
}

.test-component h4 {
  color: var(--mc-blue-600);
  margin: 1rem 0 0.5rem 0;
}

.inline-test-demo {
  padding: 1rem;
  background: var(--mc-gray-50);
  border-radius: 6px;
  border: 1px solid var(--mc-gray-200);
}

// 页脚
.app-footer {
  background: white;
  border-top: 1px solid var(--mc-gray-200);
  margin-top: auto;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    padding: 1rem;
  }

  p {
    margin: 0;
    color: var(--mc-gray-600);
    font-size: 0.875rem;
  }

  .footer-links {
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
      justify-content: center;
    }

    a {
      color: var(--mc-gray-600);
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.2s ease;

      &:hover {
        color: var(--mc-teal-600);
      }
    }
  }
}
</style>
