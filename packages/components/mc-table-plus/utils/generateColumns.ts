import type { Component, Slots, VNode, VNodeNormalizedChildren } from "vue";
import type { McTableColumn, McTableColumnProps } from "../types";
import { isArray, isString } from "lodash-es";
import { MC_TABLE_COLUMN, MC_TABLE_DEFAULT_PROPS } from "../constant";

// generate columns
const generateColumns = (
  children?: VNodeNormalizedChildren
): McTableColumn[] => {
  // columns
  const _columns: McTableColumn[] = [];

  // flatten nodes
  const _flattenNodes = (children?: VNodeNormalizedChildren) => {
    if (!isArray(children)) return;
    (children as VNode[]).forEach((item) => {
      const name = ((item?.type || {}) as Component)?.name;
      if (name === MC_TABLE_COLUMN) {
        const slots = item.children as Slots;
        const props = item.props as McTableColumnProps | undefined;
        _columns.push({
          prop: props?.prop,
          label: props?.label,
          desc: props?.desc,
          width: props?.width,
          fixed: props?.fixed || MC_TABLE_DEFAULT_PROPS.fixed,
          sortable:
            (isString(props?.sortable) && props.sortable === "") ||
            props?.sortable ||
            MC_TABLE_DEFAULT_PROPS.sortable,
          columnAlign:
            props?.columnAlign ||
            (props as any)?.["column-align"] ||
            MC_TABLE_DEFAULT_PROPS.columnAlign,
          headerTitle: slots?.["header-title"],
          headerDesc: slots?.["header-desc"],
          header: slots?.["header"],
          tableValue: slots?.["default"],
          tableValueContent: slots?.["value"],
        } as McTableColumn);
      } else if (Array.isArray(item.children)) {
        _flattenNodes(item.children);
      }
    });
  };

  _flattenNodes(children);

  console.log("Columns: ", _columns);

  return _columns;
};

export default generateColumns;
