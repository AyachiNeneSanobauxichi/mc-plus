/*
 * @Author: Tieju yang
 * @Date: 2025-05-26 16:00:00
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-26 16:00:00
 */
import { onMounted, ref, watch } from "vue";

export type Theme = "light" | "dark";

export function useTheme() {
  const theme = ref<Theme>("light");

  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  // 设置主题
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
  };

  // 应用主题到DOM
  const applyTheme = (themeValue: Theme) => {
    document.documentElement.setAttribute("data-theme", themeValue);
    // 保存到localStorage
    localStorage.setItem("mc-plus-theme", themeValue);
  };

  // 从localStorage恢复主题
  const restoreTheme = () => {
    const savedTheme = localStorage.getItem("mc-plus-theme") as Theme;
    if (savedTheme && ["light", "dark"].includes(savedTheme)) {
      theme.value = savedTheme;
    }
  };

  // 监听主题变化
  watch(theme, (newTheme) => {
    applyTheme(newTheme);
  });

  // 初始化
  onMounted(() => {
    restoreTheme();
    applyTheme(theme.value);
  });

  return {
    theme,
    toggleTheme,
    setTheme,
  };
}
