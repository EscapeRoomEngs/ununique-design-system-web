import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("passes static dimensions to the SVG", () => {
    const { container } = render(<Icon iconNm="add" iconSize={20} />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "20");
  });

  it("uses the runtime brand surface color for brand icons", () => {
    const { container } = render(<Icon iconNm="add" iconColor="brand" />);

    expect(container.querySelector("svg")).toHaveAttribute("fill", "var(--uui-semantic-surface-brand)");
  });

  it("hides decorative icons from assistive technology by default", () => {
    const { container } = render(<Icon iconNm="add" />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("svg")).toHaveAttribute("focusable", "false");
  });

  it("allows consumers to override decorative SVG attributes", () => {
    const { container } = render(<Icon iconNm="add" aria-hidden="false" focusable="true" />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "false");
    expect(container.querySelector("svg")).toHaveAttribute("focusable", "true");
  });
});
