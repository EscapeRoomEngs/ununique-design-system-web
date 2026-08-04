import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { Body } from "../../atom/Text";
import { Button } from "../../components/Button";
import { ThemeProvider } from "../../theme/ThemeProvider";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: "Design System/Component/Button",
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    property: { control: "select" },
  },
  args: { onClick: fn() },
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
        <ThemeProvider key={theme} theme={theme} className="flex flex-col items-start gap-2">
          <Body fontColor="brand">{theme} brand</Body>
          <Button property="brand" text="주요 행동" />
          <Button property="negative" text="오류 상태" />
        </ThemeProvider>
      ))}
    </div>
  ),
};

export const BrandInteractionStates: Story = {
  render: () => (
    <div className="grid gap-4">
      <p className="text-sm text-uui-text-secondary">상단 toolbar에서 브랜드를 선택한 뒤 상태별 배경색을 비교하세요.</p>
      <div className="flex flex-wrap items-end gap-3">
        <div className="grid gap-2"><span className="text-xs text-uui-text-secondary">Default</span><Button text="계속" property="brand" /></div>
        <div className="grid gap-2"><span className="text-xs text-uui-text-secondary">Hover</span><Button className="bg-uui-surface-brand-hover" text="계속" property="brand" /></div>
        <div className="grid gap-2"><span className="text-xs text-uui-text-secondary">Active</span><Button className="bg-uui-surface-brand-active" text="계속" property="brand" /></div>
      </div>
    </div>
  ),
};
