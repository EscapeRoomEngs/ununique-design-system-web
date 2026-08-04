import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("uses static utility classes for its brand variant", () => {
    render(<Button property="brand" text="확인" />);
    expect(screen.getByRole("button", { name: "확인" })).toHaveClass("bg-uui-surface-brand");
  });

  it("uses semantic brand hover, active, and 2px focus classes", () => {
    render(<Button property="brand" text="저장" />);

    expect(screen.getByRole("button", { name: "저장" })).toHaveClass(
      "hover:bg-uui-surface-brand-hover",
      "active:bg-uui-surface-brand-active",
      "focus-visible:outline-2",
      "focus-visible:outline-uui-focus-brand",
      "text-uui-text-primary",
    );
  });

  it("blocks pointer interaction and applies disabled utilities when disabled", () => {
    render(<Button disabled property="brand" text="저장" />);

    expect(screen.getByRole("button", { name: "저장" })).toHaveClass(
      "disabled:pointer-events-none",
      "disabled:bg-uui-surface-tertiary",
      "disabled:text-uui-text-tertiary",
    );
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
