import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { fn } from "storybook/test";
import { Container } from "../../atom/Container";
import { Body } from "../../atom/Text";
import { Button } from "../../components/Button";
import { Dialog } from "../../components/Dialog";
import type { DialogProps } from "../../components/Dialog";
import { ThemeProvider } from "../../theme/ThemeProvider";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Dialog> = {
  title: "Design System/Component/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { open: true, onClose: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

function ControlledDialog(args: DialogProps) {
  const [open, setOpen] = useState(args.open ?? true);

  useEffect(() => setOpen(args.open ?? true), [args.open]);

  const close = () => {
    setOpen(false);
    args.onClose?.();
  };

  return (
    <Container style={{ minWidth: "500px", minHeight: "300px" }}>
      <Button text="다이얼로그 열기" onClick={() => setOpen(true)} />
      <Dialog {...args} open={open} onClose={close} />
    </Container>
  );
}

function ThemeDialogLauncher({ theme }: { theme: "red" | "orange" }) {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme} className="grid gap-2">
      <Body fontColor="brand">{theme} dialog</Body>
      <Button property="brand" text={`${theme} 다이얼로그 열기`} onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title={`${theme} 테마`}
        messages="브랜드 버튼과 포커스 상태를 확인하세요"
        btns={[{ text: "닫기", property: "brand", onClick: () => setOpen(false) }]}
      />
    </ThemeProvider>
  );
}

export const DialogExample: Story = {
  args: {
    title: "다이얼로그 제목",
    messages: "다이얼로그 내용1\\n다이얼로그 내용2",
    btns: [
      { text: "취소", property: "outlined", onClick: fn() },
      { text: "확인", property: "brand", onClick: fn() },
    ],
  },
  render: (args) => <ControlledDialog {...args} />,
};

export const SingleActionDialog: Story = {
  args: {
    title: "완료",
    messages: "저장되었습니다",
    btns: [{ text: "확인", property: "brand", onClick: fn() }],
  },
  render: (args) => <ControlledDialog {...args} />,
};

export const BrandThemeParity: Story = {
  args: {
    title: "테마 다이얼로그",
    messages: "브랜드 버튼과 포커스 상태를 확인하세요",
    btns: [{ text: "닫기", property: "brand" }],
  },
  render: () => (
    <div className="flex gap-6">
      <ThemeDialogLauncher theme="red" />
      <ThemeDialogLauncher theme="orange" />
    </div>
  ),
};
