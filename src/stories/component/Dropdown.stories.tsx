import { Meta, StoryObj } from "@storybook/react/*";
import { useEffect, useState } from "react";
import { Container } from "../../atom/Container";
import { Lable } from "../../atom/Text";
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
  args: {
    value: {},
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
    const [selected, setSelected] = useState({});
    useEffect(() => setSelected(args.value), [args.value]);
    return <Dropdown {...args} selected={selected} onChange={setSelected} />;
  },
};

export const SelectFieldExample: Story = {
  args: {
    value: { id: "all", name: "전체 보기" },
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
    const [selected, setSelected] = useState({});
    useEffect(() => setSelected(args.value), [args.value]);
    return (
      <Container spacing={8}>
        <Lable>분류</Lable>
        <Dropdown {...args} selected={selected} onChange={setSelected} />
      </Container>
    );
  },
};
