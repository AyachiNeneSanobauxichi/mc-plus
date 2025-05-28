import { mount } from "@vue/test-utils";
import { describe, expect, it, test, vi } from "vitest";
import { McTag as _McTag } from ".";
import McTag from "./mc-tag.vue";
import type { TagRadius, TagSize, TagType } from "./types";

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
    expect(wrapper.text()).toBe("Tag Text");
    // events
    await wrapper.trigger("click");
    expect(onClick).toHaveBeenCalledOnce();
  });

  // tag disabled
  test("tag disabled", async () => {
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <McTag type="primary" {...{ onClick }} disabled>
        Tag Text
      </McTag>
    ));

    // class
    expect(wrapper.classes()).toContain("is-disabled");
    // events
    await wrapper.trigger("click");
    expect(onClick).not.toHaveBeenCalled();
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

  // tag closable
  test("tag closable", () => {
    const wrapper = mount(() => (
      <McTag type="primary" closable>
        Tag Text
      </McTag>
    ));

    // close icon
    expect(wrapper.find(".mc-tag__close-icon").exists()).toBe(true);
  });

  // tag close event
  test("tag close event", async () => {
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <McTag type="primary" closable {...{ onClose }}>
        Tag Text
      </McTag>
    ));

    // events
    await wrapper.find(".mc-tag__close-icon").trigger("click");
    expect(onClose).toHaveBeenCalledOnce();
  });

  // tag with icon
  test("tag with icon", () => {
    const wrapper = mount(() => (
      <McTag type="primary" icon="Corner_Arrow_Left">
        Tag Text
      </McTag>
    ));

    // icon
    expect(wrapper.find(".mc-icon").exists()).toBe(true);
  });

  // tag style
  it("should have the correct style when custom style is set", () => {
    const wrapper = mount(() => (
      <McTag width="300px" height="50px" type="primary">
        Tag Text
      </McTag>
    ));

    // style
    expect(wrapper.attributes("style")).toContain("width: 300px");
    expect(wrapper.attributes("style")).toContain("height: 50px");
  });

  // tag type
  it("should have the correct type class when type prop is set", () => {
    const types: TagType[] = ["primary", "plain"];
    types.forEach((type) => {
      const wrapper = mount(McTag, {
        props: { type },
      });
      expect(wrapper.classes()).toContain(`mc-tag--${type}`);
    });
  });

  // tag size
  it("should have the correct size class when size prop is set", () => {
    const sizes: TagSize[] = ["small", "medium", "large"];
    sizes.forEach((size) => {
      const wrapper = mount(McTag, {
        props: { size },
      });
      expect(wrapper.classes()).toContain(`mc-tag--${size}`);
    });
  });

  // tag radius
  it("should have the correct radius class when radius prop is set", () => {
    const radiuses: TagRadius[] = ["default", "round", "circle", "square"];
    radiuses.forEach((radius) => {
      const wrapper = mount(McTag, {
        props: { radius },
      });
      expect(wrapper.classes()).toContain(`mc-tag-radius--${radius}`);
    });
  });

  // tag with custom colors
  test("tag with custom colors", () => {
    const wrapper = mount(() => (
      <McTag 
        type="primary" 
        backgroundColor="#ff0000" 
        textColor="#ffffff"
        selectedBackgroundColor="#0000ff" 
        selectedTextColor="#f0f0f0"
      >
        Tag Text
      </McTag>
    ));

    // style
    expect(wrapper.attributes("style")).toContain("--tag-color: #ff0000");
    expect(wrapper.attributes("style")).toContain("--tag-text-color: #ffffff");
    expect(wrapper.attributes("style")).toContain("--tag-hover-color: #0000ff");
    expect(wrapper.attributes("style")).toContain("--tag-hover-text-color: #f0f0f0");
  });
}); 