import type { StoryObj, Meta } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { McIcon } from "mc-plus";

const meta: Meta<typeof McIcon> = {
  title: "Icon",
  component: McIcon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "select" },
      options: [
        "envelope",
        "setting",
        "upload",
        "clock",
        "switch",
        "loading-dot",
        "fork",
        "square",
        "triangle-up",
        "loading",
        "application",
        "warning",
        "info",
        "add",
        "arrow-right",
        "arrow-left",
        "download",
        "attachment",
        "document",
        "copy",
        "refresh",
        "mandatory",
        "edit",
        "delete",
        "success",
      ],
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
