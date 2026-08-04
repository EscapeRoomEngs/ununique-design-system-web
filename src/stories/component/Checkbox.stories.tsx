import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { userEvent } from "storybook/test";
import { Container } from "../../atom/Container";
import { Checkbox } from "../../components/Input";
import { ThemeProvider } from "../../theme/ThemeProvider";

const meta: Meta<typeof Checkbox> = {
  title: "Design System/Component/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  argTypes: { color: { control: "text" } },
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
    return (
      <Checkbox
        {...args}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
    );
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
            id={`checkbox-button-group-ex-${idx}`}
            value={lable}
            checked={selected?.includes(lable)}
            onChange={onChangeSelected}
          />
        ))}
      </Container>
    );
  },
};

export const BrandThemeParity: Story = {
  render: () => (
    <Container display="flex" spacing={24}>
      {(["red", "orange"] as const).map((theme) => (
        <ThemeProvider key={theme} theme={theme}>
          <Checkbox id={`checkbox-${theme}`} value={`${theme} checked`} checked readOnly />
        </ThemeProvider>
      ))}
    </Container>
  ),
};

export const KeyboardFocus: Story = {
  args: { id: "checkbox-keyboard-focus", value: "Tab focus", checked: false, readOnly: true },
  play: async () => {
    await userEvent.tab();
  },
};
