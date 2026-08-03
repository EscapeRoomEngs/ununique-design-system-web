import type { Meta, StoryObj } from "@storybook/react";
import { Body } from "../../atom/Text";
import { Button } from "../../components/Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Design System/Component/Button",
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    property: { control: "select" },
    iconOption: { control: { type: "object" } },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ContainedStyleButton: Story = {
  args: {
    text: "로그인",
    property: "brand",
    size: "Medium",
    radius: 4,
  },
  render: (args) => <Button {...args} onClick={() => console.log("btn clicked")} />,
};
export const OutlinedStyleButton: Story = {
  args: {
    text: "신규 등록",
    property: "outlined",
    icon: "add",
    size: "Small",
    radius: 4,
  },
};

export const DisabledButton: Story = {
  args: {
    text: "비활성 버튼",
    property: "brand",
    size: "Medium",
    disabled: true,
  },
};

export const SemanticButtonParity: Story = {
  render: () => (
    <div className="flex gap-2">
      {(["negative", "positive", "info"] as const).map((property) => (
        <Button key={property} property={property} text={property} />
      ))}
      <Button disabled property="brand" text="disabled" />
    </div>
  ),
};

export const BrandThemeParity: Story = {
  render: () => (
    <div className="flex gap-6">
      {(["red", "orange"] as const).map((theme) => (
        <section key={theme} data-uui-theme={theme} className="flex flex-col items-start gap-2">
          <Body fontColor="brand">{theme} brand</Body>
          <Button property="brand" text="주요 행동" />
          <Button property="negative" text="오류 상태" />
        </section>
      ))}
    </div>
  ),
};
