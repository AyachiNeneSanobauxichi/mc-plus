import type { Meta } from "@storybook/vue3";

export type StorybookMeta<T, AdditionalArgs = Record<string, any>> = Meta<T> & {
  args?: Partial<AdditionalArgs>;
  argTypes?: {
    [K in keyof AdditionalArgs]?: {
      control?: { type: string; options?: any[] };
      description?: string;
    };
  };
};
