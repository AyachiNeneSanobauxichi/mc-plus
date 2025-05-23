import type { StoryObj, Meta } from "@storybook/vue3";
import { McSwitch, type SwitchProps } from "mc-plus";
import { ref } from "vue";

const meta: Meta<typeof McSwitch> = {
  title: "Switch",
  component: McSwitch,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    width: {
      control: { type: "text" },
    },
    label: {
      control: { type: "text" },
    },
    onText: {
      control: { type: "text" },
    },
    offText: {
      control: { type: "text" },
    },
  },
  args: {
    disabled: false,
  },
};

export default meta;

export const Default: StoryObj<typeof McSwitch> = {
  args: {},
  render: (args: SwitchProps) => ({
    components: { McSwitch },
    setup() {
      const value = ref(false);
      return { args, value };
    },
    template: `<mc-switch v-model="value" v-bind="args" />`,
  }),
};
