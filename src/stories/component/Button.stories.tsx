import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../components/Button";
import "../globalStyles.css";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Design System/Component/Button",
  component: Button,
  parameters: { layout: "centered" },
  // args: {
  //   // 👇 Create an action that appears when the onClick event is fired
  //   onClick: action("on-click"),
  // },
  argTypes: {
    property: { control: "select", options: ["Contained", "Outlined", "Text"] },
    propertyStyle: { control: "select", options: ["Gray", "Brand", "GrayLine", "GrayFill"] },
    iconOption: { control: { type: "object" } },
    // onClick: { action: "onClick" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * [High emphasis]
 * 가장 중요한 기능에 사용합니다.
 */
export const ContainedStyleButton: Story = {
  args: {
    text: "신규 등록",
    property: "Contained",
    propertyStyle: "Brand",
    iconOption: { iconNm: "add", iconColor: "invert" },
    size: "M",
    radius: 4,
  },
  render: (args) => <Button {...args} onClick={() => console.log("btn clicked")}></Button>,
};
/**
 * [Medium emphasis]
 * (radius 4px, 8px 중 스타일에 따라 자유 지정)
 */
export const OutlinedStyleButton: Story = {
  args: {
    text: "로그인",
    property: "Outlined",
    propertyStyle: "GrayLine",
    size: "S",
    radius: 4,
  },
};
/**
 * [Low emphasis]
 */
export const TextStyleButton: Story = {
  args: {
    text: "회원가입",
    property: "Text",
    propertyStyle: "Brand",
    size: "M",
    radius: 4,
  },
};
/**
 * 아이콘 적용 버튼의 예시입니다.
 * (버튼 내 아이콘 크기는 20px * 20px로 고정)
 */
export const IconStyleButton: Story = {
  args: {
    iconOption: { iconNm: "download", iconColor: "sub" },
    property: "Outlined",
    propertyStyle: "GrayFill",
    text: "다운로드",
    size: "L",
    radius: 4,
  },
};
