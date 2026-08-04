import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "./ThemeProvider";

describe("ThemeProvider", () => {
  it("renders a typed orange theme boundary", () => {
    render(
      <ThemeProvider theme="orange">
        <span>content</span>
      </ThemeProvider>,
    );

    expect(screen.getByText("content").parentElement).toHaveAttribute("data-uui-theme", "orange");
  });

  it("uses red when no theme is supplied", () => {
    render(
      <ThemeProvider>
        <span>content</span>
      </ThemeProvider>,
    );

    expect(screen.getByText("content").parentElement).toHaveAttribute("data-uui-theme", "red");
  });
});
