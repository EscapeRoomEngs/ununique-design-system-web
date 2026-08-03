import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("uses static utility classes for its brand variant", () => {
    render(<Button property="brand" text="확인" />);
    expect(screen.getByRole("button", { name: "확인" })).toHaveClass("bg-uui-surface-brand");
  });
});
