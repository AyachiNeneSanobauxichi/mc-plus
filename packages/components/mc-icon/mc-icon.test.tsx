import type { IconType } from "./types";
import { describe, expect, it, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import McIcon from "./mc-icon.vue";
import { McIcon as _McIcon } from "./index";

describe("mc-icon installer", () => {
  test("icon installer", () => {
    expect(_McIcon.name).toBe("McIcon");
    expect(_McIcon).toHaveProperty("install");
  });
});

describe("mc-icon", () => {
  // icon name
  it("should has the correct name class when name is set", () => {
    const iconNames: IconType[] = ["arrow-left", "arrow-right"];
    iconNames.forEach((icon) => {
      const wrapper = mount(() => <McIcon name={icon} />);
      expect(wrapper.classes()).toContain(`mc-iconfont`);
      expect(wrapper.classes()).toContain(`mc-icon--${icon}`);
    });
  });

  // icon click
  test("icon click", async () => {
    const onClick = vi.fn();
    const wrapper = mount(() => <McIcon name="arrow-left" {...{ onClick }} />);
    await wrapper.get("i").trigger("click");
    expect(onClick).toHaveBeenCalledOnce();
  });
});
