# Visual Parity Tailwind Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore `v0.1.0` Storybook visual output with static Tailwind v4 classes and CSS tokens, without restoring `styled-components`.

**Architecture:** Define the legacy semantic palette in CSS custom properties and expose it to Tailwind v4 theme utilities. Add a Storybook-only compatibility stylesheet for the legacy documentation helpers and reset. Components retain their current semantic APIs but map every state to the restored token utilities.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS v4, Storybook 10, Vitest, React Testing Library, Chromatic.

## Global Constraints

- Do not add `styled-components`, runtime CSS-in-JS, or new runtime styling dependencies.
- Keep all existing public component props and current accessibility behavior.
- Match the semantic HEX values exported by `src/foundation/color.ts`, not Tailwind's default red, blue or slate palette.
- Keep `src/styles/index.css` as the package CSS entry; keep Storybook documentation styling out of its published output.
- Preserve the path-filtered CI, manual package publishing workflow and Chromatic cancellation policy.

---

### Task 1: Restore semantic CSS tokens and static token contracts

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/index.css`
- Create: `src/styles/tokens.test.ts`

**Interfaces:**
- Produces `--color-uui-{surface,text,icon,border}-{name}` custom properties and matching Tailwind v4 utilities such as `bg-uui-surface-negative`, `text-uui-text-positive` and `border-uui-border-invert`.
- Consumes the immutable semantic values from `src/foundation/color.ts`.

- [ ] **Step 1: Write token-contract tests**

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("./tokens.css", import.meta.url), "utf8");

describe("legacy semantic token CSS", () => {
  it("preserves the legacy negative, positive and info values", () => {
    expect(css).toContain("--color-uui-surface-negative: #ffeef0");
    expect(css).toContain("--color-uui-surface-positive: #e6f4ff");
    expect(css).toContain("--color-uui-surface-info: #f1f5f9");
    expect(css).toContain("--color-uui-text-negative: #ff4053");
    expect(css).toContain("--color-uui-text-positive: #1677ff");
    expect(css).toContain("--color-uui-text-info: #64748b");
  });
});
```

- [ ] **Step 2: Run the focused test and confirm the missing token failure**

Run: `npm run test -- src/styles/tokens.test.ts`

Expected: FAIL because the semantic aliases do not yet exist.

- [ ] **Step 3: Define complete semantic aliases in `tokens.css`**

```css
@theme {
  --color-uui-surface-negative: #ffeef0;
  --color-uui-surface-positive: #e6f4ff;
  --color-uui-surface-info: #f1f5f9;
  --color-uui-text-negative: #ff4053;
  --color-uui-text-positive: #1677ff;
  --color-uui-text-info: #64748b;
  --color-uui-icon-negative: #ff4053;
  --color-uui-border-hover: #a0a0a0;
  --color-uui-border-invert: #e6e6e6;
}
```

Include all existing primary, secondary, tertiary, invert, brand and default/tertiary/negative aliases under the same naming convention.

- [ ] **Step 4: Remove component reliance on Tailwind palette aliases from the package stylesheet**

Keep the Tailwind theme and utilities imports, then import `tokens.css`; do not import Storybook compatibility CSS from `index.css`.

- [ ] **Step 5: Run token tests and the package build**

Run: `npm run test -- src/styles/tokens.test.ts && npm run build`

Expected: PASS; `dist/styles.css` contains semantic token utilities.

- [ ] **Step 6: Commit the token layer**

```bash
git add src/styles/tokens.css src/styles/index.css src/styles/tokens.test.ts
git commit -m "fix: restore semantic CSS tokens"
```

### Task 2: Restore Storybook-only legacy global helpers

**Files:**
- Create: `src/stories/legacyStorybook.css`
- Modify: `.storybook/preview.ts`
- Create: `src/stories/legacyStorybook.test.ts`

**Interfaces:**
- Produces reset styles plus the legacy `weight-*`, `surface-*`, `text-*`, `border-*`, `icon-*`, `flex-*` and documentation table selectors.
- Consumes `src/styles/fonts.css` and the token CSS custom properties exposed by Task 1.

- [ ] **Step 1: Write the compatibility-selector contract test**

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("./legacyStorybook.css", import.meta.url), "utf8");

describe("legacy Storybook compatibility CSS", () => {
  it("restores Foundation helper selectors", () => {
    for (const selector of [".flex-upper-lower", ".surface-primary", ".border-default", ".weight-600"]) {
      expect(css).toContain(selector);
    }
  });
});
```

- [ ] **Step 2: Run the focused test and confirm it fails before the stylesheet exists**

Run: `npm run test -- src/stories/legacyStorybook.test.ts`

Expected: FAIL with an ENOENT error for `legacyStorybook.css`.

- [ ] **Step 3: Create `legacyStorybook.css` with static equivalents**

```css
html, body, div, span, h1, h2, h3, h4, h5, h6, p, input, textarea, button {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font: inherit;
  line-height: 130%;
  vertical-align: middle;
  font-family: "Pretendard", sans-serif;
}
.flex-sides { display: flex; justify-content: space-between; align-items: center; }
.flex-upper-lower { display: flex; flex-direction: column; justify-content: space-between; align-items: stretch; }
.surface-primary { background-color: var(--color-uui-surface-primary); }
.border-default { border-style: solid; border-color: var(--color-uui-border-default); }
.weight-600 { font-family: "Pretendard", sans-serif; font-weight: 600; }
```

Add the complete legacy selector set used by `src/stories/**`, including `grid`, `flex-center`, `flex-left`, `flex-right`, `surface-*`, `text-*`, `border-*`, `icon-*`, `weight-300/400/500/600`, and the existing `#storybook-docs` table styles.

- [ ] **Step 4: Import the compatibility layer once in Storybook**

```ts
import "../src/styles/index.css";
import "../src/styles/fonts.css";
import "../src/stories/legacyStorybook.css";
```

Do not import it from `src/index.ts` or `src/main.ts`.

- [ ] **Step 5: Run the selector test and Storybook build**

Run: `npm run test -- src/stories/legacyStorybook.test.ts && npm run build-storybook`

Expected: PASS; Foundation stories no longer render unstyled utility class names.

- [ ] **Step 6: Commit the Storybook compatibility layer**

```bash
git add .storybook/preview.ts src/stories/legacyStorybook.css src/stories/legacyStorybook.test.ts
git commit -m "fix: restore Storybook legacy styles"
```

### Task 3: Restore component semantic state parity

**Files:**
- Modify: `src/atom/Container.tsx`
- Modify: `src/atom/Container.test.tsx`
- Modify: `src/atom/Text.tsx`
- Modify: `src/atom/Text.test.tsx`
- Modify: `src/components/Button.tsx`
- Modify: `src/components/Button.test.tsx`
- Modify: `src/components/Input.tsx`
- Modify: `src/components/Input.test.tsx`
- Modify: `src/components/Tab.tsx`
- Modify: `src/components/Tab.test.tsx`

**Interfaces:**
- Consumes semantic token utility names produced by Task 1.
- Preserves `ContainerProps`, `TypographyProps`, `ButtonProps`, `TextFieldsProps`, `DropdownProps`, `ChoiceProps` and `TabProps` without new public props.

- [ ] **Step 1: Add failing parity assertions to the existing tests**

```tsx
it("maps the full legacy Container token set", () => {
  const { getByTestId } = render(<Container data-testid="container" bgColor="positive" borderColor="invert" />);
  expect(getByTestId("container")).toHaveClass("bg-uui-surface-positive", "border-uui-border-invert");
});

it("keeps Body at the legacy 14px default", () => {
  render(<Body>본문</Body>);
  expect(screen.getByText("본문")).toHaveClass("text-sm", "leading-[1.3]");
});

it("uses legacy disabled Button colors", () => {
  render(<Button disabled property="brand" text="확인" />);
  expect(screen.getByRole("button", { name: "확인" })).toHaveClass("bg-uui-surface-tertiary", "text-uui-text-tertiary");
});
```

Add equivalent assertions that a negative TextField uses `border-uui-border-negative`, Dropdown option hover uses `bg-uui-surface-negative`, and Tab uses `leading-[1.3]`.

- [ ] **Step 2: Run focused component tests and confirm failures**

Run: `npm run test -- src/atom/Container.test.tsx src/atom/Text.test.tsx src/components/Button.test.tsx src/components/Input.test.tsx src/components/Tab.test.tsx`

Expected: FAIL on each newly asserted legacy token or metric.

- [ ] **Step 3: Replace palette substitutions and restore defaults**

```ts
const surfaces = {
  negative: "bg-uui-surface-negative",
  positive: "bg-uui-surface-positive",
  info: "bg-uui-surface-info",
};
const colors = {
  negative: "text-uui-text-negative",
  positive: "text-uui-text-positive",
  info: "text-uui-text-info",
};
```

Map Container `hover` and `invert` borders, make `Body` default to `fontStyle="Small"`, add disabled Button semantic classes, calculate Button icon color from the property token, and use semantic tokens in Input, Dropdown and Tab. Preserve existing ARIA attributes and event handling.

- [ ] **Step 4: Restore legacy component sizing where Tailwind defaults diverge**

Use `leading-[1.3]` for Tab labels and keep the legacy 40/48/54px Button heights, 44px input height, 328/440/672px input widths, 8px input/dropdown radius, 16px Dialog radius, 24/16px Dialog padding and 8px control gaps.

- [ ] **Step 5: Run component tests and accessibility tests**

Run: `npm run test -- src/atom/Container.test.tsx src/atom/Text.test.tsx src/components/Button.test.tsx src/components/Input.test.tsx src/components/Tab.test.tsx src/components/accessibility.test.tsx`

Expected: PASS with no accessibility regression.

- [ ] **Step 6: Commit component parity changes**

```bash
git add src/atom/Container.tsx src/atom/Container.test.tsx src/atom/Text.tsx src/atom/Text.test.tsx src/components/Button.tsx src/components/Button.test.tsx src/components/Input.tsx src/components/Input.test.tsx src/components/Tab.tsx src/components/Tab.test.tsx
git commit -m "fix: restore component visual parity"
```

### Task 4: Expose and verify representative visual states

**Files:**
- Modify: `src/stories/atom/Container.stories.tsx`
- Modify: `src/stories/atom/Text.stories.tsx`
- Modify: `src/stories/component/Button.stories.tsx`
- Modify: `src/stories/component/TextField.stories.tsx`
- Modify: `src/stories/component/Tab.stories.tsx`
- Modify: `docs/testing.md`

**Interfaces:**
- Produces stable Chromatic snapshots for semantic color variants, disabled controls, error/focus input state and selected tabs.
- Consumes the component APIs from Task 3 and existing Chromatic workflow path triggers.

- [ ] **Step 1: Add named parity stories without changing existing story IDs**

```tsx
export const SemanticSurfaceParity: Story = {
  render: () => <Container display="flex" spacing={8}>{(["negative", "positive", "info"] as const).map((bgColor) => <Container key={bgColor} bgColor={bgColor} style={{ width: 80, height: 80 }} />)}</Container>,
};

export const SemanticButtonParity: Story = {
  render: () => <div className="flex gap-2">{(["negative", "positive", "info"] as const).map((property) => <Button key={property} property={property} text={property} />)}<Button disabled property="brand" text="disabled" /></div>,
};
```

Use deterministic args only; do not add time-dependent content, network calls or random data.

- [ ] **Step 2: Build Storybook and inspect the generated story index**

Run: `npm run build-storybook && rg -n "SemanticSurfaceParity|SemanticButtonParity" storybook-static/index.json`

Expected: PASS; both story IDs appear exactly once.

- [ ] **Step 3: Record the visual-review policy**

Add to `docs/testing.md`: every UI component parity change requires Chromatic review of default, semantic variant and disabled/error/selected states; a baseline must not be accepted without comparing to `v0.1.0`.

- [ ] **Step 4: Run the complete local verification suite**

Run: `npm run lint && npm run test:coverage && npm run build && npm run build-storybook && npm run test:package`

Expected: PASS. Verify `rg -n "styled-components" package.json package-lock.json src` returns no matches.

- [ ] **Step 5: Commit visual coverage and documentation**

```bash
git add src/stories/atom/Container.stories.tsx src/stories/atom/Text.stories.tsx src/stories/component/Button.stories.tsx src/stories/component/TextField.stories.tsx src/stories/component/Tab.stories.tsx docs/testing.md
git commit -m "test: cover visual parity states"
```
