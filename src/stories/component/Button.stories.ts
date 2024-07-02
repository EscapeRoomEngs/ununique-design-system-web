import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../components/Button";
import "../globalStyles.css";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Design System/3_Component/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    propertyStyle: { control: "radio", options: ["Gray", "Brand", "GrayLine", "GrayFill"] },
    iconOption: {
      control: { type: "object" },
    },
    onClick: { action: "onClick" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * High emphasis - Contained
 *
 * 가장 중요한 기능에 사용합니다.
 *
 * 루틴하게 사용하는 서비스의 경우 ‘Contained’만 누르고 태스크를 끝낼 수 있게 설계합니다.
 */
export const ContainedStyleButton: Story = {
  args: {
    text: "신규 등록",
    property: "Contained",
    propertyStyle: "Brand",
    iconOption: { iconNm: "add", iconColor: "invert" },
    size: "M",
  },
};
/**
 * Medium emphasis - Outlined
 *
 * (컴포넌트 가로폭) - (마진)의 가로폭으로 적용합니다.
 *
 * radius 4px, 8px 중 스타일에 따라 자유 지정
 */
export const OutlinedStyleButton: Story = {
  args: {
    text: "로그인",
    property: "Outlined",
    propertyStyle: "GrayLine",
    size: "S",
  },
};
/**
 * Low emphasis - Text
 *
 * 컴포넌트 가로폭과 동일하게 적용합니다.
 */
export const TextStyleButton: Story = {
  args: {
    text: "회원가입",
    property: "Text",
    propertyStyle: "Brand",
    size: "M",
  },
};
export const IconStyleButton: Story = {
  args: {
    iconOption: { iconNm: "download", iconColor: "sub" },
    property: "Outlined",
    propertyStyle: "GrayFill",
    text: "다운로드",
    size: "L",
  },
};
