import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "./Container";

describe("Container", () => {
  it("uses static flex utility classes", () => {
    const { getByTestId } = render(<Container data-testid="container" display="flex" justify="center" />);
    expect(getByTestId("container")).toHaveClass("flex", "justify-center");
  });
});
