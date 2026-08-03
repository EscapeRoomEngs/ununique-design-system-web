import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("legacy Storybook compatibility CSS", () => {
  it("restores namespaced Foundation helper selectors", () => {
    const css = readFileSync(path.resolve("src/stories/legacyStorybook.css"), "utf8");

    for (const selector of [".uui-legacy-layout-upper-lower", ".uui-legacy-surface-primary", ".uui-legacy-border-default", ".uui-legacy-weight-600"]) {
      expect(css).toContain(selector);
    }
  });

  it("does not override generic Tailwind utility selectors", () => {
    const css = readFileSync(path.resolve("src/stories/legacyStorybook.css"), "utf8");

    for (const selector of [".grid {", ".text-primary {", ".border-default {"]) {
      expect(css).not.toContain(selector);
    }
  });

  it("defines namespaced Foundation helper selectors", () => {
    const css = readFileSync(path.resolve("src/stories/legacyStorybook.css"), "utf8");

    for (const selector of [".uui-legacy-layout-upper-lower", ".uui-legacy-surface-primary", ".uui-legacy-border-default", ".uui-legacy-weight-600"]) {
      expect(css).toContain(selector);
    }
  });
});
