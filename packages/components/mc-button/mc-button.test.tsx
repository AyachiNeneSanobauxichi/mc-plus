import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import McButton from "./mc-button.vue";

describe("mc-button", () => {
  it("should has the correct type class when type prop is set", () => {
    const types = ["primary", "success", "warning", "danger", "info"];
    types.forEach((type) => {
      const wrapper = mount(McButton, {
        props: { type },
      });
      expect(wrapper.classes()).toContain(`mc-button--${type}`);
    });
  });
});
