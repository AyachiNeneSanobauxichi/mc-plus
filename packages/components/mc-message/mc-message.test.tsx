import { mount } from "@vue/test-utils";
import { describe, expect, it, test, vi } from "vitest";
import { McMessage as _McMessage } from ".";
import McMessage from "./mc-message.vue";
import type { MessageType } from "./types";

describe("mc-message installer", () => {
  test("message installer", () => {
    expect(_McMessage.name).toBe("McMessage");
    expect(_McMessage).toHaveProperty("install");
  });
});

describe("mc-message", () => {
  // message basic
  test("message basic", async () => {
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <McMessage type="info" message="Test Message" {...{ onClose }} />
    ));

    // class
    expect(wrapper.classes()).toContain("mc-message");
    // content
    expect(wrapper.find(".mc-message__title").text()).toBe("Test Message");
  });

  // message with description
  test("message with description", () => {
    const wrapper = mount(() => (
      <McMessage
        type="info"
        message="Test Message"
        description="This is a description"
      />
    ));

    // class
    expect(wrapper.find(".mc-message__title").text()).toBe("Test Message");
    expect(wrapper.find(".mc-message__description").text()).toBe("This is a description");
  });

  // message closable
  test("message closable", async () => {
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <McMessage
        type="info"
        message="Test Message"
        closable
        {...{ onClose }}
      />
    ));

    // close icon
    expect(wrapper.find(".mc-message__close").exists()).toBe(true);
    // events
    await wrapper.find(".mc-message__close").trigger("click");
    expect(onClose).toHaveBeenCalledOnce();
  });

  // message with icon
  test("message with icon", () => {
    const wrapper = mount(() => (
      <McMessage type="success" message="Test Message" showIcon />
    ));

    // icon
    expect(wrapper.find(".mc-message__icon").exists()).toBe(true);
    expect(wrapper.find(".mc-icon--Accept_02").exists()).toBe(true);
  });

  // message without icon
  test("message without icon", () => {
    const wrapper = mount(() => (
      <McMessage type="success" message="Test Message" showIcon={false} />
    ));

    // icon
    expect(wrapper.find(".mc-message__icon").exists()).toBe(false);
  });

  // message type
  it("should has the correct type class when type prop is set", () => {
    const types: MessageType[] = ["success", "info", "warning", "error"];
    types.forEach((type) => {
      const wrapper = mount(McMessage, {
        props: { type, message: "Test" },
      });
      expect(wrapper.classes()).toContain(`mc-message--${type}`);
    });
  });

  // message auto close
  test("message auto close", async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    mount(() => (
      <McMessage
        type="info"
        message="Test Message"
        duration={1000}
        {...{ onClose }}
      />
    ));

    await vi.advanceTimersByTime(1100);
    expect(onClose).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });
});