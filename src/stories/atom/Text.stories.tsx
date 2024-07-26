import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "../../atom/Text";
import { usage } from "../../foundation/typography";
import "../globalStyles.css";

const dummyText = `I'm Fine, Gwanchana- Ding Ring Ring Ring Ring...`;

const meta: Meta = {
  title: "Design System/Atom/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: { children: { control: "text" } },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DisplayExample: Story = {
  args: { usage: "display", children: usage[".display1"].description, fontColor: "positive" },
};
export const HeadlineExample: Story = {
  args: { usage: "headline", children: "대시보드 메인", fontColor: "info" },
};
export const TitleExample: Story = {
  args: { usage: "title", children: "타이틀 예시", fontColor: "negative" },
};
export const LableExample: Story = {
  args: { usage: "lable", children: "개인정보 수집/이용 동의", required: true },
};
export const BodyExample: Story = {
  args: { children: usage.p.description },
};
