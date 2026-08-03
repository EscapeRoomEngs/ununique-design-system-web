# Rendered Visual Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the Storybook/Tailwind selector collision and restore each component's v0.1.0 dimensions and visual states without reintroducing runtime CSS-in-JS.

**Architecture:** Keep package CSS limited to Tailwind utilities and semantic tokens. Scope legacy Storybook documentation helpers under `uui-legacy-*`, then make component utilities match the original declarations from commit `c3e6795^`. Use Storybook static builds and computed style contracts as the regression gate.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS v4, Storybook 10, Vitest, React Testing Library.

## Global Constraints

- Do not add `styled-components`, runtime CSS-in-JS or new runtime styling dependencies.
- Do not use unnamespaced CSS selectors that conflict with Tailwind utilities (`grid`, `text-*`, `border-*`).
- Preserve public component APIs and the existing accessibility behavior unless that behavior visibly differs from v0.1.0.
- Match source declarations from `git show c3e6795^:<path>` exactly; do not substitute nearest Tailwind scale values.
- Keep Storybook-only documentation CSS out of `src/styles/index.css` and package output.

---

### Task 1: Remove Storybook compatibility selector collisions

**Files:**
- Modify: `src/stories/legacyStorybook.css`
- Modify: `src/stories/foundation/CornerRadius.mdx`
- Modify: `src/stories/foundation/Color.mdx`
- Modify: `src/stories/foundation/Typography.mdx`
- Modify: `src/stories/legacyStorybook.test.ts`

**Interfaces:**
- Produces Foundation-only selectors named `uui-legacy-{layout,surface,border,weight}-{name}`.
- Consumes only Foundation MDX class names; no `src/atom` or `src/components` class uses the legacy selector namespace.

- [ ] **Step 1: Write failing collision tests**

```ts
it("does not define generic Tailwind utility selectors", () => {
  for (const selector of [".grid {", ".text-primary {", ".border-default {"]) {
    expect(css).not.toContain(selector);
  }
});

it("defines namespaced Foundation helpers", () => {
  expect(css).toContain(".uui-legacy-layout-upper-lower");
  expect(css).toContain(".uui-legacy-surface-primary");
  expect(css).toContain(".uui-legacy-border-default");
  expect(css).toContain(".uui-legacy-weight-600");
});
```

- [ ] **Step 2: Run the focused test and confirm failure on `.grid`**

Run: `npm run test -- src/stories/legacyStorybook.test.ts`

Expected: FAIL because `legacyStorybook.css` currently defines `.grid`.

- [ ] **Step 3: Rename generic helpers and update every MDX consumer**

```css
.uui-legacy-layout-upper-lower { display: flex; flex-direction: column; align-items: stretch; justify-content: space-between; gap: 16px; }
.uui-legacy-layout-sides { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.uui-legacy-surface-primary { background-color: var(--color-uui-surface-primary); }
.uui-legacy-border-default { border-style: solid; border-color: var(--color-uui-border-default); }
.uui-legacy-weight-600 { font-family: var(--uui-font-sans); font-weight: 600; }
```

Replace `flex-upper-lower`, `flex-sides`, `surface-primary`, `border-default` and `weight-600` in the Foundation MDX files with the exact namespaced selector. Remove unused generic `grid`, `flex-*`, `surface-*`, `text-*`, `border-*`, `icon-*` and `weight-*` rules rather than retaining aliases.

- [ ] **Step 4: Run collision tests and Storybook build**

Run: `npm run test -- src/stories/legacyStorybook.test.ts && npm run build-storybook`

Expected: PASS; `src/components/Input.tsx` uses Tailwind `grid` without a later global `.grid` override.

- [ ] **Step 5: Commit the isolation fix**

```bash
git add src/stories/legacyStorybook.css src/stories/legacyStorybook.test.ts src/stories/foundation/CornerRadius.mdx src/stories/foundation/Color.mdx src/stories/foundation/Typography.mdx
git commit -m "fix: isolate Storybook legacy utilities"
```

### Task 2: Restore exact Button, typography and Container declarations

**Files:**
- Modify: `src/components/Button.tsx`
- Modify: `src/components/Button.test.tsx`
- Modify: `src/atom/Text.tsx`
- Modify: `src/atom/Text.test.tsx`
- Modify: `src/atom/Container.tsx`
- Modify: `src/atom/Container.test.tsx`

**Interfaces:**
- Preserves `ButtonProps`, `TypographyProps` and `ContainerProps`.
- Produces exact Button size classes: Small `h-10 px-6 py-[7px]`, Medium `h-12 px-8 py-3.5`, Large `h-[54px] px-8 py-4`.

- [ ] **Step 1: Add failing style-contract tests**

```tsx
it("preserves the legacy medium Button padding", () => {
  render(<Button size="Medium" text="확인" />);
  expect(screen.getByRole("button", { name: "확인" })).toHaveClass("h-12", "px-8", "py-3.5", "gap-2", "cursor-pointer");
});

it("uses exact legacy Container font and grid layout utilities", () => {
  const { getByTestId } = render(<Container data-testid="container" />);
  expect(getByTestId("container")).toHaveClass("grid", "justify-start", "items-center");
});
```

- [ ] **Step 2: Run focused tests and confirm missing vertical Button padding**

Run: `npm run test -- src/components/Button.test.tsx src/atom/Text.test.tsx src/atom/Container.test.tsx`

Expected: FAIL because current Button size variants omit `py-[7px]`, `py-3.5` and `py-4`.

- [ ] **Step 3: Map exact source declarations**

```ts
size: {
  Small: "h-10 px-6 py-[7px]",
  Medium: "h-12 px-8 py-3.5",
  Large: "h-[54px] px-8 py-4",
}
```

Add `cursor-pointer` to enabled Button treatment, retain 8px gap and semantic color mapping, and ensure disabled Button adds `cursor-not-allowed` with the legacy tertiary surface/text values. Preserve Typography's 48/44/40, 36/33/30, 27/24/21, 18/15/14/13 sizes with `leading-[1.3]`. Keep Container's 16px default gap and original `justify-start`/`items-center` defaults.

- [ ] **Step 4: Run focused tests and the package build**

Run: `npm run test -- src/components/Button.test.tsx src/atom/Text.test.tsx src/atom/Container.test.tsx && npm run build`

Expected: PASS.

- [ ] **Step 5: Commit the exact foundational mapping**

```bash
git add src/components/Button.tsx src/components/Button.test.tsx src/atom/Text.tsx src/atom/Text.test.tsx src/atom/Container.tsx src/atom/Container.test.tsx
git commit -m "fix: match foundational component dimensions"
```

### Task 3: Restore exact Input control and selection-control declarations

**Files:**
- Modify: `src/components/Input.tsx`
- Modify: `src/components/Input.test.tsx`

**Interfaces:**
- Preserves `TextFieldsProps`, `DropdownProps` and `ChoiceProps`.
- Produces TextField and Dropdown outer controls with widths 328/440/672px, height 44px, `px-[15px] py-3`, `rounded`, and 16px internal gap.

- [ ] **Step 1: Add failing dimensional style tests**

```tsx
it("uses the legacy 12px 15px TextField padding", () => {
  render(<TextField aria-label="입력" value="" />);
  expect(screen.getByLabelText("입력").parentElement).toHaveClass("px-[15px]", "py-3", "gap-4", "h-11", "rounded");
});

it("uses the legacy Dropdown option padding", async () => {
  const user = userEvent.setup();
  render(<Dropdown optionList={[{ id: 1, name: "서울" }]} />);
  await user.click(screen.getByRole("button", { name: "옵션 목록 열기" }));
  expect(screen.getByRole("button", { name: "서울" })).toHaveClass("h-11", "px-[15px]", "py-3");
});
```

- [ ] **Step 2: Run the focused test and confirm the current 16px horizontal padding failure**

Run: `npm run test -- src/components/Input.test.tsx`

Expected: FAIL because current controls use `px-4` and options omit vertical padding.

- [ ] **Step 3: Replace approximations with original declarations**

Replace every control-wrapper `px-4` with `px-[15px] py-3`. Give option buttons `h-11 px-[15px] py-3`. Keep 44px controls, 4px radius, 16px gaps, semantic focus/error/disabled/open borders, 20px icon buttons, and 10px vertical Radio/Checkbox padding. Remove the new disabled `opacity-60` because v0.1.0 used only `cursor: not-allowed`.

- [ ] **Step 4: Run Input and accessibility tests**

Run: `npm run test -- src/components/Input.test.tsx src/components/accessibility.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit Input visual parity**

```bash
git add src/components/Input.tsx src/components/Input.test.tsx
git commit -m "fix: match input control dimensions"
```

### Task 4: Verify Tab, Dialog and Pagination rendered contracts

**Files:**
- Modify: `src/components/Tab.tsx`
- Modify: `src/components/Tab.test.tsx`
- Modify: `src/components/Dialog.tsx`
- Modify: `src/components/Dialog.test.tsx`
- Modify: `src/components/Pagination.tsx`
- Modify: `src/components/Pagination.test.tsx`
- Modify: `docs/testing.md`

**Interfaces:**
- Preserves `TabProps`, `DialogProps` and `PaginationProps`.
- Produces Tab labels with 18px/130% type and `14px 24px` padding, Dialog panel with 400px width/16px radius/24px top plus 16px side/bottom padding, and Pagination with 16px gap and 68px by 40px input.

- [ ] **Step 1: Add exact parity tests**

```tsx
it("uses the legacy Tab padding and type metrics", () => {
  render(<TabBar tabList={[{ text: "상품" }]} selected={{ text: "상품" }} />);
  expect(screen.getByRole("button", { name: "상품" })).toHaveClass("px-6", "py-3.5", "text-lg", "leading-[1.3]");
});

it("uses the legacy Dialog panel dimensions", () => {
  render(<Dialog title="제목" messages="내용" btns={[{ text: "확인" }]} />);
  expect(screen.getByRole("dialog").firstElementChild).toHaveClass("w-[400px]", "rounded-2xl", "p-4", "pt-6");
});
```

- [ ] **Step 2: Run focused tests and confirm any mismatch**

Run: `npm run test -- src/components/Tab.test.tsx src/components/Dialog.test.tsx src/components/Pagination.test.tsx`

Expected: FAIL if a current utility differs from the exact v0.1.0 declaration.

- [ ] **Step 3: Replace only failed utility mappings**

Use `w-[400px]` rather than responsive `w-full max-w-[400px]` for the desktop Storybook parity panel. Keep `rounded-2xl` for 16px, `p-4 pt-6` for 16px all sides plus 24px top, `gap-6` for 24px, and `gap-2` for 8px action buttons. Keep existing accessibility semantics and event behavior.

- [ ] **Step 4: Build Storybook and capture a fixed local review set**

Run: `npm run build-storybook && rg -n "semantic-surface-parity|semantic-button-parity|state-parity|selected-state-parity" storybook-static/index.json`

Expected: PASS. Review the named stories at a desktop viewport against the original declarations before accepting their Chromatic baseline.

- [ ] **Step 5: Document the collision and visual approval rule, then commit**

Add to `docs/testing.md`: Storybook compatibility CSS must use `uui-legacy-*`; visual approval requires rendered review of the parity stories and is not satisfied by class assertions alone.

```bash
git add src/components/Tab.tsx src/components/Tab.test.tsx src/components/Dialog.tsx src/components/Dialog.test.tsx src/components/Pagination.tsx src/components/Pagination.test.tsx docs/testing.md
git commit -m "test: enforce rendered visual parity"
```

### Task 5: Complete verification

**Files:**
- Modify only if a preceding verification identifies a contract mismatch.

**Interfaces:**
- Verifies the public package and Storybook outputs built by Tasks 1–4.

- [ ] **Step 1: Run the full quality suite**

Run: `npm run lint && npm run test:coverage && npm run build && npm run build-storybook && npm run test:package`

Expected: PASS with coverage thresholds met.

- [ ] **Step 2: Confirm static styling constraints**

Run: `! rg -n "styled-components|\.grid \{" package.json package-lock.json src && git diff --check`

Expected: PASS with no runtime CSS-in-JS reference and no global legacy `.grid` selector.

- [ ] **Step 3: Confirm no unstaged work remains after the task commits**

Run: `git status --short`

Expected: no output.
