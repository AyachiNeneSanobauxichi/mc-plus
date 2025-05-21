import { mount } from "@vue/test-utils";
import { describe, expect, it, test, vi } from "vitest";
import { McAlert as _McAlert } from ".";
import McAlert from "./mc-alert.vue";
import type { AlertType } from "./types";

describe("mc-alert installer", () => {
  test("alert installer", () => {
    expect(_McAlert.name).toBe("McAlert");
    expect(_McAlert).toHaveProperty("install");
  });
});

describe("mc-alert", () => {
  // alert basic
  test("alert basic", async () => {
    const wrapper = mount(() => (
      <McAlert type="info">
        Alert Content
      </McAlert>
    ));

    // class
    expect(wrapper.classes()).toContain("mc-alert");
    // slot
    expect(wrapper.text()).toContain("Alert Content");
  });

  // alert with title and description
  test("alert with title and description", () => {
    const wrapper = mount(() => (
      <McAlert
        type="info"
        title="Test Alert"
        description="This is a description"
      />
    ));

    // class
    expect(wrapper.find(".mc-alert__title").text()).toBe("Test Alert");
    expect(wrapper.find(".mc-alert__description").text()).toBe("This is a description");
  });

  // alert closable
  test("alert closable", async () => {
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <McAlert type="info" closable {...{ onClose }}>
        Alert Content
      </McAlert>
    ));

    // close icon
    expect(wrapper.find(".mc-alert__close").exists()).toBe(true);
    // events
    await wrapper.find(".mc-alert__close").trigger("click");
    expect(onClose).toHaveBeenCalledOnce();
  });

  // alert with icon
  test("alert with icon", () => {
    const wrapper = mount(() => (
      <McAlert type="success" showIcon>
        Alert Content
      </McAlert>
    ));

    // icon
    expect(wrapper.find(".mc-alert__icon").exists()).toBe(true);
    expect(wrapper.find(".mc-icon--Accept_02").exists()).toBe(true);
  });

  // alert without icon
  test("alert without icon", () => {
    const wrapper = mount(() => (
      <McAlert type="success" showIcon={false}>
        Alert Content
      </McAlert>
    ));

    // icon
    expect(wrapper.find(".mc-alert__icon").exists()).toBe(false);
  });

  // alert style
  it("should has the correct style when custom style is set", () => {
    const wrapper = mount(() => (
      <McAlert width="300px" height="100px" type="info">
        Alert Content
      </McAlert>
    ));

    const _alert = wrapper.get("div");
    // style
    expect(_alert.attributes("style")).toContain("width: 300px;");
    expect(_alert.attributes("style")).toContain("height: 100px;");
  });

  // alert type
  it("should has the correct type class when type prop is set", () => {
    const types: AlertType[] = ["success", "info", "warning", "error"];
    types.forEach((type) => {
      const wrapper = mount(McAlert, {
        props: { type },
      });
      expect(wrapper.classes()).toContain(`mc-alert--${type}`);
    });
  });
});