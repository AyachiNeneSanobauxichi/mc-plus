import { mount } from "@vue/test-utils";
import { describe, expect, it, test, vi } from "vitest";
import { McTag as _McTag } from ".";
import McTag from "./mc-tag.vue";
import type { TagRadius, TagType } from "./types";

describe("mc-tag installer", () => {
  test("tag installer", () => {
    expect(_McTag.name).toBe("McTag");
    expect(_McTag).toHaveProperty("install");
  });
});

describe("mc-tag", () => {
  // tag basic
  test("tag basic", async () => {
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <McTag type="primary" {...{ onClick }}>
        Tag Text
      </McTag>
    ));

    // class
    expect(wrapper.classes()).toContain("mc-tag");
    // slot
    expect(wrapper.get("div").text()).toBe("Tag Text");
    // events
    await wrapper.get("div").trigger("click");
    expect(onClick).toHaveBeenCalledOnce();
  });

  // tag disable
  test("tag disable", async () => {
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <McTag type="primary" {...{ onClick }} disabled>
        Tag Text
      </McTag>
    ));

    // class
    expect(wrapper.classes()).toContain("is-disabled");
    // events
    await wrapper.get("div").trigger("click");
    expect(onClick).not.toHaveBeenCalled();
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  // tag closable
  test("tag closable", async () => {
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <McTag type="primary" closable {...{ onClose }}>
        Tag Text
      </McTag>
    ));

    // close icon
    expect(wrapper.find(".close-icon").exists()).toBe(true);
    // events
    await wrapper.find(".close-icon").trigger("click");
    expect(onClose).toHaveBeenCalledOnce();
  });

  // tag with icon
  test("tag with icon", () => {
    const wrapper = mount(() => (
      <McTag type="primary" icon="Star">
        Tag Text
      </McTag>
    ));

    // icon
    expect(wrapper.find(".mc-icon--Star").exists()).toBe(true);
  });

  // tag style
  it("should has the correct style when custom style is set", () => {
    const wrapper = mount(() => (
      <McTag width="100px" height="30px" type="primary">
        Tag Text
      </McTag>
    ));

    const _tag = wrapper.get("div");
    // style
    expect(_tag.attributes("style")).toContain("width: 100px;");
    expect(_tag.attributes("style")).toContain("height: 30px;");
  });

  // tag selected
  test("tag selected", () => {
    const wrapper = mount(() => (
      <McTag type="primary" selected>
        Tag Text
      </McTag>
    ));

    // class
    expect(wrapper.classes()).toContain("is-selected");
  });

  // tag type
  it("should has the correct type class when type prop is set", () => {
    const types: TagType[] = ["primary", "plain", "dark"];
    types.forEach((type) => {
      const wrapper = mount(McTag, {
        props: { type },
      });
      expect(wrapper.classes()).toContain(`mc-tag--${type}`);
    });
  });

  // tag with custom color
  test("tag with custom color", () => {
    const wrapper = mount(() => (
      <McTag type="primary" color="#ff0000">
        Tag Text
      </McTag>
    ));

    const _tag = wrapper.get("div");
    expect(_tag.attributes("style")).toContain("--mc-tag-custom-color: #ff0000");
    expect(_tag.attributes("style")).toContain("--mc-tag-custom-hover-color: #ff0000");
  });

  // tag radius
  it("should has the correct radius class when radius prop is set", () => {
    const radiusTypes: TagRadius[] = ["default", "round"];
    radiusTypes.forEach((radius) => {
      const wrapper = mount(McTag, {
        props: { radius },
      });
      expect(wrapper.classes()).toContain(`mc-tag--radius-${radius}`);
    });
  });
});