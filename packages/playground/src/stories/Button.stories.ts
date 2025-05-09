import type { StoryObj } from "@storybook/vue3";
import type { StorybookMeta } from "./types";
import { action } from "@storybook/addon-actions";
import { McButton } from "mc-plus";

const meta: StorybookMeta<typeof McButton, { content: string }> = {
  title: "Button",
  component: McButton,
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: { type: "text" },
    },
    type: {
      control: { type: "select" },
      options: ["primary", "plain", "link"],
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    size: {
      control: { type: "select" },
      options: ["medium", "large", "small"],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    useThrottle: {
      control: "boolean",
    },
    throttleDuration: {
      control: { type: "select" },
      options: [300, 500, 1000, 2000],
    },
  },
  args: {
    content: "MC Button",
  },
};

export default meta;

export const Primary: StoryObj<typeof McButton> = {
  args: {
    type: "primary",
    disabled: false,
    loading: false,
    useThrottle: true,
    throttleDuration: 500,
    nativeType: "button",
    size: "medium",
  },
  render: (args) => ({
    components: { McButton },
    setup() {
      const handleClick = action("click");
      return { args, handleClick };
    },
    template: `<mc-button v-bind="args" @click="handleClick">{{ args.content }}</mc-button>`,
  }),
};
