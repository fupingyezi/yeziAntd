import type { Meta, StoryObj } from '@storybook/react';

import Icon from './Icon';

const meta = {
  title: "Example/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: "select",
      options: ["primary","secondary","success","info","warning","danger","light","dark"],
    }
  }
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const primary: Story = {
  args: {
    theme: "primary",
    className: '',
    icon: "arrow-down",
    size: '10px'
  },
};

export const Secondary: Story = {
  args: {
    theme: "secondary",
    className: '',
    icon: "arrow-down",
    size: '10px'
  },
};