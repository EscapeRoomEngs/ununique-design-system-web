import { Meta, StoryObj } from "@storybook/react/*";
import { useEffect, useState } from "react";
import { TextField } from "../../components/Input";

const meta: Meta = {
  title: "Design System/Component/TextField",
  component: TextField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", option: ["Small", "Medium", "Large"] },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const TextFieldExample: Story = {
  args: { value: "", type: "text", disabled: false, placeholder: "Placeholder" },
  render: (args) => {
    const [textValue, setValue] = useState("");
    useEffect(() => setValue(args.value), [args.value]);
    return (
      <TextField
        {...args}
        value={textValue}
        onChange={setValue}
        isError={() => textValue.length > 0 && textValue.length < 3}
      />
    );
  },
};
