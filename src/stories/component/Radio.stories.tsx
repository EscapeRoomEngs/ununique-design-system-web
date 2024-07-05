import { Meta, StoryObj } from "@storybook/react/*";
import { Radio } from "../../components/Input";

const meta: Meta = {
  title: "Design System/Component/Radio",
  component: Radio,
  parameters: { layout: "centered" },
  argTypes: {
    iconSize: { control: "select", options: [12, 16, 20, 24, 36, 40, 48, 56, 64] },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const RadioExample: Story = {
  args: { id: "radio-button-ex", value: "Option Text Lable" },
};
