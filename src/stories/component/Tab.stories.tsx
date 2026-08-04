import type { Meta, StoryObj } from "@storybook/react";
import { TabBar } from "../../components/Tab";
import type { TabItem, TabProps } from "../../components/Tab";
import { useEffect, useState } from "react";
import { Body } from "../../atom/Text";
import { ThemeProvider } from "../../theme/ThemeProvider";
import { userEvent } from "storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof TabBar> = {
  title: "Design System/Component/Tab",
  component: TabBar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;
const tabList = [
  { text: "상품정보", href: "/detail" },
  { text: "사이즈", href: "/detail/size" },
  { text: "리뷰", href: "/review" },
  { text: "문의", href: "/qna" },
];

function ControlledTabs(args: TabProps) {
  const [selected, setSelected] = useState<TabItem | undefined>(args.selected);

  useEffect(() => setSelected(args.selected), [args.selected]);

  return <TabBar {...args} selected={selected} onSelect={setSelected} />;
}

export const TabExample: Story = {
  args: {
    tabList,
    selected: { text: "상품정보", href: "/detail" },
    style: { width: "800px" },
  },
  render: (args) => <ControlledTabs {...args} />,
};

export const ReviewSelected: Story = {
  args: {
    tabList,
    selected: { text: "리뷰", href: "/review" },
    style: { width: "800px" },
  },
};

export const SelectedStateParity: Story = {
  args: {
    tabList,
    selected: { text: "리뷰", href: "/review" },
    style: { width: "800px" },
  },
};

export const BrandThemeParity: Story = {
  render: () => (
    <div className="grid gap-6">
      {(["red", "orange"] as const).map((theme) => (
        <ThemeProvider key={theme} theme={theme} className="grid gap-2">
          <Body fontColor="brand">{theme} selected tab</Body>
          <ControlledTabs
            tabList={tabList.slice(0, 3)}
            selected={tabList[0]}
            style={{ width: "520px" }}
          />
        </ThemeProvider>
      ))}
    </div>
  ),
};

export const KeyboardFocus: Story = {
  args: {
    tabList,
    selected: tabList[0],
    style: { width: "800px" },
  },
  play: async () => {
    await userEvent.tab();
  },
};
