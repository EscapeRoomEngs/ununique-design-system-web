import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("uses static utility classes for its brand variant", () => {
    render(<Button property="brand" text="확인" />);
    expect(screen.getByRole("button", { name: "확인" })).toHaveClass("bg-uui-surface-brand");
  });

  it("uses legacy disabled colors", () => {
    render(<Button disabled property="brand" text="확인" />);

    expect(screen.getByRole("button", { name: "확인" })).toHaveClass("bg-uui-surface-tertiary", "text-uui-text-tertiary");
  });

  it("preserves the legacy Medium button padding", () => {
    render(<Button size="Medium" text="확인" />);

    expect(screen.getByRole("button", { name: "확인" })).toHaveClass("h-12", "px-8", "py-3.5", "cursor-pointer");
  });
});
