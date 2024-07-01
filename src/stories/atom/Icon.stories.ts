import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../../components/Icon";
import { color } from "../../foundation/color";
import "../globalStyles.css";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Design System/2_Atom/Icon/Example",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultColorIcon: Story = {
  args: {
    iconNm: "upload",
  },
};
export const SubColorIcon: Story = {
  args: {
    iconNm: "download",
    iconColor: "sub",
  },
};
export const TertiaryColorIcon: Story = {
  args: {
    iconNm: "refresh",
    iconColor: "tertiary",
  },
};
export const DisabledColorIcon: Story = {
  args: {
    iconNm: "add",
    iconColor: "disabled",
    style: { border: `1px solid ${color.border.disabled.hex}`, borderRadius: "8px" },
  },
};
export const InvertColorIcon: Story = {
  args: {
    iconNm: "remove",
    iconColor: "invert",
    style: { backgroundColor: color.surface.invert.hex, borderRadius: "8px" },
  },
};
