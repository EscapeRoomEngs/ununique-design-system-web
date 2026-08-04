import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(path.resolve("src/styles/tokens.css"), "utf8");

function scopedHex(scope: string, variable: string) {
  const start = css.indexOf(`${scope} {`);
  if (start < 0) throw new Error(`Missing CSS scope: ${scope}`);
  const end = css.indexOf("}", start);
  const block = css.slice(start, end);
  const match = block.match(new RegExp(`${variable}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`Missing hex token ${variable} in ${scope}`);
  return match[1];
}

function relativeLuminance(hex: string) {
  const channels = hex.match(/[0-9a-f]{2}/gi)?.map((channel) => Number.parseInt(channel, 16) / 255);
  if (!channels || channels.length !== 3) throw new Error(`Invalid hex color: ${hex}`);
  const [red, green, blue] = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
}

function contrastRatio(foreground: string, background: string) {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

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

  it("keeps brand text readable on white in the default, red, and orange themes", () => {
    const white = scopedHex("@theme", "--color-uui-surface-primary");

    for (const scope of [":root", '[data-uui-theme="red"]', '[data-uui-theme="orange"]']) {
      const ratio = contrastRatio(scopedHex(scope, "--uui-semantic-text-brand"), white);
      expect(ratio, `${scope} brand text contrast`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("keeps interaction tokens separate from legacy component foreground colors", () => {
    expect(css).not.toContain("--color-uui-text-on-brand");
    expect(css).not.toContain("--uui-semantic-text-on-brand");
  });
});
