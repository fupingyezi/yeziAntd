import type { Meta, StoryObj } from '@storybook/react';

import Input from './Input';

const meta = {
    title: 'Example/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'select', options: ['default', 'small', 'large'] },
        disabled: { control: 'boolean' },
        perfix: {control:'text'},
    },
} satisfies Meta<typeof Input>

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 'default',
        disabled: false,
        placeholder: "请输入内容",
    }
}

export const Prefix: Story = {
    args: {
        size: 'default',
        disabled: false,
        placeholder: "请输入内容",
        prefix: '我嘞个豆'
    }
}

