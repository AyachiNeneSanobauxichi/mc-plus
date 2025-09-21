// 使用 enum 和联合类型约束 icontype 值的示例

import { IconType, IconTypeEnum } from './packages/components/mc-icon/types';

// 方法一：使用 enum（推荐）
interface ButtonWithIcon {
  icon: IconTypeEnum; // 只能是 IconTypeEnum 中的值
  label: string;
}

// 使用 enum 的示例
const loginButton: ButtonWithIcon = {
  icon: IconTypeEnum.Login, // IDE 会提供自动补全
  label: '登录'
};

const searchButton: ButtonWithIcon = {
  icon: IconTypeEnum.Search, // 类型安全，只能选择预定义的值
  label: '搜索'
};

// 方法二：使用联合类型（与现有代码兼容）
interface ComponentWithIcon {
  iconType: IconType; // 只能是 IconType 中定义的字符串值之一
  title: string;
}

const header: ComponentWithIcon = {
  iconType: "Home", // 只能是预定义的字符串值
  title: '首页'
};

// 方法三：结合使用 - 函数参数约束
function createIconButton(icon: IconTypeEnum, label: string) {
  return {
    icon: icon, // 参数必须是 IconTypeEnum 的值
    label: label
  };
}

// 使用示例
const addButton = createIconButton(IconTypeEnum.Add, '添加');
const deleteButton = createIconButton(IconTypeEnum.Trash, '删除');

// 方法四：使用 keyof typeof 来获取 enum 的键
type IconTypeKeys = keyof typeof IconTypeEnum;

interface AdvancedIconConfig {
  iconKey: IconTypeKeys; // 只能是 enum 的键名（不是值）
  iconValue: IconTypeEnum; // 只能是 enum 的值
}

const config: AdvancedIconConfig = {
  iconKey: "Loading", // 键名
  iconValue: IconTypeEnum.Loading // 对应的值
};

// 方法五：创建工具函数来验证类型
function isValidIconType(icon: string): icon is IconType {
  return Object.values(IconTypeEnum).includes(icon as IconTypeEnum);
}

// 使用类型守卫
function safeCreateIcon(iconName: string) {
  if (isValidIconType(iconName)) {
    // 这里 iconName 被类型守卫确认为有效的 IconType
    return { icon: iconName, valid: true };
  }
  return { icon: null, valid: false };
}

// 方法六：从数组中选择（运行时验证）
const availableIcons = Object.values(IconTypeEnum);

function getRandomIcon(): IconTypeEnum {
  const randomIndex = Math.floor(Math.random() * availableIcons.length);
  return availableIcons[randomIndex];
}

export {
  ButtonWithIcon,
  ComponentWithIcon,
  createIconButton,
  safeCreateIcon,
  getRandomIcon
};
