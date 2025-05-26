# MC Table 组件

一个功能丰富的 Vue 3 表格组件，支持排序、选中、聚焦等功能。

## 功能特性

- ✅ 数据展示和分页
- ✅ 列排序（升序/降序/无序）
- ✅ 行选中和高亮
- ✅ 当前行聚焦
- ✅ 固定列（左/右）
- ✅ 自定义单元格渲染
- ✅ 加载状态
- ✅ 空数据状态
- ✅ 斑马纹样式
- ✅ 边框样式

## 样式架构

### 文件结构

```
mc-table/
├── index.scss          # 主样式文件
├── _variables.scss     # 变量定义
├── _mixins.scss        # 公用样式混入
└── components/         # 子组件样式
```

### 样式变量

所有样式变量都定义在 `_variables.scss` 中，包括：

- 尺寸相关：单元格内边距、最小高度等
- 字体相关：字号、行高等
- 分页相关：按钮尺寸、间距等
- 排序相关：图标尺寸、间距等
- Z-index 层级：固定列、边框、加载遮罩等

### 样式混入

公用样式混入定义在 `_mixins.scss` 中，包括：

- `table-cell-base`: 基础单元格样式
- `table-header-cell`: 表头单元格样式
- `table-alignment`: 文本对齐
- `table-fixed-position`: 固定列位置
- `table-hover-state`: 悬停状态
- `table-row-state`: 行状态样式
- `pagination-button-*`: 分页按钮相关样式
- `sort-icon-base`: 排序图标样式
- `loading-overlay`: 加载遮罩样式

### 主题变量

使用 `packages/theme/variables.css` 中定义的 CSS 变量：

- 颜色：`--mc-purple-*`, `--mc-teal-*`, `--mc-gray-*`
- 尺寸：`--mc-gap`, `--mc-radius`
- 动画：`--mc-transition-duration`

## 使用示例

### 基础用法

```vue
<template>
  <mc-table :data="tableData" :columns="columns" :pagination="pagination" @row-click="handleRowClick" @sort-change="handleSortChange" />
</template>

<script setup>
const columns = [
  { prop: "name", label: "姓名", sortable: true },
  { prop: "age", label: "年龄", sortable: true, align: "center" },
  { prop: "address", label: "地址" },
];

const tableData = [
  { name: "张三", age: 25, address: "北京市" },
  { name: "李四", age: 30, address: "上海市" },
];

const pagination = {
  currentPage: 1,
  pageSize: 10,
  total: 100,
};
</script>
```

### 高级功能

```vue
<template>
  <mc-table :data="tableData" :columns="columns" :selected-row-keys="selectedKeys" :highlight-current-row="true" :default-sort="{ prop: 'name', order: 'asc' }" border stripe @selection-change="handleSelectionChange" @current-change="handleCurrentChange" />
</template>
```

## 样式定制

### 修改主题色

在项目中覆盖 CSS 变量：

```css
:root {
  --mc-purple-500: #your-color;
  --mc-teal-500: #your-color;
}
```

### 修改组件变量

在项目中导入并覆盖 SCSS 变量：

```scss
// 覆盖默认变量
$table-cell-padding: 16px 12px;
$table-font-size: 16px;

// 导入组件样式
@import "mc-table/index.scss";
```

### 自定义样式类

组件提供了丰富的 CSS 类名用于自定义：

- `.mc-table--border`: 边框样式
- `.mc-table--stripe`: 斑马纹样式
- `.mc-table--loading`: 加载状态
- `.is-selected`: 选中行
- `.is-current`: 当前行
- `.is-sortable`: 可排序列
- `.is-sort-asc/.is-sort-desc`: 排序状态

## API 文档

详细的 API 文档请参考 `types.ts` 文件中的类型定义。
