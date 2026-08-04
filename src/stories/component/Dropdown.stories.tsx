import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { userEvent, within } from "storybook/test";
import { Container } from "../../atom/Container";
import { Lable } from "../../atom/Text";
import { Dropdown } from "../../components/Input";
import { ThemeProvider } from "../../theme/ThemeProvider";

const meta: Meta<typeof Dropdown> = {
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
  args: {
    selected: {},
    optionList: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
      { id: 4, name: "Option 4" },
      { id: 5, name: "Option 5" },
    ],
    disabled: false,
    placeholder: "Placeholder",
  },
  render: (args) => {
    const [selected, setSelected] = useState(args.selected);
    useEffect(() => setSelected(args.selected), [args.selected]);
    return <Dropdown {...args} selected={selected} onChange={setSelected} />;
  },
};

export const SelectFieldExample: Story = {
  args: {
    selected: { id: "all", name: "전체 보기" },
    optionList: [
      { id: "all", name: "전체 보기" },
      { id: "top", name: "상의" },
      { id: "bottom", name: "하의" },
      { id: "accessary", name: "액세서리" },
      { id: "shoes", name: "신발" },
    ],
    disabled: false,
    placeholder: "분류 선택",
  },
  render: (args) => {
    const [selected, setSelected] = useState(args.selected);
    useEffect(() => setSelected(args.selected), [args.selected]);
    return (
      <Container spacing={8}>
        <Lable>분류</Lable>
        <Dropdown {...args} selected={selected} onChange={setSelected} />
      </Container>
    );
  },
};

export const DisabledDropdown: Story = {
  args: {
    selected: { id: "all", name: "전체 보기" },
    optionList: [{ id: "all", name: "전체 보기" }],
    disabled: true,
  },
};

export const BrandThemeParity: Story = {
  render: () => (
    <div className="grid gap-6">
      {(["red", "orange"] as const).map((theme) => (
        <ThemeProvider key={theme} theme={theme} className="grid gap-2">
          <Lable>{theme} select</Lable>
          <Dropdown
            aria-label={`${theme} 테마 선택`}
            selected={{ id: 1, name: "선택됨" }}
            optionList={[{ id: 1, name: "선택됨" }, { id: 2, name: "다른 옵션" }]}
          />
        </ThemeProvider>
      ))}
    </div>
  ),
};

export const OpenDropdown: Story = {
  args: {
    "aria-label": "열린 선택 목록",
    selected: { id: 1, name: "선택됨" },
    optionList: [{ id: 1, name: "선택됨" }, { id: 2, name: "호버 옵션" }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("combobox", { name: "열린 선택 목록" }));
    await userEvent.hover(canvas.getByRole("option", { name: "호버 옵션" }));
  },
};
