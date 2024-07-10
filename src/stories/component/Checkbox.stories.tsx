import { Meta, StoryObj } from "@storybook/react/*";
import { useEffect, useState } from "react";
import { Container } from "../../atom/Container";
import { Checkbox } from "../../components/Input";

const meta: Meta = {
  title: "Design System/Component/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const CheckboxExample: Story = {
  args: {
    id: "checkbox-button-ex",
    value: "Option Text Lable",
    checked: true,
    disabled: false,
    isSquared: false,
  },
  render: (args) => {
    const [isChecked, setIsChecked] = useState(args.checked);
    useEffect(() => setIsChecked(args.checked), [args.checked]);
    return <Checkbox {...args} checked={isChecked} onChange={() => setIsChecked(!isChecked)} />;
  },
};
export const CheckboxGroupExample: Story = {
  render: () => {
    const lables = ["Option 1", "Option 2", "Option 3"];
    const [selected, setSelected] = useState(["Option 1", "Option 2"]);
    function onChangeSelected(value: string) {
      const idx = selected.indexOf(value);
      if (idx < 0) setSelected([...selected, value]);
      else setSelected([...selected?.slice(0, idx), ...selected?.slice(idx + 1)]);
    }
    return (
      <Container display="flex">
        {lables?.map((lable, idx) => (
          <Checkbox
            key={idx}
            id="checkbox-button-group-ex"
            value={lable}
            checked={selected?.includes(lable)}
            onChange={onChangeSelected}
          />
        ))}
      </Container>
    );
  },
};
