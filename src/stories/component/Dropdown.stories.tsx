import { Meta, StoryObj } from "@storybook/react/*";
import { useEffect, useState } from "react";
import { Dropdown } from "../../components/Input";

const meta: Meta = {
  title: "Design System/Component/Dropdown",
  component: Dropdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", option: ["Small", "Medium", "Large"] },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const DropdownExample: Story = {
  args: { value: "", disabled: false, placeholder: "Placeholder" },
  render: (args) => {
    const [textValue, setValue] = useState({});
    useEffect(() => setValue(args.value), [args.value]);
    return <Dropdown {...args} selected={textValue} onChange={setValue} />;
  },
};
