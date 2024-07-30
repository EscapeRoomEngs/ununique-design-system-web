import { Meta, StoryObj } from "@storybook/react/*";
import { useEffect, useState } from "react";
import { TextField } from "../../components/Input";
import { Container } from "../../atom/Container";
import { Body, Lable } from "../../atom/Text";

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
    return <TextField {...args} value={textValue} onChange={setValue} />;
  },
};

export const PasswordFieldExample: Story = {
  args: { value: "", type: "password", disabled: false, placeholder: "비밀번호 입력" },
  render: (args) => {
    const [textValue, setValue] = useState("");
    useEffect(() => setValue(args.value), [args.value]);
    return (
      <div className="grid" style={{ gap: "8px" }}>
        <Lable>비밀번호</Lable>
        <TextField
          {...args}
          value={textValue}
          onChange={setValue}
          isError={() => textValue.length < 8}
        />
        {textValue?.length < 8 && (
          <Body fontStyle="ExtraSmall" fontColor="negative">
            비밀번호를 8자 이상 입력하세요
          </Body>
        )}
      </div>
    );
  },
};
