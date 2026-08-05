import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Body, Lable } from "../../atom/Text";
import { TextField } from "../../components/Input";

const meta: Meta<typeof TextField> = {
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

export const DisabledTextField: Story = {
  args: { "aria-label": "비활성 입력", value: "변경할 수 없는 값", disabled: true },
};

export const FullWidthTextField: Story = {
  args: { "aria-label": "전체 폭 입력", value: "", fullWidth: true },
  render: (args) => <div className="w-[400px]"><TextField {...args} /></div>,
};

export const ErrorTextField: Story = {
  args: { "aria-label": "오류 입력", value: "유효하지 않은 값", readOnly: true, isError: () => true },
};

export const StateParity: Story = {
  render: () => (
    <div className="grid gap-2">
      <TextField aria-label="기본 입력" value="기본" readOnly />
      <TextField aria-label="오류 입력" value="오류" readOnly isError={() => true} />
      <TextField aria-label="비활성 입력" value="비활성" disabled />
    </div>
  ),
};

export const BrandFocusState: Story = {
  args: { "aria-label": "브랜드 포커스 입력", value: "포커스 상태", readOnly: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "브랜드 포커스 입력" });

    await userEvent.tab();
    await expect(input).toHaveFocus();
  },
};
