import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../../atom/Icon";
import { color } from "../../foundation/color";
import "../globalStyles.css";

const meta: Meta = {
  // title: "Design System/Atom/Icon/Example",
  component: Icon,
  parameters: { layout: "centered" },
  argTypes: {
    iconSize: { control: "select", options: [12, 16, 20, 24, 36, 40, 48, 56, 64] },
  },
  tags: ["!dev"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultColorIcon: Story = {
  args: { iconNm: "upload", iconColor: "default", iconSize: 24 },
};
export const SubColorIcon: Story = {
  args: { iconNm: "download", iconColor: "sub", iconSize: 24 },
};
export const TertiaryColorIcon: Story = {
  args: { iconNm: "refresh", iconColor: "tertiary", iconSize: 24 },
};
export const DisabledColorIcon: Story = {
  args: {
    iconNm: "add",
    iconColor: "disabled",
    iconSize: 24,
    style: { border: `1px solid ${color.border.disabled.hex}`, borderRadius: "8px" },
  },
};
export const InvertColorIcon: Story = {
  args: {
    iconNm: "remove",
    iconColor: "invert",
    iconSize: 24,
    style: { backgroundColor: color.surface.invert.hex, borderRadius: "8px" },
  },
};
