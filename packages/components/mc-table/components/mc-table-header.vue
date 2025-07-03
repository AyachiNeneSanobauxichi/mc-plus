<!--
 * @Author: Tieju yang
 * @Date: 2025-05-26 13:39:17
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-28 14:29:12
-->
<template>
  <div class="mc-table__header-wrapper" ref="headerWrapper" v-if="showHeader">
    <table class="mc-table__header" cellspacing="0" cellpadding="0" border="0">
      <colgroup>
        <col v-if="selectable" width="50" />
        <col
          v-for="(column, index) in columns"
          :key="index"
          :width="column.width"
        />
      </colgroup>
      <thead>
        <tr>
          <!-- 选择列表头 -->
          <th v-if="selectable" class="mc-table__selection-column">
            <div class="mc-table__header-cell">
              <mc-checkbox
                :model-value="isAllSelected"
                :partial="isIndeterminate"
                @change="handleSelectAll"
              />
            </div>
          </th>

          <th
            v-for="(column, index) in columns"
            :key="index"
            :class="getHeaderCellClasses(column)"
            @click="handleHeaderClick(column, $event)"
          >
            <div
              class="mc-table__header-cell"
              :class="`mc-table__header-cell-${column.align}`"
            >
              <span class="mc-table__header-label">
                <slot
                  :name="`header-${column.slot || column.prop}`"
                  :column="column"
                  :index="index"
                >
                  {{ column.label }}
                </slot>
              </span>

              <!-- 排序图标 -->
              <span v-if="column.sortable" class="mc-table__sort-caret">
                <mc-icon
                  v-if="getSortOrder(column.prop) === 'asc'"
                  name="Up-Chevron02"
                  class="mc-table__sort-icon"
                  :class="{ 'is-active': getSortOrder(column.prop) === 'asc' }"
                ></mc-icon>
                <mc-icon
                  v-else
                  name="Down-Chevron02"
                  class="mc-table__sort-icon"
                  :class="{ 'is-active': getSortOrder(column.prop) === 'desc' }"
                ></mc-icon>
              </span>
            </div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { McCheckbox } from "../../mc-checkbox";
import mcIcon from "../../mc-icon/mc-icon.vue";
import type {
  McTableHeaderProps,
  TableColumn,
  TableHeaderEmits,
} from "../types";

const props = withDefaults(defineProps<McTableHeaderProps>(), {
  showHeader: true,
  getSortOrder: () => null,
  selectable: false,
  isAllSelected: false,
  isIndeterminate: false,
});

const emit = defineEmits<TableHeaderEmits>();

const headerWrapper = ref<HTMLDivElement>();

// 获取表头单元格样式类
const getHeaderCellClasses = (column: TableColumn): string[] => {
  const classes: string[] = [];

  if (column.headerClassName) {
    classes.push(column.headerClassName);
  }

  if (column.align) {
    classes.push(`is-${column.align}`);
  }

  if (column.fixed) {
    const fixedPosition =
      typeof column.fixed === "boolean" ? "left" : column.fixed;
    classes.push(`is-fixed-${fixedPosition}`);
  }

  if (column.sortable) {
    classes.push("is-sortable");
  }

  const sortClass = getSortClass(column.prop);
  if (sortClass) {
    classes.push(sortClass);
  }

  return classes;
};

// 获取排序样式类
const getSortClass = (prop: string): string => {
  const order = props.getSortOrder(prop);
  if (order === "asc") return "is-sort-asc";
  if (order === "desc") return "is-sort-desc";
  return "";
};

// 事件处理
const handleHeaderClick = (column: TableColumn, event: Event) => {
  // 如果是可排序的列，处理排序
  if (column.sortable) {
    emit("sort-change", column);
  }

  emit("header-click", column, event);
};

const handleSelectAll = (selected: boolean) => {
  emit("select-all", selected);
};

defineExpose({
  headerWrapper,
});
</script>

<style scoped lang="scss">
@use "../index.scss";
</style>
