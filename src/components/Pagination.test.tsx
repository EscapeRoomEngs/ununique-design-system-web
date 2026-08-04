import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("disables navigation at boundaries and emits only a valid next page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPageIndex={0} totalPageCnt={2} onPageChange={onPageChange} />);

    expect(screen.getByRole("button", { name: "이전 페이지" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "다음 페이지" }));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("keeps the legacy page input dimensions and padding", () => {
    render(<Pagination currentPageIndex={0} totalPageCnt={2} />);

    expect(screen.getByRole("textbox", { name: "현재 페이지" })).toHaveClass("h-10", "w-[68px]", "px-2.5", "py-2", "text-center");
  });

  it("labels page navigation", () => {
    render(<Pagination currentPageIndex={0} totalPageCnt={5} />);

    expect(screen.getByRole("navigation", { name: "페이지 탐색" })).toBeInTheDocument();
  });

  it("commits a typed page when the page input loses focus", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPageIndex={0} totalPageCnt={5} onPageChange={onPageChange} />);

    const input = screen.getByRole("textbox", { name: "현재 페이지" });
    await user.clear(input);
    await user.type(input, "3");
    await user.tab();

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("clamps a blurred page input to the last zero-based page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPageIndex={0} totalPageCnt={5} onPageChange={onPageChange} />);

    const input = screen.getByRole("textbox", { name: "현재 페이지" });
    await user.clear(input);
    await user.type(input, "8");
    await user.tab();

    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
