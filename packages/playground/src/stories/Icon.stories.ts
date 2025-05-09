import type { StoryObj, Meta } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { McIcon } from "mc-plus";

const meta: Meta<typeof McIcon> = {
  title: "Icon",
  component: McIcon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "text" },
    },
  },
};

export default meta;

export const Demo: StoryObj<typeof McIcon> = {
  args: {
    name: "github",
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
