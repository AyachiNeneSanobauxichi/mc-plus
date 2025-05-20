import type { StoryObj, Meta } from "@storybook/vue3";
import { McSwitch } from "mc-plus";
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

type SwitchArgs = {
  modelValue?: boolean;
  disabled?: boolean;
  width?: string;
  label?: string;
  onText?: string;
  offText?: string;
};

export const Default: StoryObj<typeof McSwitch> = {
  args: {},
  render: (args: SwitchArgs) => ({
    components: { McSwitch },
    setup() {
      const value = ref(false);
      return { args, value };
    },
    template: `<mc-switch v-model="value" v-bind="args" />`,
  }),
};
