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
});
