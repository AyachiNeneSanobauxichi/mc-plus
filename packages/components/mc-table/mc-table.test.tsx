import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { McTable } from ".";
import type { TableColumn } from "./types";

const createTable = (props = {}) => {
  return mount(McTable, {
    props: {
      data: [
        { id: 1, name: "张三", age: 20, address: "北京市朝阳区" },
        { id: 2, name: "李四", age: 25, address: "上海市浦东新区" },
        { id: 3, name: "王五", age: 30, address: "广州市天河区" },
      ],
      columns: [
        { prop: "id", label: "ID", width: 80 },
        { prop: "name", label: "姓名", width: 120 },
        { prop: "age", label: "年龄", width: 100 },
        { prop: "address", label: "地址" },
      ],
      ...props,
    },
  });
};

describe("McTable", () => {
  it("renders table correctly", () => {
    const wrapper = createTable();
    expect(wrapper.find(".mc-table").exists()).toBe(true);
    expect(wrapper.findAll("tbody tr").length).toBe(3);
    expect(wrapper.findAll("thead th").length).toBe(4);
  });

  it("renders border style when border is true", () => {
    const wrapper = createTable({ border: true });
    expect(wrapper.find(".mc-table--border").exists()).toBe(true);
  });

  it("renders stripe style when stripe is true", () => {
    const wrapper = createTable({ stripe: true });
    expect(wrapper.find(".mc-table--stripe").exists()).toBe(true);
  });

  it("renders empty text when no data", () => {
    const wrapper = createTable({ data: [] });
    expect(wrapper.find(".mc-table__empty-cell").text()).toBe("暂无数据");
  });

  it("renders custom empty text", () => {
    const wrapper = createTable({ data: [], emptyText: "没有数据" });
    expect(wrapper.find(".mc-table__empty-cell").text()).toBe("没有数据");
  });

  it("emits row-click event when row is clicked", async () => {
    const wrapper = createTable();
    await wrapper.findAll("tbody tr")[0].trigger("click");
    const emitted = wrapper.emitted("row-click");
    expect(emitted).toBeTruthy();
    expect(emitted![0][0]).toEqual({ id: 1, name: "张三", age: 20, address: "北京市朝阳区" });
    expect(emitted![0][1]).toBe(0);
  });

  it("emits header-click event when header is clicked", async () => {
    const wrapper = createTable();
    await wrapper.findAll("thead th")[0].trigger("click");
    const emitted = wrapper.emitted("header-click");
    expect(emitted).toBeTruthy();
    expect((emitted![0][0] as TableColumn).prop).toBe("id");
  });

  it("renders pagination when pagination is provided", () => {
    const wrapper = createTable({
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 100,
      },
    });
    expect(wrapper.find(".mc-table__pagination").exists()).toBe(true);
    expect(wrapper.find(".mc-table__pagination-info").text()).toBe("共 100 条");
  });
}); 