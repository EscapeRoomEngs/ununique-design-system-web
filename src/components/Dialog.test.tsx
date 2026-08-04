import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dialog } from "./Dialog";

function ControlledDialog() {
  const [open, setOpen] = useState(false);

  return <>
    <button onClick={() => setOpen(true)}>열기</button>
    <Dialog open={open} title="확인" messages="내용" onClose={() => setOpen(false)} btns={[{ text: "취소" }, { text: "확인" }]} />
  </>;
}

describe("Dialog", () => {
  it("renders a semantic dialog with static backdrop classes", () => {
    render(<Dialog title="제목" messages="내용" btns={[{ text: "닫기" }]} />);
    expect(screen.getByRole("dialog")).toHaveClass("fixed", "inset-0");
  });

  it("forwards button actions", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Dialog title="확인" messages="내용" btns={[{ text: "닫기", onClick }]} />);

    await user.click(screen.getByRole("button", { name: "닫기" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("requests close on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<><button>열기</button><Dialog title="확인" messages="내용" onClose={onClose} btns={[{ text: "닫기" }]} /></>);

    await user.click(screen.getByRole("button", { name: "닫기" }));
    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("focuses a fallback and requests controlled close without unmounting when no actions exist", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Dialog open title="확인" messages="내용" onClose={onClose} btns={[]} />);
    const dialog = screen.getByRole("dialog", { name: "확인" });

    expect(dialog.querySelector("section")).toHaveFocus();
    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledOnce();
    expect(dialog).toBeInTheDocument();
  });

  it("labels and describes the dialog with stable content ids and focuses the first enabled button", () => {
    render(<Dialog title="확인" messages="첫 줄\n둘째 줄" btns={[{ text: "사용 불가", disabled: true }, { text: "계속" }]} />);
    const dialog = screen.getByRole("dialog", { name: "확인" });
    const title = document.getElementById(dialog.getAttribute("aria-labelledby") ?? "");
    const messages = document.getElementById(dialog.getAttribute("aria-describedby") ?? "");

    expect(title).toHaveTextContent("확인");
    expect(messages).toHaveTextContent("첫 줄둘째 줄");
    expect(screen.getByRole("button", { name: "계속" })).toHaveFocus();
  });

  it("does not render while closed and restores focus after a controlled close", async () => {
    const user = userEvent.setup();
    render(<ControlledDialog />);
    const opener = screen.getByRole("button", { name: "열기" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(opener);
    expect(screen.getByRole("button", { name: "취소" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it("cycles Tab and Shift+Tab among dialog controls", async () => {
    const user = userEvent.setup();
    render(<Dialog title="확인" messages="내용" btns={[{ text: "취소" }, { text: "확인" }]} />);
    const first = screen.getByRole("button", { name: "취소" });
    const last = screen.getByRole("button", { name: "확인" });

    expect(first).toHaveFocus();
    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(last).toHaveFocus();
    await user.tab();
    expect(first).toHaveFocus();
  });

  it("requests close only for allowed overlay clicks", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { rerender } = render(<Dialog title="확인" messages="내용" onClose={onClose} btns={[{ text: "닫기" }]} />);

    await user.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledOnce();

    onClose.mockClear();
    rerender(<Dialog title="확인" messages="내용" onClose={onClose} closeOnOverlayClick={false} btns={[{ text: "닫기" }]} />);
    await user.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "닫기" }));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("keeps the legacy fixed 400px dialog panel", () => {
    render(<Dialog title="제목" messages="내용" btns={[{ text: "닫기" }]} />);

    expect(screen.getByRole("dialog").querySelector("section")).toHaveClass("w-[400px]", "p-4", "pt-6", "gap-6");
  });
});
