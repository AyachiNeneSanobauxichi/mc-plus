import { describe, expect, vi, test } from "vitest";
import { mount } from "@vue/test-utils";
import McSwitch from "./mc-switch.vue";
import { McSwitch as _McSwitch } from ".";

describe("mc-switch installer", () => {
  test("switch installer", () => {
    expect(_McSwitch.name).toBe("McSwitch");
    expect(_McSwitch).toHaveProperty("install");
  });
});

describe("mc-switch", () => {
  // switch basic
  test("switch basic", async () => {
    const wrapper = mount(() => <McSwitch modelValue={false}>Switch</McSwitch>);

    // class
    expect(wrapper.find(".mc-switch").exists()).toBe(true);
    // slot
    expect(wrapper.find(".mc-switch-label").text()).toBe("Switch");
    // initial state
    expect(wrapper.classes()).not.toContain("is-active");
  });

  // switch toggle
  test("switch toggle", async () => {
    const wrapper = mount(McSwitch, {
      props: {
        modelValue: false,
        "onUpdate:modelValue": (val: boolean) => {
          wrapper.setProps({ modelValue: val });
        },
      },
    });

    // initial state
    expect(wrapper.find(".is-active").exists()).toBe(false);

    // click to toggle
    await wrapper.find("input").trigger("change");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([true]);

    // state after props update
    await wrapper.setProps({ modelValue: true });
    expect(wrapper.find(".is-active").exists()).toBe(true);
  });

  // switch disabled
  test("switch disabled", async () => {
    const wrapper = mount(() => <McSwitch modelValue={false} disabled>Switch</McSwitch>);

    // class
    expect(wrapper.find(".is-disabled").exists()).toBe(true);
    // attrs
    expect(wrapper.find("input").attributes("disabled")).toBeDefined();
    // try to toggle
    await wrapper.find("input").trigger("change");
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  // switch with text
  test("switch with text", () => {
    const wrapper = mount(() => (
      <McSwitch modelValue={false} onText="ON" offText="OFF"></McSwitch>
    ));

    // text
    expect(wrapper.find(".mc-switch-text").exists()).toBe(true);
    console.log('Text: ', wrapper.find(".mc-switch-text").text());
    expect(wrapper.find(".mc-switch-text").text()).toBe("OFF");
  });

  // switch with label
  test("switch with label", () => {
    const wrapper = mount(McSwitch, {
      props: {
        modelValue: false,
        label: "switch",
      },
    });

    // label display
    expect(wrapper.find(".mc-switch-label").text()).toBe("switch");
  });

  // switch update modelValue
  test("switch update modelValue", async () => {
    const onUpdateModelValue = vi.fn();
    const wrapper = mount(McSwitch, {
      props: {
        modelValue: false,
        "onUpdate:modelValue": onUpdateModelValue,
      },
    });

    await wrapper.find("input").trigger("change");
    expect(onUpdateModelValue).toHaveBeenCalledOnce();
    expect(onUpdateModelValue).toHaveBeenCalledWith(true);
  });
}); 