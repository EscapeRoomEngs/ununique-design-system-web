import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "../../atom/Container";
import { Dialog } from "../../components/Dialog";
import "../globalStyles.css";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Design System/Component/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DialogExample: Story = {
  args: {
    title: "다이얼로그 제목",
    messages: "다이얼로그 내용1\\n다이얼로그 내용2",
    btns: [
      { text: "취소", property: "outlined" },
      { text: "확인", property: "brand" },
    ],
  },
  render: (args) => (
    <Container style={{ minWidth: "500px", minHeight: "300px" }}>
      <Dialog title="-" messages="-" btns={[]} {...args} />
    </Container>
  ),
};
