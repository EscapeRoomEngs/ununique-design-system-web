import type { Meta, StoryObj } from "@storybook/react";
import { TabBar } from "../../components/Tab";
import "../globalStyles.css";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
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
export const TabExample: Story = {
  args: {
    tabList,
    selected: { text: "상품정보", href: "/detail" },
    style: { width: "800px" },
  },
  render: (args) => {
    const [selected, setSelected] = useState(args.selected);
    return <TabBar {...args} {...{ tabList, selected }} onSelect={setSelected} />;
  },
};
