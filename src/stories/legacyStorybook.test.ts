import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("legacy Storybook compatibility CSS", () => {
  it("restores Foundation helper selectors", () => {
    const css = readFileSync(path.resolve("src/stories/legacyStorybook.css"), "utf8");

    for (const selector of [".flex-upper-lower", ".surface-primary", ".border-default", ".weight-600"]) {
      expect(css).toContain(selector);
    }
  });
});
