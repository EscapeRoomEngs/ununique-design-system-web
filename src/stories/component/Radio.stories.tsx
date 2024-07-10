import { Meta, StoryObj } from "@storybook/react/*";
import { useEffect, useState } from "react";
import { Container } from "../../atom/Container";
import { Radio } from "../../components/Input";

const meta: Meta = {
  title: "Design System/Component/Radio",
  component: Radio,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const RadioExample: Story = {
  args: { id: "radio-button-ex", value: "Option Text Lable", checked: true, disabled: false },
  render: (args) => {
    const [isChecked, setIsChecked] = useState(args.checked);
    useEffect(() => setIsChecked(args.checked), [args.checked]);
    return (
      <Radio
        id="radio-button-ex"
        value="Option Text Lable"
        {...args}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
    );
  },
};
export const RadioGroupExample: Story = {
  render: () => {
    const lables = ["Option 1", "Option 2", "Option 3"];
    const [selected, setSelected] = useState("Option 1");
    return (
      <Container display="flex">
        {lables?.map((lable, idx) => (
          <Radio
            key={idx}
            id="radio-button-group-ex"
            value={lable}
            checked={selected === lable}
            onChange={setSelected}
          />
        ))}
      </Container>
    );
  },
};
