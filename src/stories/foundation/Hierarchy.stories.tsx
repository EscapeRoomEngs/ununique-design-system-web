import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "../../atom/Container";
import { Body, Heading, Title } from "../../atom/Text";
import { token } from "../../foundation/color";

const meta: Meta = {
  tags: ["!dev"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const HierarchyExample: Story = {
  args: {
    style: { padding: "40px", color: token.text.invert.hex },
    bgColor: "invert",
    radius: 20,
  },
  render: (args) => (
    <Container spacing={80} {...args}>
      <Heading>페이지 타이틀 Heading M / 캡틴 아메리카: 시빌 워</Heading>
      <Container spacing={40}>
        <Heading fontStyle="Small">1. 콘텐츠 타이틀 Title XL / 애니메이션</Heading>
        <Container spacing={32}>
          <Title fontStyle="Small">
            콘텐츠 서브 타이틀 Title M / 고효율 작업을 위한 생산성 도구 추천
          </Title>
          <Container spacing={24}>
            <Body fontStyle="Large">
              주요 콘텐츠 Body M / 색상과 디자인이 사진과 정확히 일치해요. 품질도 좋고, 가격 대비
              만족스러워요.
              <br />
              주요 콘텐츠 Body M / 색상과 디자인이 사진과 정확히 일치해요. 품질도 좋고, 가격 대비
              만족스러워요.
              <br />
              주요 콘텐츠 Body M / 색상과 디자인이 사진과 정확히 일치해요. 품질도 좋고, 가격 대비
              만족스러워요.
              <br />
              주요 콘텐츠 Body M / 색상과 디자인이 사진과 정확히 일치해요. 품질도 좋고, 가격 대비
              만족스러워요.
            </Body>
            <Body>주요 콘텐츠의 보조 Detail M / jung456@email.com</Body>
          </Container>
        </Container>
      </Container>
    </Container>
  ),
};
