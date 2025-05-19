import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import McButton from "./mc-button.vue";
import type { ButtonType } from "./types";

describe("mc-button", () => {
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
