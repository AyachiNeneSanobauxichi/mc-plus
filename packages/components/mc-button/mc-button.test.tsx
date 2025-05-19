import { describe, it, expect, vi, test } from "vitest";
import { mount } from "@vue/test-utils";
import McButton from "./mc-button.vue";
import type { ButtonType } from "./types";

describe("mc-button", () => {
  // button basic
  test("button basic", async () => {
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <McButton type="primary" {...{ onClick }}>
        Mc Button
      </McButton>
    ));

    // class
    expect(wrapper.classes()).toContain("mc-button");
    // slot
    expect(wrapper.get("button").text()).toBe("Mc Button");
    // events
    await wrapper.get("button").trigger("click");
    expect(onClick).toHaveBeenCalledOnce();
  });

  // button disable
  test("button disable", async () => {
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <McButton type="primary" {...{ onClick }} disabled>
        Mc Button
      </McButton>
    ));

    // class
    expect(wrapper.classes()).toContain("is-disabled");
    // attrs
    expect(wrapper.get("button").attributes("disabled")).toBeDefined();
    // events
    await wrapper.get("button").trigger("click");
    expect(onClick).not.toHaveBeenCalled();
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  // button loading
  test("button loading", async () => {
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <McButton type="primary" {...{ onClick }} loading>
        Mc Button
      </McButton>
    ));

    // class
    expect(wrapper.classes()).toContain("is-loading");
    // attrs
    expect(wrapper.get("button").attributes("disabled")).toBeDefined();
    // icon
    expect(wrapper.find(".mc-icon--loading-dot").exists()).toBe(true);
    // events
    await wrapper.get("button").trigger("click");
    expect(onClick).not.toHaveBeenCalled();
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  // button unthrottle
  test("button unthrottle", async () => {
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <McButton type="primary" useThrottle={false} {...{ onClick }}>
        Mc Button
      </McButton>
    ));

    const _button = wrapper.get("button");
    await _button.trigger("click");
    await _button.trigger("click");
    await _button.trigger("click");
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  // button icon
  test("button icon", () => {
    const previousButton = mount(() => (
      <McButton type="primary" leftIcon="arrow-left">
        previous step
      </McButton>
    ));
    const nextButton = mount(() => (
      <McButton type="primary" rightIcon="arrow-right">
        next step
      </McButton>
    ));

    // icon
    expect(previousButton.find(".mc-icon--arrow-left").exists()).toBe(true);
    expect(nextButton.find(".mc-icon--arrow-right").exists()).toBe(true);
  });

  // button style
  it("should has the correct style when custom style is set", () => {
    const wrapper = mount(() => (
      <McButton width="300px" height="50px" type="primary">
        Mc Button
      </McButton>
    ));

    const _button = wrapper.get("button");
    // style
    expect(_button.attributes("style")).toContain("width: 300px;");
    expect(_button.attributes("style")).toContain("height: 50px;");
  });

  // button type
  it("should has the correct type class when type prop is set", () => {
    const types: ButtonType[] = ["primary", "plain", "link"];
    types.forEach((type) => {
      const wrapper = mount(McButton, {
        props: { type },
      });
      expect(wrapper.classes()).toContain(`mc-button--${type}`);
    });
  });
});
