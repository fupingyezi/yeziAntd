import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Alert from "./Alert";

const meta = {
  title: "Example/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "info", "warning", "error"],
    },
    message: { control: "text", defaultValue: "alert" },
    closeable: { control: "boolean" },
    description: { control: "text" },
  },
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    message: "Success Text",
    type: "success",
    closeable: false,
  },
};

export const DesSuccess: Story = {
  args: {
    message: "Success Text",
    type: "success",
    closeable: false,
    description: "Success Description Success Description Success Description",
  },
};
