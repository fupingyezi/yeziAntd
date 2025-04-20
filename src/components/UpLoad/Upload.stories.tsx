import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Upload from "./Upload";

const meta: Meta<typeof Upload> = {
  title: "Example/Upload",
  component: Upload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    action: { control: "text" },
  },
  args: {
    onChange: fn(),
    beforeUpload: fn(),
    onSuccess: fn(),
    onError: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Upload>;

export const Default: Story = {
  args: {
    action: "https://jsonplaceholder.typicode.com/posts",
    onChange: (file: File) => console.log(`upload file: ${file}`),
    beforeUpload: (file: File) => {
        console.log(`before upload ${file}`);
        return true;
    },
    onSuccess: (file: File) => console.log(`upload file: ${file} success`),
    onError: (file: File) => console.log(`upload file: ${file} failed`)
  },
};
