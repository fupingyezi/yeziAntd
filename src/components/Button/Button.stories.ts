import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    disabled: { control: 'boolean' },
    btnType: { control: 'select', options: ['primary', 'default', 'dashed', 'text', 'link'] },
    onFocus: { action: 'onFocus' },
  },
  args: {
    onClick: () => console.log('clicked'),
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    btnType: 'primary',
    children: 'Button',
  },
};

export const Default: Story = {
  args: {
    btnType: 'default',
    children: 'Button',
  },
};

export const Dashed: Story = {
  args: {
    btnType: 'dashed',
    children: 'Button',
  },
};

export const Text: Story = {
  args: {
    btnType: 'text',
    children: 'Button',
  },
};

export const Link: Story = {
  args: {
    btnType: 'link',
    href: 'https://www.google.com',
    children: 'Button',
  },
};
