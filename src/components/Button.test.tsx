import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("uses static utility classes for its brand variant", () => {
    render(<Button property="brand" text="확인" />);
    expect(screen.getByRole("button", { name: "확인" })).toHaveClass("bg-uui-surface-brand");
  });

  const stateContracts = [
    {
      property: "outlined" as const,
      classes: ["bg-uui-surface-primary", "text-uui-text-on-neutral", "hover:border-uui-border-hover", "hover:bg-uui-surface-secondary", "active:border-uui-border-tertiary", "active:bg-uui-surface-tertiary"],
    },
    {
      property: "brand" as const,
      classes: ["bg-uui-surface-brand", "text-uui-text-on-brand", "hover:bg-uui-surface-brand-hover", "hover:text-uui-text-on-brand-hover", "active:bg-uui-surface-brand-active", "active:text-uui-text-on-brand-active"],
    },
    {
      property: "negative" as const,
      classes: ["bg-uui-surface-negative", "text-uui-text-on-negative", "hover:bg-uui-surface-negative-hover", "active:bg-uui-surface-negative-active"],
    },
    {
      property: "positive" as const,
      classes: ["bg-uui-surface-positive", "text-uui-text-on-positive", "hover:bg-uui-surface-positive-hover", "active:bg-uui-surface-positive-active"],
    },
    {
      property: "info" as const,
      classes: ["bg-uui-surface-info", "text-uui-text-on-info", "hover:bg-uui-surface-info-hover", "active:bg-uui-surface-info-active"],
    },
    {
      property: "invert" as const,
      classes: ["bg-uui-surface-invert", "text-uui-text-on-invert", "hover:bg-uui-surface-invert-hover", "active:bg-uui-surface-invert-active"],
    },
  ];

  it.each(stateContracts)("provides complete enabled and disabled states for $property", ({ property, classes }) => {
    render(
      <>
        <Button property={property} text={`${property} enabled`} />
        <Button disabled property={property} text={`${property} disabled`} />
      </>,
    );

    const enabled = screen.getByRole("button", { name: `${property} enabled` });
    expect(enabled).toHaveClass(...classes, "focus-visible:outline-2", "focus-visible:outline-uui-focus-brand");
    expect(enabled.className).not.toContain(["text", "black"].join("-"));

    expect(screen.getByRole("button", { name: `${property} disabled` })).toHaveClass(
      "disabled:pointer-events-none",
      "disabled:bg-uui-surface-tertiary",
      "disabled:text-uui-text-tertiary",
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
