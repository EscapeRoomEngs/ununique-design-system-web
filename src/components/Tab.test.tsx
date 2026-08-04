import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TabBar } from "./Tab";

describe("TabBar", () => {
  it("uses tabs and emits the selected tab", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const review = { text: "후기" };

    render(<TabBar tabList={[{ text: "상품" }, review]} selected={{ text: "상품" }} onSelect={onSelect} />);
    await user.click(screen.getByRole("tab", { name: "후기" }));

    expect(onSelect).toHaveBeenCalledWith(review);
  });

  it("uses tablist semantics with roving focus", () => {
    render(<TabBar tabList={[{ text: "상품" }, { text: "후기" }]} selected={{ text: "상품" }} />);

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "상품" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "상품" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tab", { name: "후기" })).toHaveAttribute("aria-selected", "false");
    expect(screen.getByRole("tab", { name: "후기" })).toHaveAttribute("tabindex", "-1");
  });

  it("selects the next tab with ArrowRight", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const tabs = [{ text: "상품" }, { text: "후기" }];
    render(<TabBar tabList={tabs} selected={tabs[0]} onSelect={onSelect} />);

    await user.click(screen.getByRole("tab", { name: "상품" }));
    await user.keyboard("{ArrowRight}");

    expect(onSelect).toHaveBeenCalledWith(tabs[1]);
    expect(screen.getByRole("tab", { name: "후기" })).toHaveFocus();
  });

  it("wraps ArrowLeft and selects the last tab", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const tabs = [{ text: "상품" }, { text: "후기" }];
    render(<TabBar tabList={tabs} selected={tabs[0]} onSelect={onSelect} />);

    await user.click(screen.getByRole("tab", { name: "상품" }));
    await user.keyboard("{ArrowLeft}");

    expect(onSelect).toHaveBeenCalledWith(tabs[1]);
  });

  it("selects the first and last tabs with Home and End", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const tabs = [{ text: "상품" }, { text: "후기" }, { text: "문의" }];
    render(<TabBar tabList={tabs} selected={tabs[1]} onSelect={onSelect} />);

    screen.getByRole("tab", { name: "후기" }).focus();
    await user.keyboard("{Home}");
    await user.keyboard("{End}");

    expect(onSelect).toHaveBeenNthCalledWith(1, tabs[0]);
    expect(onSelect).toHaveBeenNthCalledWith(2, tabs[2]);
  });

  it("uses the legacy typography line height", () => {
    render(<TabBar tabList={[{ text: "상품" }]} selected={{ text: "상품" }} />);

    expect(screen.getByRole("tab", { name: "상품" })).toHaveClass("leading-[1.3]");
  });

  it("keeps the legacy tab padding and underline thickness", () => {
    render(<TabBar tabList={[{ text: "상품" }]} selected={{ text: "상품" }} />);

    expect(screen.getByRole("tab", { name: "상품" })).toHaveClass("border-b-2", "px-6", "py-3.5", "text-lg");
  });
});
