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

export const IconOnlyButton: Story = {
  args: {
    icon: "add",
    "aria-label": "항목 추가",
    property: "brand",
  },
};

export const InteractionStates: Story = {
  render: () => (
    <div className="grid gap-4">
      <p className="text-sm text-uui-text-secondary">실제 Button은 pointer 및 keyboard 입력에 따라 아래 상태로 전환됩니다.</p>
      <div className="flex flex-wrap items-end gap-3">
        <div className="grid gap-2"><span className="text-xs text-uui-text-secondary">Default</span><Button text="계속" property="brand" /></div>
        <div className="grid gap-2"><span className="text-xs text-uui-text-secondary">Hover</span><Button className="bg-uui-surface-brand-hover text-uui-text-on-brand-hover" text="계속" property="brand" /></div>
        <div className="grid gap-2"><span className="text-xs text-uui-text-secondary">Active</span><Button className="bg-uui-surface-brand-active text-uui-text-on-brand-active" text="계속" property="brand" /></div>
        <div className="grid gap-2"><span className="text-xs text-uui-text-secondary">Focus visible</span><Button className="outline-solid outline-2 outline-offset-2 outline-uui-focus-brand" text="계속" property="brand" /></div>
        <div className="grid gap-2"><span className="text-xs text-uui-text-secondary">Disabled</span><Button text="계속" property="brand" disabled /></div>
        <div className="grid gap-2"><span className="text-xs text-uui-text-secondary">Loading</span><Button text="계속" property="brand" loading /></div>
      </div>
    </div>
  ),
};

export const LayoutAndIconPosition: Story = {
  render: () => (
    <div className="grid w-[360px] gap-3">
      <Button fullWidth icon="add" text="새 항목 추가" property="brand" />
      <Button fullWidth icon="chevronRight" iconPosition="end" text="다음 단계" property="outlined" />
      <Button icon="add" aria-label="항목 추가" property="brand" />
    </div>
  ),
};
