import type { StoryObj, Meta } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { McIcon } from "mc-plus";
import { ICON_OPTIONS } from "./args-type/options";

const meta: Meta<typeof McIcon> = {
  title: "Icon",
  component: McIcon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "select" },
      options: ICON_OPTIONS,
    },
  },
};

export default meta;

export const Demo: StoryObj<typeof McIcon> = {
  args: {
    name: "setting",
  },
  render: (args) => ({
    components: {
      McIcon,
    },
    setup() {
      const handleClick = action("click");
      return { args, handleClick };
    },
    template: `<mc-icon v-bind="args" @click="handleClick"></mc-icon>`,
  }),
};
