import type { Meta, StoryObj } from "@storybook/react";
import { CardTemplate } from "../../components/layout/Template";
import { color } from "../../styles/color";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Design System/Guide/Example/CardTemplate",
  component: CardTemplate,
  parameters: {
    layout: "centered",
  },
  // tags: ["autodocs"],
  // render: ({children, ...args}: CardProps) => {
  //     return (
  //     <CardTemplate {...args}>
  //       {children}
  //     </CardTemplate>
  //   )
  // }
} satisfies Meta<typeof CardTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InvertCardTemplate: Story = {
  args: {
    heading: {
      style: "Small",
      children: "페이지 타이틀 Heading M / 캡틴 아메리카: 시빌 워",
    },
    title: {
      style: "Small",
      children: "1. 콘텐츠 타이틀 Title XL / 애니메이션",
    },
    subTitle: {
      style: "Small",
      children: "콘텐츠 서브 타이틀 Title M / 고효율 작업을 위한 생산성 도구 추천",
    },
    body: {
      style: "Large",
      children:
        "주요 콘텐츠 Body M / 색상과 디자인이 사진과 정확히 일치해요. 품질도 좋고, 가격 대비 만족스러워요.\n주요 콘텐츠 Body M / 색상과 디자인이 사진과 정확히 일치해요. 품질도 좋고, 가격 대비 만족스러워요.\n주요 콘텐츠 Body M / 색상과 디자인이 사진과 정확히 일치해요. 품질도 좋고, 가격 대비 만족스러워요.\n주요 콘텐츠 Body M / 색상과 디자인이 사진과 정확히 일치해요. 품질도 좋고, 가격 대비 만족스러워요.",
    },
    containerStyle: { bgColor: "invert" },
    style: { padding: "40px", borderRadius: "20px", color: color.text.invert },
  },
};
