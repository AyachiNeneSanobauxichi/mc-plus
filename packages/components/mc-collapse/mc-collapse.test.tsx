import { describe, expect, vi, test } from "vitest";
import { mount } from "@vue/test-utils";
import McCollapse from "./mc-collapse.vue";
import McCollapseItem from "./mc-collapse-item.vue";
import { McCollapse as _McCollapse, McCollapseItem as _McCollapseItem } from ".";

describe("mc-collapse installer", () => {
  test("collapse installer", () => {
    expect(_McCollapse.name).toBe("McCollapse");
    expect(_McCollapse).toHaveProperty("install");
    expect(_McCollapseItem.name).toBe("McCollapseItem");
    expect(_McCollapseItem).toHaveProperty("install");
  });
});

describe("mc-collapse", () => {
  // Basic rendering test
  test("basic rendering", async () => {
    const wrapper = mount(() => (
      <McCollapse modelValue={[]}>
        <McCollapseItem name="1" title="Title 1">
          Content 1
        </McCollapseItem>
        <McCollapseItem name="2" title="Title 2">
          Content 2
        </McCollapseItem>
      </McCollapse>
    ));

    // Check if elements are rendered correctly
    expect(wrapper.find('.mc-collapse').exists()).toBe(true);
    expect(wrapper.findAll('.mc-collapse-item').length).toBe(2);
    expect(wrapper.findAll('.mc-collapse-item-header').length).toBe(2);
    
    // Check title contents
    const headers = wrapper.findAll('.mc-collapse-item-title');
    expect(headers[0].text()).toBe('Title 1');
    expect(headers[1].text()).toBe('Title 2');
    
    // All items should be closed in initial state
    expect(wrapper.findAll('.mc-collapse-item--active').length).toBe(0);
  });

  // In default mode, multiple items can be expanded
  test("multiple items can be expanded in default mode", async () => {
    const wrapper = mount(() => (
      <McCollapse modelValue={['1']}>
        <McCollapseItem name="1" title="Title 1">
          Content 1
        </McCollapseItem>
        <McCollapseItem name="2" title="Title 2">
          Content 2
        </McCollapseItem>
      </McCollapse>
    ));

    // Initially only the first item is active
    expect(wrapper.findAll('.mc-collapse-item--active').length).toBe(1);
    
    // Click on the second item
    await wrapper.findAll('.mc-collapse-item-header')[1].trigger('click');
    
    // Should have two items in active state
    expect(wrapper.findAll('.mc-collapse-item--active').length).toBe(2);
  });

  // Accordion mode test
  test("only one item can be expanded in accordion mode", async () => {
    const wrapper = mount(() => (
      <McCollapse modelValue={['1']} accordion>
        <McCollapseItem name="1" title="Title 1">
          Content 1
        </McCollapseItem>
        <McCollapseItem name="2" title="Title 2">
          Content 2
        </McCollapseItem>
      </McCollapse>
    ));

    // Initially only the first item is active
    expect(wrapper.findAll('.mc-collapse-item--active').length).toBe(1);
    expect(wrapper.findAll('.mc-collapse-item')[0].classes()).toContain('mc-collapse-item--active');
    
    // Click on the second item
    await wrapper.findAll('.mc-collapse-item-header')[1].trigger('click');
    
    // Only the second item should be in active state
    expect(wrapper.findAll('.mc-collapse-item--active').length).toBe(1);
    expect(wrapper.findAll('.mc-collapse-item')[1].classes()).toContain('mc-collapse-item--active');
    expect(wrapper.findAll('.mc-collapse-item')[0].classes()).not.toContain('mc-collapse-item--active');
  });

  // Event triggering test
  test("clicking an item should trigger corresponding events", async () => {
    const onChange = vi.fn();
    const wrapper = mount(McCollapse, {
      props: {
        modelValue: [],
        onChange,
        'onUpdate:modelValue': (val) => {
          wrapper.setProps({ modelValue: val });
        }
      },
      slots: {
        default: [
          <McCollapseItem name="1" title="Title 1">Content 1</McCollapseItem>,
          <McCollapseItem name="2" title="Title 2">Content 2</McCollapseItem>
        ]
      }
    });

    // Click on the first item
    await wrapper.findAll('.mc-collapse-item')[0].trigger('click');
    
    // Check if the event was triggered and the value is correct
    expect(onChange).toHaveBeenCalledWith(['1']);
    expect(wrapper.emitted('update:modelValue')).toBeDefined();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['1']]);
    
    // Confirm the item has been activated
    expect(wrapper.findAll('.mc-collapse-item--active').length).toBe(1);
  });

  // Disabled item test
  test("disabled items should not respond to clicks", async () => {
    const onChange = vi.fn();
    const wrapper = mount(() => (
      <McCollapse modelValue={[]} onChange={onChange}>
        <McCollapseItem name="1" title="Title 1" disabled>
          Content 1
        </McCollapseItem>
        <McCollapseItem name="2" title="Title 2">
          Content 2
        </McCollapseItem>
      </McCollapse>
    ));

    // Click on the disabled item
    await wrapper.findAll('.mc-collapse-item')[0].trigger('click');
    
    // Event should not be triggered, item should not be activated
    expect(onChange).not.toHaveBeenCalled();
    expect(wrapper.findAll('.mc-collapse-item--active').length).toBe(0);
  });
  
  // Custom slot content test
  test("supports custom title slot", async () => {
    const wrapper = mount(() => (
      <McCollapse modelValue={[]}>
        <McCollapseItem name="1" 
          v-slots={{
            title: () => <div class="custom-title">Custom Title</div>
          }}
        >
          Content
        </McCollapseItem>
      </McCollapse>
    ));

    // Check if the custom title is rendered
    const customTitleElement = wrapper.find('.custom-title');
    expect(customTitleElement.exists()).toBe(true);
    
    // Check text content using another method
    const titleText = customTitleElement.element ? customTitleElement.element.textContent : '';
    expect(titleText).toBe('Custom Title');
  });

  // Test closing an open item
  test("clicking an open item should close it", async () => {
    const wrapper = mount(() => (
      <McCollapse modelValue={['1']}>
        <McCollapseItem name="1" title="Title 1">
          Content 1
        </McCollapseItem>
      </McCollapse>
    ));

    // Item is in active state initially
    expect(wrapper.find('.mc-collapse-item--active').exists()).toBe(true);
    
    // Click on the item again
    await wrapper.find('.mc-collapse-item').trigger('click');
    
    // Item should be closed
    expect(wrapper.find('.mc-collapse-item--active').exists()).toBe(false);
  });

  // Test behavior when clicking an open item in accordion mode
  test("clicking an open item in accordion mode should close it", async () => {
    const wrapper = mount(() => (
      <McCollapse modelValue={['1']} accordion>
        <McCollapseItem name="1" title="Title 1">
          Content 1
        </McCollapseItem>
        <McCollapseItem name="2" title="Title 2">
          Content 2
        </McCollapseItem>
      </McCollapse>
    ));

    // Initially the first item is in active state
    expect(wrapper.findAll('.mc-collapse-item--active').length).toBe(1);
    expect(wrapper.findAll('.mc-collapse-item')[0].classes()).toContain('mc-collapse-item--active');
    
    // Click on the open item
    await wrapper.findAll('.mc-collapse-item')[0].trigger('click');
    
    // All items should be in closed state
    expect(wrapper.findAll('.mc-collapse-item--active').length).toBe(0);
  });
}); 