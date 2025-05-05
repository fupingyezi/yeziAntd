import { Meta, StoryObj } from "@storybook/react";
import Form from "./Form";
import FormItem from "./FormItem";
import { fn } from "@storybook/test";
import Button from "../Button";
import Input from "../Input";

const meta: Meta<typeof Form> = {
  title: "Example/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onFinish: fn(),
    onFinishFailed: fn(),
  },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof Form>;

export const DefaultForm: Story = {
  args: {
    onFinish: fn(),
    onFinishFailed: fn(),
  },
  render: (args) => (
    <Form {...args}>
      <FormItem
        name="name"
        label="Name"
        rule={{ required: true, message: "测试不为空" }}
      >
        <Input />
      </FormItem>
      <FormItem
        name="email"
        label="Email"
        rule={{ type: "email", message: "邮箱格式错误" }}
      >
        <Input />
      </FormItem>
      <FormItem
        name="password"
        label="Password"
        rule={{ minLength: 6, message: "密码长度不少于6" }}
      >
        <Input />
      </FormItem>
      <FormItem name="submit">
        <Button btnType="primary">Submit</Button>
      </FormItem>
    </Form>
  ),
};
