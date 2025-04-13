import { Meta, StoryObj } from '@storybook/react';
import Menu from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

const meta: Meta<typeof Menu> = {
  title: 'Example/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultIndex: {
      control: { type: 'text' },
    },
    mode: {
      control: { type: 'inline-radio', options: ['horizontal', 'vertical'] },
      defaultValue: 'horizontal',
    },
    defaultOpenSubMenus: { 
      defaultValue: ['2']
    }
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const HorizontalMenu: Story = {
  args: {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: ['2'],
    style: {},
    className: ""
  },
  render: (args) => (
    <Menu {...args}>
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
      <SubMenu title="Submenu">
        <MenuItem>Sub Option 1</MenuItem>
        <MenuItem>Sub Option 2</MenuItem>
      </SubMenu>
      <MenuItem>Option 3</MenuItem>
    </Menu>
  ),
};

export const VerticalMenu: Story = {
  args: {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus: ['2']
  },
  render: (args) => (
    <Menu {...args}>
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
      <SubMenu title="Submenu">
        <MenuItem>Sub Option 1</MenuItem>
        <MenuItem>Sub Option 2</MenuItem>
      </SubMenu>
      <MenuItem>Option 3</MenuItem>
    </Menu>
  ),
};