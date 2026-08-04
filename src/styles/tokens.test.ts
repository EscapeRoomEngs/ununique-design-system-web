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

  it("maps the namespaced brand utilities to runtime semantic variables", () => {
    expect(css).toContain("--color-uui-surface-brand: var(--uui-semantic-surface-brand)");
    expect(css).toContain("--color-uui-text-brand: var(--uui-semantic-text-brand)");
  });

  it("keeps brand themes namespaced and negative tokens independent", () => {
    expect(css).toContain('[data-uui-theme="orange"]');
    expect(css).toContain("--uui-semantic-surface-brand: #ff3d00");
    expect(css).toContain("--color-uui-border-negative: #ff4053");
  });

  it("maps brand interaction utilities to namespaced runtime variables", () => {
    expect(css).toContain("--color-uui-surface-brand-hover: var(--uui-semantic-surface-brand-hover)");
    expect(css).toContain("--color-uui-surface-brand-active: var(--uui-semantic-surface-brand-active)");
    expect(css).toContain("--color-uui-focus-brand: var(--uui-semantic-focus-brand)");
    expect(css).toContain("--uui-semantic-surface-brand-active: #e63600");
  });
});
