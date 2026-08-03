import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dialog } from "./Dialog";

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
});
