import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Body } from "./Text";

describe("Body", () => {
  it("uses static typography utility classes", () => {
    render(<Body fontStyle="Medium">본문</Body>);
    expect(screen.getByText("본문")).toHaveClass("text-[15px]");
  });

  it("does not forward typography-only props to the DOM", () => {
    render(<Body fontColor="secondary" weight={500}>본문</Body>);
    const body = screen.getByText("본문");

    expect(body).not.toHaveAttribute("fontcolor");
    expect(body).not.toHaveAttribute("weight");
  });
});
