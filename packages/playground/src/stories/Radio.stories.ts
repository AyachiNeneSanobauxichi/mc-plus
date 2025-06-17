/*
 * @Author: Tieju yang
 * @Date: 2025-05-20 10:17:53
 * @LastEditors: Tieju yang
 * @LastEditTime: 2025-05-28 09:02:43
 */
import type { Meta, StoryObj } from "@storybook/vue3";
import { McRadio } from "mc-plus";

// Radio component meta
const radioMeta: Meta<typeof McRadio> = {
  title: "Radio",
  component: McRadio,
  tags: ["autodocs"],
};

export default radioMeta;

// Basic Radio Example
export const Basic: StoryObj<typeof McRadio> = {
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Whether the radio is disabled",
    },
  },
  render: (args) => ({
    components: { McRadio },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px">
        <div>
          <p>当前选中值: {{ args.radioValue }}</p>
          <div style="display: flex; flex-direction: row; gap: 10px">
            <mc-radio v-model="args.radioValue" :disabled="args.disabled" value="1">Apple</mc-radio>
            <mc-radio v-model="args.radioValue" :disabled="args.disabled" value="2">Banana</mc-radio>
            <mc-radio v-model="args.radioValue" :disabled="args.disabled" value="3">Cherry</mc-radio>
            <mc-radio v-model="args.radioValue" :disabled="args.disabled" value="4">Orange</mc-radio>
          </div>
        </div>
      </div>
    `,
  }),
};
