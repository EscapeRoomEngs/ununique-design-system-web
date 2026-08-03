import { describe, expect, it } from "vitest";
import { Button } from "./index.ts";

describe("package entry", () => {
  it("exports the Button component", () => {
    expect(Button).toBeTypeOf("function");
  });
});
