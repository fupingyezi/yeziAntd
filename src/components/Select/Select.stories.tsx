import type { Meta, StoryObj } from '@storybook/react';

import Select from './Select';

const meta: Meta<typeof Select> = {
  title: 'Example/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: { control: 'text' },
    option: { control: 'object' },
    disabled: { control: 'boolean' },
    open: {control: 'boolean'},
  }
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    defaultValue: 'yezi',
    size: "default",
    option: [
      {
        value: 'yezi',
        label: 'yezi'
      }, 
      {
        value: 'houteng',
        label: 'houteng',
      }, 
      {
        value: 'youli',
        label: 'youli',
        disabled: true,
      }
    ],
    disabled: false,
    open: false,
  },
};