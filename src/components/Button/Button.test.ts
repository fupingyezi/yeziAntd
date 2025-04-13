import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const EmptyButton: Story = {};

export const PrimaryButton: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  }
}