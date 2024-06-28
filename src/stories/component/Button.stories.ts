import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../components/form/Button";
import "../globalStyles.css";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Design System/Component/Button/Example",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ContainedStyleButton: Story = {
  args: {
    btnText: "버튼",
    btnColor: "brand",
    btnTextColor: "invert",
  },
};
export const OutlinedStyleButton: Story = {
  args: {
    btnText: "버튼",
    btnColor: "primary",
    borderColor: "default",
  },
};
export const TextStyleButton: Story = {
  args: {
    btnText: "버튼",
    btnTextColor: "negative",
  },
};
export const IconStyleButton: Story = {
  args: {
    iconOption: { iconNm: "download", iconColor: "sub" },
    btnColor: "primary",
    borderColor: "default",
    btnText: "다운로드",
  },
};
