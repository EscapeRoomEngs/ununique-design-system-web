import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../components/Button";
import "../globalStyles.css";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Design System/Component/Button",
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    property: { control: "select" },
    iconOption: { control: { type: "object" } },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ContainedStyleButton: Story = {
  args: {
    text: "로그인",
    property: "brand",
    size: "Medium",
    radius: 4,
  },
  render: (args) => <Button {...args} onClick={() => console.log("btn clicked")} />,
};
export const OutlinedStyleButton: Story = {
  args: {
    text: "신규 등록",
    property: "outlined",
    icon: "add",
    size: "Small",
    radius: 4,
  },
};
