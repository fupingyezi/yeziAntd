import Tabs from "./Tabs";
import TabItem from "./TabItem";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Example/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultIndex: {
      control: "number",
    },
    mode: {
      control: { type: "inline-radio", options: ["horizontal", "vertical"] },
      defaultValue: "horizontal",
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultIndex: 1,
    mode: "vertical",
    style: {},
    className: "",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabItem index={1}>Tab1</TabItem>
      <TabItem index={2}>Tab2</TabItem>
      <TabItem index={3}>Tab3</TabItem>
    </Tabs>
  ),
};
