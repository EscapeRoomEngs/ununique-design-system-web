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

export const PrimaryColorIcon: Story = {
  args: { iconNm: "upload", iconColor: "primary", iconSize: 24 },
};
export const SecondaryColorIcon: Story = {
  args: { iconNm: "download", iconColor: "secondary", iconSize: 24 },
};
export const TertiaryColorIcon: Story = {
  args: {
    iconNm: "close",
    iconColor: "tertiary",
    iconSize: 24,
    style: { border: `1px solid ${color.border.invert.hex}`, borderRadius: "8px" },
  },
};
export const InvertColorIcon: Story = {
  args: {
    iconNm: "add",
    iconColor: "invert",
    iconSize: 24,
    style: { backgroundColor: color.surface.invert.hex, borderRadius: "8px" },
  },
};
export const PositiveColorIcon: Story = {
  args: {
    iconNm: "add",
    iconColor: "positive",
    iconSize: 24,
    style: { backgroundColor: color.surface.positive.hex, borderRadius: "8px" },
  },
};
export const NegativeColorIcon: Story = {
  args: {
    iconNm: "remove",
    iconColor: "negative",
    iconSize: 24,
    style: { backgroundColor: color.surface.negative.hex, borderRadius: "8px" },
  },
};
export const InfoColorIcon: Story = {
  args: {
    iconNm: "noti",
    iconColor: "info",
    iconSize: 24,
    style: { backgroundColor: color.surface.info.hex, borderRadius: "8px" },
  },
};
