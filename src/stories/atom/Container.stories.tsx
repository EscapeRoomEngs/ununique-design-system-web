import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "../../atom/Container";
import { Button } from "../../components/Button";
import "../globalStyles.css";

const meta: Meta<typeof Container> = {
  title: "Design System/Atom/Container",
  component: Container,
  parameters: { layout: "centered" },
  argTypes: {
    display: { control: "radio", options: ["grid", "flex"] },
    direction: {
      control: "radio",
      options: ["row", "column"],
      if: { arg: "display", eq: "flex" },
    },
    justify: {
      control: "select",
      options: [
        undefined,
        "flex-start",
        "center",
        "flex-end",
        "space-between",
        "space-evenly",
        "stretch",
      ],
    },
    align: {
      control: "select",
      options: [
        undefined,
        "flex-start",
        "center",
        "flex-end",
        "space-between",
        "space-evenly",
        "stretch",
      ],
    },
    spacing: { control: "select", options: [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 56] },
    radius: { control: "select", options: [0, 4, 8, 12, 16] },
    bgColor: {
      control: "select",
      options: [undefined, "primary", "secondary", "tertiary", "invert", "brand"],
    },
    borderColor: {
      control: "select",
      options: [undefined, "default", "hover", "focused", "disabled", "error"],
    },
    style: { control: "object" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Container>;

export const VerticalLayout: Story = {
  args: {
    display: "grid",
    justify: "center",
    align: "center",
    spacing: 16,
    radius: 16,
    bgColor: "tertiary",
    borderColor: "default",
    style: {
      padding: "24px",
      minWidth: "320px",
      minHeight: "120px",
    },
  },
  render: (args) => (
    <Container {...args}>
      <Button text="버튼" property="Outlined" propertyStyle="GrayLine" />
      <Button text="버튼" propertyStyle="Gray" />
    </Container>
  ),
};
export const HorizontalLayout: Story = {
  args: {
    display: "flex",
    direction: "row",
    justify: "center",
    align: "center",
    spacing: 16,
    radius: 16,
    bgColor: "tertiary",
    borderColor: "default",
    style: {
      padding: "24px",
      minWidth: "320px",
      minHeight: "120px",
    },
  },
  render: (args) => (
    <Container {...args}>
      <Button text="버튼" property="Outlined" propertyStyle="GrayLine" />
      <Button text="버튼" propertyStyle="Gray" />
    </Container>
  ),
};
