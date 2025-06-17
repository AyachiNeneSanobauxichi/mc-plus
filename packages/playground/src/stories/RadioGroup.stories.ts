/*
 * @Author: Tieju yang
 * @Date: 2025-05-20 10:18:48
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-22 10:18:29
 */
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/vue3";
import { McRadio, McRadioGroup } from "mc-plus";

// RadioGroup component meta
const radioGroupMeta: Meta<typeof McRadioGroup> = {
  title: "RadioGroup",
  component: McRadioGroup,
  tags: ["autodocs"],
};

export default radioGroupMeta;

// Basic RadioGroup demo
export const Basic: StoryObj<typeof McRadioGroup> = {
  args: {
    disabled: false,
    modelValue: "1",
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  render: (args) => ({
    components: { McRadio, McRadioGroup },
    setup() {
      const handleChange = action("change");

      return { args, handleChange };
    },
    template: `
      <div>
        <p>当前值: {{ args.modelValue }}</p>
        <mc-radio-group 
          v-model="args.modelValue" 
          :disabled="args.disabled"  
          @change="handleChange"
        >
          <mc-radio value="1">选项1</mc-radio>
          <mc-radio value="2">选项2</mc-radio>
          <mc-radio value="3">选项3</mc-radio>
        </mc-radio-group>
      </div>
    `,
  }),
};
