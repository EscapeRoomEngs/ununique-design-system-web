import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("passes static dimensions to the SVG", () => {
    const { container } = render(<Icon iconNm="add" iconSize={20} />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "20");
  });
});
