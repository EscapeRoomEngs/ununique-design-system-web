import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { userEvent } from "storybook/test";
import { Container } from "../../atom/Container";
import { Radio } from "../../components/Input";
import { ThemeProvider } from "../../theme/ThemeProvider";

const meta: Meta<typeof Radio> = {
  title: "Design System/Component/Radio",
  component: Radio,
  parameters: { layout: "centered" },
  argTypes: { color: { control: "text" } },
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
            id={`radio-button-group-ex-${idx}`}
            value={lable}
            checked={selected === lable}
            onChange={setSelected}
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
          <Radio id={`radio-${theme}`} value={`${theme} selected`} checked readOnly />
        </ThemeProvider>
      ))}
    </Container>
  ),
};

export const KeyboardFocus: Story = {
  args: { id: "radio-keyboard-focus", value: "Tab focus", checked: false, readOnly: true },
  play: async () => {
    await userEvent.tab();
  },
};
