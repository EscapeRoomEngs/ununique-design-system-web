import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(path.resolve("src/styles/tokens.css"), "utf8");

describe("legacy semantic token CSS", () => {
  it("preserves the legacy negative surface value", () => {
    expect(css).toContain("--color-uui-surface-negative: #ffeef0");
  });

  it("preserves the legacy positive surface value", () => {
    expect(css).toContain("--color-uui-surface-positive: #e6f4ff");
  });

  it("preserves the legacy info text value", () => {
    expect(css).toContain("--color-uui-text-info: #64748b");
  });
});
