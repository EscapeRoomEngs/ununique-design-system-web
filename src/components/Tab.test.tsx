import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TabBar } from "./Tab";

describe("TabBar", () => {
  it("uses buttons and emits the selected tab", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const review = { text: "후기" };

    render(<TabBar tabList={[{ text: "상품" }, review]} selected={{ text: "상품" }} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "후기" }));

    expect(onSelect).toHaveBeenCalledWith(review);
  });

  it("uses the legacy typography line height", () => {
    render(<TabBar tabList={[{ text: "상품" }]} selected={{ text: "상품" }} />);

    expect(screen.getByRole("button", { name: "상품" })).toHaveClass("leading-[1.3]");
  });

  it("keeps the legacy tab padding and underline thickness", () => {
    render(<TabBar tabList={[{ text: "상품" }]} selected={{ text: "상품" }} />);

    expect(screen.getByRole("button", { name: "상품" })).toHaveClass("border-b-2", "px-6", "py-3.5", "text-lg");
  });
});
