import { mount } from "@vue/test-utils";
import { describe, expect, it, test, vi } from "vitest";
import { nextTick, ref } from "vue";
import { McRadio as _McRadio, McRadioGroup as _McRadioGroup } from ".";
import McRadioGroup from "./mc-radio-group.vue";
import McRadio from "./mc-radio.vue";
import type { RadioSize } from "./types";

describe("mc-radio installer", () => {
  test("radio installer", () => {
    expect(_McRadio.name).toBe("McRadio");
    expect(_McRadio).toHaveProperty("install");
    expect(_McRadioGroup.name).toBe("McRadioGroup");
    expect(_McRadioGroup).toHaveProperty("install");
  });
});

describe("mc-radio", () => {
  // radio basic
  test("radio basic", async () => {
    const onChange = vi.fn();
    const value = ref("1");
    const wrapper = mount(() => (
      <McRadio 
        modelValue={value.value} 
        value="1" 
        onChange={onChange}
        onUpdate:modelValue={(val) => value.value = val as string}
      >
        Option 1
      </McRadio>
    ));

    // class
    expect(wrapper.classes()).toContain("mc-radio");
    // slot
    expect(wrapper.get("label").text()).toBe("Option 1");
    expect(wrapper.classes()).toContain("is-checked");
    
    // change value
    const radioInput = wrapper.find('input[type="radio"]');
    expect(radioInput.exists()).toBe(true);
    
    // change event
    await radioInput.setValue(false);
    await radioInput.setValue(true);
    expect(onChange).toHaveBeenCalled();
    expect(value.value).toBe("1");
  });

  // radio disable
  test("radio disable", async () => {
    const onChange = vi.fn();
    const value = ref("");
    const wrapper = mount(() => (
      <McRadio 
        modelValue={value.value} 
        value="1" 
        onChange={onChange}
        onUpdate:modelValue={(val) => value.value = val as string}
        disabled
      >
        Option 1
      </McRadio>
    ));

    // class
    expect(wrapper.classes()).toContain("is-disabled");
    // attrs
    expect(wrapper.find('input[type="radio"]').attributes("disabled")).toBeDefined();
    
    // try to change disabled radio
    await wrapper.find('input[type="radio"]').setValue(true);
    expect(onChange).not.toHaveBeenCalled();
    expect(value.value).toBe("");
  });

  // radio sizes
  it("should have the correct size class when size prop is set", () => {
    const sizes: RadioSize[] = ["small", "medium", "large"];
    sizes.forEach((size) => {
      const wrapper = mount(McRadio, {
        props: { size },
      });
      expect(wrapper.classes()).toContain(`mc-radio--${size}`);
    });
  });

  // radio border
  test("radio border", () => {
    const wrapper = mount(() => (
      <McRadio modelValue="1" value="1" border>
        Option 1
      </McRadio>
    ));

    // class
    expect(wrapper.classes()).toContain("is-bordered");
  });
});

describe("mc-radio-group", () => {
  // radio group basic
  test("radio group basic", async () => {
    const onChange = vi.fn();
    const value = ref("1");
    const wrapper = mount(() => (
      <McRadioGroup 
        modelValue={value.value} 
        onChange={onChange}
        onUpdate:modelValue={(val) => value.value = val as string}
      >
        <McRadio value="1">Option 1</McRadio>
        <McRadio value="2">Option 2</McRadio>
        <McRadio value="3">Option 3</McRadio>
      </McRadioGroup>
    ));

    // class
    expect(wrapper.classes()).toContain("mc-radio-group");
    
    // default value
    const radios = wrapper.findAllComponents(McRadio);
    expect(radios.length).toBe(3);
    expect(radios[0].classes()).toContain("is-checked");
    
    // change selection
    await radios[1].find('input[type="radio"]').setValue(true);
    await nextTick();
    expect(value.value).toBe("2");
    expect(onChange).toHaveBeenCalledWith("2");
    expect(radios[1].classes()).toContain("is-checked");
    expect(radios[0].classes()).not.toContain("is-checked");
  });

  // radio group disabled
  test("radio group disabled", async () => {
    const onChange = vi.fn();
    const value = ref("1");
    const wrapper = mount(() => (
      <McRadioGroup 
        modelValue={value.value} 
        onChange={onChange}
        onUpdate:modelValue={(val) => value.value = val as string}
        disabled
      >
        <McRadio value="1">Option 1</McRadio>
        <McRadio value="2">Option 2</McRadio>
        <McRadio value="3">Option 3</McRadio>
      </McRadioGroup>
    ));

    // class
    expect(wrapper.classes()).toContain("is-disabled");
    
    // all radios should be disabled
    const radios = wrapper.findAllComponents(McRadio);
    expect(radios.length).toBe(3);
    radios.forEach(radio => {
      expect(radio.classes()).toContain("is-disabled");
    });
    
    // try to change disabled radio group
    await radios[1].find('input[type="radio"]').setValue(true);
    await nextTick();
    expect(value.value).toBe("1"); // should not change
    expect(onChange).not.toHaveBeenCalled();
  });

  // radio group size propagation
  test("radio group size propagation", () => {
    const wrapper = mount(() => (
      <McRadioGroup modelValue="1" size="large">
        <McRadio value="1">Option 1</McRadio>
        <McRadio value="2">Option 2</McRadio>
      </McRadioGroup>
    ));

    const radios = wrapper.findAllComponents(McRadio);
    radios.forEach(radio => {
      expect(radio.classes()).toContain("mc-radio--large");
    });
  });
}); 