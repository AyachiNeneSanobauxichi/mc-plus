import type { StoryObj, Meta } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import { McButton } from "mc-plus";
import { iconOptions } from "./args-type/options";

const meta: Meta<typeof McButton> = {
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
    leftIcon: {
      control: { type: "select" },
      options: iconOptions,
    },
    rightIcon: {
      control: { type: "select" },
      options: iconOptions,
    },
  },
  args: {
    content: "MC Button",
  },
};

export default meta;

export const Demo: StoryObj<typeof McButton> = {
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
