<!--
 * @Author: Tieju yang
 * @Date: 2025-05-22 11:03:24
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-28 16:07:01
-->
<template>
  <div class="table-demo">
    <h1>MC-Table 组件演示</h1>

    <!-- 基础表格 -->
    <section class="demo-section">
      <h2>1. 基础表格</h2>
      <p class="demo-desc">最简单的表格使用方式，包含基础数据展示</p>
      <mc-table :data="basicData" :columns="basicColumns" :loading="loading" @row-click="handleRowClick" />
    </section>

    <!-- 带分页的表格 -->
    <section class="demo-section">
      <h2>2. 分页表格</h2>
      <p class="demo-desc">支持分页功能的表格，适合大数据量展示</p>
      <mc-table :data="paginatedData" :columns="basicColumns" :pagination="paginationConfig" @page-change="handlePageChange" />
    </section>

    <!-- 可排序表格 -->
    <section class="demo-section">
      <h2>3. 可排序表格</h2>
      <p class="demo-desc">支持列排序的表格，点击表头可进行排序</p>
      <mc-table :data="sortableData" :columns="sortableColumns" :default-sort="{ prop: 'age', order: 'asc' }" @sort-change="handleSortChange" />
    </section>

    <!-- 可选择表格 -->
    <section class="demo-section">
      <h2>4. 可选择表格</h2>
      <p class="demo-desc">支持行选择和全选功能的表格</p>
      <div class="selection-controls">
        <mc-button @click="clearSelection">清除选择</mc-button>
        <mc-button @click="selectAll">全选</mc-button>
        <mc-button @click="selectFirstThree">选择前3行</mc-button>
        <mc-button @click="testSelectAll">测试全选</mc-button>
        <span class="selection-info">已选择: {{ selectedRows.length }} 行</span>
      </div>
      <mc-table ref="selectableTableRef" :data="selectableData" :columns="selectableColumns" :selectable="true" :selected-rows="selectedRows" :select-on-row-click="true" :highlight-current-row="true" @selection-change="handleSelectionChange" @select="handleSelect" @current-change="handleCurrentChange" />
    </section>

    <!-- 固定列表格 -->
    <section class="demo-section">
      <h2>5. 固定列表格</h2>
      <p class="demo-desc">支持固定列的表格，适合列数较多的场景</p>
      <div class="test-tips">
        <p><strong>测试提示：</strong></p>
        <ul>
          <li>将鼠标悬浮在任意行上，观察固定列（ID、姓名、状态、操作列）是否与普通列显示相同的悬浮背景色</li>
          <li>点击任意行设置当前行高亮，观察固定列是否与普通列显示相同的高亮背景色</li>
          <li>在高亮行上悬浮鼠标，观察固定列是否与普通列显示相同的悬浮+高亮背景色</li>
        </ul>
      </div>
      <mc-table :data="fixedData" :columns="fixedColumns" :height="400" :selectable="true" :selected-rows="selectedRows" :highlight-current-row="true" @row-click="handleRowClick" @selection-change="handleSelectionChange" />
    </section>

    <!-- 合并单元格表格 -->
    <section class="demo-section">
      <h2>6. 合并单元格表格</h2>
      <p class="demo-desc">支持行合并和列合并的表格</p>
      <mc-table :data="mergeData" :columns="mergeColumns" :span-method="spanMethod" />
    </section>

    <!-- 自定义插槽表格 -->
    <section class="demo-section">
      <h2>7. 自定义插槽表格</h2>
      <p class="demo-desc">使用插槽自定义单元格内容的表格</p>
      <mc-table :data="slotData" :columns="slotColumns">
        <!-- 自定义姓名列 -->
        <template #name="{ row, value }">
          <div class="custom-name-cell">
            <div class="avatar">{{ value.charAt(0) }}</div>
            <div class="name-info">
              <div class="name">{{ value }}</div>
              <div class="email">{{ row.email }}</div>
            </div>
          </div>
        </template>

        <!-- 自定义状态列 -->
        <template #status="{ value }">
          <span :class="`status-badge status-${value}`">
            {{ getStatusText(value) }}
          </span>
        </template>

        <!-- 自定义操作列 -->
        <template #actions="{ row }">
          <div class="action-buttons">
            <mc-button size="small" @click="handleEdit(row)">编辑</mc-button>
            <mc-button size="small" type="danger" @click="handleDelete(row)">删除</mc-button>
          </div>
        </template>

        <!-- 自定义空数据 -->
        <template #empty>
          <div class="empty-state">
            <div class="empty-icon">📊</div>
            <div class="empty-text">暂无数据</div>
            <mc-button @click="loadSlotData">加载数据</mc-button>
          </div>
        </template>
      </mc-table>
    </section>

    <!-- 统一插槽表格 -->
    <section class="demo-section">
      <h2>8. 统一插槽表格</h2>
      <p class="demo-desc">使用统一的cell插槽处理所有列的内容</p>
      <mc-table :data="unifiedData" :columns="unifiedColumns">
        <template #cell="{ row, column, value }">
          <div v-if="column.prop === 'id'" class="id-cell">
            <span class="id-badge">#{{ value }}</span>
          </div>
          <div v-else-if="column.prop === 'name'" class="name-cell">
            <div class="name-tag">名</div>
            <div>{{ value }}</div>
          </div>
          <div v-else-if="column.prop === 'age'" class="age-cell">
            <span :class="getAgeClass(value)">{{ value }}岁</span>
          </div>
          <div v-else-if="column.prop === 'status'" class="status-cell">
            <span :class="`status-${value}`">
              {{ getStatusText(value) }}
            </span>
          </div>
          <div v-else-if="column.prop === 'actions'" class="action-buttons">
            <mc-button size="small" @click="handleEdit(row)">编辑</mc-button>
            <mc-button size="small" type="danger" @click="handleDelete(row)">删除</mc-button>
          </div>
          <div v-else>
            {{ value }}
          </div>
        </template>
      </mc-table>
    </section>

    <!-- 完整功能表格 -->
    <section class="demo-section">
      <h2>9. 完整功能表格</h2>
      <p class="demo-desc">集成了所有功能的完整表格示例</p>
      <div class="full-controls">
        <mc-button @click="toggleLoading">{{ loading ? "停止加载" : "开始加载" }}</mc-button>
        <mc-button @click="refreshData">刷新数据</mc-button>
        <mc-button @click="clearSelection">清除选择</mc-button>
      </div>
      <mc-table ref="fullTableRef" :data="fullData" :columns="fullColumns" :loading="loading" :selectable="true" :selected-rows="selectedRows" :highlight-current-row="true" :pagination="fullPaginationConfig" :span-method="fullSpanMethod" @page-change="handleFullPageChange" @sort-change="handleFullSortChange" @selection-change="handleSelectionChange" @row-click="handleRowClick" @header-click="handleHeaderClick">
        <!-- 自定义状态列 -->
        <template #status="{ value }">
          <span :class="`status-badge status-${value}`">
            {{ getStatusText(value) }}
          </span>
        </template>

        <!-- 自定义操作列 -->
        <template #actions="{ row }">
          <div class="action-buttons">
            <mc-button size="small" @click="handleEdit(row)">编辑</mc-button>
            <mc-button size="small" type="danger" @click="handleDelete(row)">删除</mc-button>
          </div>
        </template>
      </mc-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { McButton, McTable } from "../../../components";

// 基础数据
const basicData = ref([
  { id: 1, name: "张三", age: 25, email: "zhangsan@example.com", status: "active", address: "北京市朝阳区" },
  { id: 2, name: "李四", age: 30, email: "lisi@example.com", status: "inactive", address: "上海市浦东新区" },
  { id: 3, name: "王五", age: 28, email: "wangwu@example.com", status: "active", address: "广州市天河区" },
]);

const basicColumns = [
  { prop: "id", label: "ID", width: 80, align: "center" as const },
  { prop: "name", label: "姓名", width: 120 },
  { prop: "age", label: "年龄", width: 100, align: "center" as const },
  { prop: "email", label: "邮箱", width: 200 },
  { prop: "status", label: "状态", width: 100, align: "center" as const },
  { prop: "address", label: "地址", width: 300 },
];

// 分页数据
const paginatedData = ref([]);
const paginationConfig = ref({
  currentPage: 1,
  pageSize: 10,
  total: 100,
  pageSizes: [10, 20, 50, 100],
  background: true,
});

// 可排序数据
const sortableData = ref([
  { id: 1, name: "张三", age: 25, score: 85 },
  { id: 2, name: "李四", age: 30, score: 92 },
  { id: 3, name: "王五", age: 28, score: 78 },
  { id: 4, name: "赵六", age: 35, score: 95 },
]);

const sortableColumns = [
  { prop: "id", label: "ID", width: 80, align: "center" as const },
  { prop: "name", label: "姓名", width: 120 },
  { prop: "age", label: "年龄", width: 100, align: "center" as const, sortable: true },
  { prop: "score", label: "分数", width: 100, align: "center" as const, sortable: true },
];

// 可选择数据
const selectableData = ref([
  { id: 1, name: "张三", age: 25, status: "active" },
  { id: 2, name: "李四", age: 30, status: "inactive" },
  { id: 3, name: "王五", age: 28, status: "active" },
  { id: 4, name: "赵六", age: 35, status: "active" },
]);

const selectableColumns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "姓名", width: 120 },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "status", label: "状态", width: 100 },
];

const selectedRows = ref([]);

// 固定列数据
const fixedData = ref([
  { id: 1, name: "张三", age: 25, email: "zhangsan@example.com", phone: "13800138001", address: "北京市朝阳区", department: "技术部", position: "工程师" },
  { id: 2, name: "李四", age: 30, email: "lisi@example.com", phone: "13800138002", address: "上海市浦东新区", department: "产品部", position: "产品经理" },
  { id: 3, name: "王五", age: 28, email: "wangwu@example.com", phone: "13800138003", address: "广州市天河区", department: "设计部", position: "设计师" },
]);

const fixedColumns = [
  { prop: "id", label: "ID", width: 80, fixed: "left" as const },
  { prop: "name", label: "姓名", width: 120, fixed: "left" as const },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "email", label: "邮箱", width: 200 },
  { prop: "phone", label: "电话", width: 150 },
  { prop: "department", label: "部门", width: 150 },
  { prop: "position", label: "职位", width: 120 },
  { prop: "salary", label: "薪资", width: 100 },
  { prop: "status", label: "状态", width: 100, fixed: "right" as const },
  { prop: "actions", label: "操作", width: 120, fixed: "right" as const },
];

// 合并单元格数据
const mergeData = ref([
  { id: 1, name: "张三", subject: "语文", score: 85, term: "上学期" },
  { id: 2, name: "张三", subject: "数学", score: 90, term: "上学期" },
  { id: 3, name: "张三", subject: "英语", score: 78, term: "上学期" },
  { id: 4, name: "李四", subject: "语文", score: 82, term: "上学期" },
  { id: 5, name: "李四", subject: "数学", score: 95, term: "上学期" },
  { id: 6, name: "李四", subject: "英语", score: 88, term: "上学期" },
]);

const mergeColumns = [
  { prop: "name", label: "姓名", width: 120 },
  { prop: "subject", label: "科目", width: 120 },
  { prop: "score", label: "分数", width: 100 },
  { prop: "term", label: "学期", width: 120 },
];

// 插槽数据
const slotData = ref([
  { id: 1, name: "张三", age: 25, email: "zhangsan@example.com", status: "active" },
  { id: 2, name: "李四", age: 30, email: "lisi@example.com", status: "inactive" },
  { id: 3, name: "王五", age: 28, email: "wangwu@example.com", status: "active" },
]);

const slotColumns = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "姓名", width: 200, slot: "name" },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "status", label: "状态", width: 120, slot: "status" },
  { prop: "actions", label: "操作", width: 150, slot: "actions" },
];

// 统一插槽数据
const unifiedData = ref([
  { id: 1, name: "张三", age: 22, status: "active" },
  { id: 2, name: "李四", age: 28, status: "inactive" },
  { id: 3, name: "王五", age: 35, status: "active" },
]);

const unifiedColumns = [
  { prop: "id", label: "ID", width: 100 },
  { prop: "name", label: "姓名", width: 150 },
  { prop: "age", label: "年龄", width: 120 },
  { prop: "status", label: "状态", width: 120 },
  { prop: "actions", label: "操作", width: 150 },
];

// 完整功能数据
const fullData = ref([]);
const fullColumns = [
  { prop: "id", label: "ID", width: 80, sortable: true, fixed: "left" },
  { prop: "name", label: "姓名", width: 120, sortable: true, fixed: "left" },
  { prop: "age", label: "年龄", width: 100, sortable: true },
  { prop: "email", label: "邮箱", width: 200 },
  { prop: "phone", label: "电话", width: 150 },
  { prop: "department", label: "部门", width: 120 },
  { prop: "status", label: "状态", width: 100, slot: "status" },
  { prop: "actions", label: "操作", width: 150, slot: "actions", fixed: "right" },
];

const fullPaginationConfig = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageSizes: [10, 20, 50],
  background: true,
});

// 状态
const loading = ref(false);
const fullTableRef = ref();
const selectableTableRef = ref();

// 方法
const handleRowClick = (row: any, index: number) => {
  console.log("行点击:", row, index);
};

const handleHeaderClick = (column: any, event: Event) => {
  console.log("表头点击:", column, event);
};

const handlePageChange = (payload: any) => {
  console.log("分页变化:", payload);
  paginationConfig.value.currentPage = payload.pageNum;
  paginationConfig.value.pageSize = payload.pageSize;
  loadPaginatedData();
};

const handleSortChange = (config: any) => {
  console.log("排序变化:", config);
  // 这里可以实现实际的排序逻辑
};

const handleSelectionChange = (rows: any[]) => {
  console.log("选择变化:", rows);
  selectedRows.value = rows;
};

const handleSelect = (row: any, selected: boolean) => {
  console.log("行选择:", row, selected);
};

const handleCurrentChange = (currentRow: any) => {
  console.log("当前行变化:", currentRow);
};

const clearSelection = () => {
  selectedRows.value = [];
  selectableTableRef.value?.clearSelection();
  fullTableRef.value?.clearSelection();
};

const selectAll = () => {
  selectableTableRef.value?.toggleAllSelection(true);
};

const selectFirstThree = () => {
  selectedRows.value = selectableData.value.slice(0, 3);
};

const testSelectAll = () => {
  selectableTableRef.value?.toggleAllSelection(true);
};

const toggleLoading = () => {
  loading.value = !loading.value;
};

const refreshData = () => {
  loading.value = true;
  setTimeout(() => {
    loadFullData();
    loading.value = false;
  }, 1000);
};

const loadPaginatedData = () => {
  const { currentPage, pageSize } = paginationConfig.value;
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  paginatedData.value = Array.from({ length: pageSize }, (_, index) => ({
    id: start + index + 1,
    name: `用户${start + index + 1}`,
    age: 20 + Math.floor(Math.random() * 40),
    email: `user${start + index + 1}@example.com`,
    status: Math.random() > 0.5 ? "active" : "inactive",
    address: `地址${start + index + 1}`,
  }));
};

const loadSlotData = () => {
  slotData.value = [
    { id: 1, name: "张三", age: 25, email: "zhangsan@example.com", status: "active" },
    { id: 2, name: "李四", age: 30, email: "lisi@example.com", status: "inactive" },
    { id: 3, name: "王五", age: 28, email: "wangwu@example.com", status: "active" },
  ];
};

const loadFullData = () => {
  fullData.value = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `员工${index + 1}`,
    age: 20 + Math.floor(Math.random() * 40),
    email: `employee${index + 1}@company.com`,
    phone: `138${String(Math.floor(Math.random() * 100000000)).padStart(8, "0")}`,
    department: ["技术部", "产品部", "设计部", "运营部", "市场部"][Math.floor(Math.random() * 5)],
    status: Math.random() > 0.5 ? "active" : "inactive",
  }));
  fullPaginationConfig.value.total = 50;
};

const handleFullPageChange = (payload: any) => {
  console.log("完整表格分页变化:", payload);
  fullPaginationConfig.value.currentPage = payload.pageNum;
  fullPaginationConfig.value.pageSize = payload.pageSize;
  loadFullData();
};

const handleFullSortChange = (config: any) => {
  console.log("完整表格排序变化:", config);
};

const handleEdit = (row: any) => {
  alert(`编辑: ${row.name}`);
};

const handleDelete = (row: any) => {
  if (confirm(`确定要删除 ${row.name} 吗？`)) {
    console.log("删除:", row);
  }
};

// 合并单元格方法
const spanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
  if (columnIndex === 0) {
    const currentName = mergeData.value[rowIndex]?.name;
    if (!currentName) return { rowspan: 1, colspan: 1 };

    let startIndex = rowIndex;
    let endIndex = rowIndex;

    while (startIndex > 0 && mergeData.value[startIndex - 1]?.name === currentName) {
      startIndex--;
    }

    while (endIndex < mergeData.value.length - 1 && mergeData.value[endIndex + 1]?.name === currentName) {
      endIndex++;
    }

    const spanCount = endIndex - startIndex + 1;
    const isFirstRowOfGroup = rowIndex === startIndex;

    if (isFirstRowOfGroup) {
      return { rowspan: spanCount, colspan: 1 };
    } else {
      return { rowspan: 0, colspan: 0 };
    }
  }

  return { rowspan: 1, colspan: 1 };
};

const fullSpanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
  // 这里可以实现更复杂的合并逻辑
  return { rowspan: 1, colspan: 1 };
};

// 工具方法
const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    active: "活跃",
    inactive: "非活跃",
  };
  return statusMap[status] || status;
};

const getAgeClass = (age: number) => {
  if (age < 25) return "age-young";
  if (age < 35) return "age-middle";
  return "age-old";
};

// 初始化
onMounted(() => {
  loadPaginatedData();
  loadFullData();
});
</script>

<style scoped>
.table-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 40px;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background: #fff;
}

h2 {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
}

.demo-desc {
  margin: 0 0 20px 0;
  color: #666;
  font-size: 14px;
}

.selection-controls,
.full-controls {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.selection-info {
  margin-left: 15px;
  color: #666;
  font-size: 14px;
}

/* 自定义单元格样式 */
.custom-name-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.name-info {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 500;
}

.email {
  font-size: 12px;
  color: #999;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-active {
  background: #f6ffed;
  color: #52c41a;
}

.status-inactive {
  background: #fff2f0;
  color: #ff4d4f;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

/* 统一插槽样式 */
.id-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.id-badge {
  display: inline-block;
  padding: 2px 8px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-tag {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background: #409eff;
  color: white;
  border-radius: 4px;
  font-size: 12px;
}

.age-cell {
  text-align: center;
}

.age-young {
  color: #52c41a;
  font-weight: 500;
}

.age-middle {
  color: #1890ff;
  font-weight: 500;
}

.age-old {
  color: #fa8c16;
  font-weight: 500;
}

.status-cell {
  text-align: center;
}

/* 空状态样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  color: #999;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
  margin-bottom: 16px;
}

.test-tips {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background: #fff;
}

.test-tips p {
  margin: 0 0 10px 0;
  font-weight: 500;
}

.test-tips ul {
  margin: 0;
  padding-left: 20px;
}

.test-tips li {
  margin-bottom: 5px;
}
</style>
