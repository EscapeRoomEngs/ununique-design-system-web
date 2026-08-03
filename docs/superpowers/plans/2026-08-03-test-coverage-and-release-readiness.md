# Test Coverage and Release Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add behavior, accessibility, package-consumer tests and a measurable coverage gate before the first public design-system release.

**Architecture:** Keep fast component tests colocated with source files using Vitest, React Testing Library and `user-event`. Add `jest-axe` for accessibility assertions and one separate package smoke script that consumes the packed tarball from a temporary directory. Use Chromatic stories for visual regression rather than duplicating visual assertions in unit tests.

**Tech Stack:** React 19, TypeScript 5.9, Vite 8, Vitest 4, React Testing Library, user-event, jest-axe, Storybook 10, Chromatic, Changesets.

## Global Constraints

- Keep `styled-components`, CRA and `react-scripts` absent from all source and dependency manifests.
- Preserve React peer compatibility: `^18.3.1 || ^19.0.0`.
- `npm run build` must emit ESM, CJS, declarations and `dist/styles.css`.
- Do not publish or remove `private: true` until the npm package name and account are explicitly chosen.
- Test behavior and accessible outcomes; do not assert implementation-specific generated class names except for the Tailwind migration smoke tests that already exist.

---

## Existing baseline

- 7 test files and 8 test cases currently pass.
- Tests cover Button, Container, Icon, Text, Dialog, the package entry and App rendering.
- Input, Dropdown, Radio, Checkbox, Pagination and Tab have no behavior tests.
- No coverage provider, accessibility scanner or packed-consumer integration check exists yet.

### Task 1: Add coverage reporting and enforce a useful baseline

**Files:**
- Modify: `package.json`
- Modify: `vitest.config.ts`
- Create: `docs/testing.md`

**Interfaces:**
- Produces `npm run test:coverage`, emitting `coverage/` and enforcing thresholds.

- [ ] **Step 1: Add the coverage provider**

Run:

```bash
npm install --save-dev @vitest/coverage-v8
```

- [ ] **Step 2: Add a coverage script and reporter configuration**

Add to `package.json`:

```json
"test:coverage": "vitest run --coverage"
```

Add to `vitest.config.ts`:

```ts
coverage: {
  provider: "v8",
  reporter: ["text", "html", "lcov"],
  include: ["src/atom/**/*.tsx", "src/components/**/*.tsx"],
  exclude: ["src/**/*.stories.*", "src/**/*.test.*"],
  thresholds: { lines: 70, functions: 70, branches: 60, statements: 70 },
},
```

- [ ] **Step 3: Run the failing coverage command**

Run: `npm run test:coverage`

Expected: FAIL on the proposed threshold before behavior tests are added.

- [ ] **Step 4: Document the threshold policy**

Write `docs/testing.md` with the exact command, the initial threshold values, and the rule that newly added interactive components must not reduce the global threshold.

- [ ] **Step 5: Re-run and commit**

Run: `npm run test:coverage`

Expected: PASS after Tasks 2 and 3.

```bash
git add package.json package-lock.json vitest.config.ts docs/testing.md
git commit -m "test: add coverage reporting"
```

### Task 2: Test form-control behavior

**Files:**
- Modify: `src/components/Input.tsx` only if a failing test reveals an issue
- Create: `src/components/Input.test.tsx`

**Interfaces:**
- Consumes `TextField`, `Dropdown`, `Radio`, `Checkbox`.
- Produces regression coverage for the controlled callbacks: `onChange(value: string)` and `onChange(option: DropdownOption)`.

- [ ] **Step 1: Write failing TextField interaction tests**

```tsx
it("limits input, clears it, and toggles a password's visibility", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  const { rerender } = render(<TextField type="password" value="" maxLength={3} onChange={onChange} />);
  const input = screen.getByRole("textbox");

  await user.type(input, "abcd");
  expect(onChange).toHaveBeenLastCalledWith("abc");

  rerender(<TextField type="password" value="abc" onChange={onChange} />);
  await user.click(screen.getByRole("button", { name: /password visibility/i }));
  expect(input).toHaveAttribute("type", "text");
  await user.click(screen.getByRole("button", { name: /clear/i }));
  expect(onChange).toHaveBeenLastCalledWith("");
});
```

- [ ] **Step 2: Verify the test fails**

Run: `npm run test -- src/components/Input.test.tsx`

Expected: FAIL until password-toggle and clear buttons have accessible names.

- [ ] **Step 3: Add minimal accessible labels**

Use stable labels in `Input.tsx`:

```tsx
<button aria-label="Toggle password visibility" type="button" ... />
<button aria-label="Clear input" type="button" ... />
```

- [ ] **Step 4: Add Dropdown and choice-control tests**

```tsx
it("selects a dropdown option and respects disabled controls", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<Dropdown optionList={[{ id: 1, name: "서울" }]} onChange={onChange} />);
  await user.click(screen.getByRole("button"));
  await user.click(screen.getByRole("button", { name: "서울" }));
  expect(onChange).toHaveBeenCalledWith({ id: 1, name: "서울" });

  render(<Checkbox id="agree" value="동의" checked={false} disabled onChange={vi.fn()} />);
  expect(screen.getByRole("checkbox")).toBeDisabled();
});
```

- [ ] **Step 5: Run and commit**

Run: `npm run test -- src/components/Input.test.tsx`

Expected: PASS.

```bash
git add src/components/Input.tsx src/components/Input.test.tsx
git commit -m "test: cover form control interactions"
```

### Task 3: Test stateful navigation and action components

**Files:**
- Create: `src/components/Pagination.test.tsx`
- Create: `src/components/Tab.test.tsx`
- Modify: `src/components/Dialog.test.tsx`

**Interfaces:**
- Consumes `PaginationProps.onPageChange(value: number)`, `TabProps.onSelect(value: TabItem)` and `DialogProps.btns`.
- Produces tests for boundaries and callback contracts.

- [ ] **Step 1: Write Pagination boundary tests**

```tsx
it("never emits a page before zero or after the last page", async () => {
  const user = userEvent.setup();
  const onPageChange = vi.fn();
  render(<Pagination currentPageIndex={0} totalPageCnt={2} onPageChange={onPageChange} />);

  await user.click(screen.getByRole("button", { name: /previous page/i }));
  expect(onPageChange).not.toHaveBeenCalled();
  await user.click(screen.getByRole("button", { name: /next page/i }));
  expect(onPageChange).toHaveBeenCalledWith(1);
});
```

- [ ] **Step 2: Add accessible names where the test exposes icon-only buttons**

```tsx
<button aria-label="Previous page" type="button" ... />
<button aria-label="Next page" type="button" ... />
```

- [ ] **Step 3: Write Tab and Dialog callback tests**

```tsx
it("emits the selected tab", async () => {
  const user = userEvent.setup();
  const onSelect = vi.fn();
  render(<TabBar tabList={[{ text: "상품" }, { text: "후기" }]} onSelect={onSelect} />);
  await user.click(screen.getByText("후기"));
  expect(onSelect).toHaveBeenCalledWith({ text: "후기" });
});

it("passes dialog button handlers through to Button", async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(<Dialog title="확인" messages="내용" btns={[{ text: "닫기", onClick }]} />);
  await user.click(screen.getByRole("button", { name: "닫기" }));
  expect(onClick).toHaveBeenCalledOnce();
});
```

- [ ] **Step 4: Run and commit**

Run: `npm run test -- src/components/Pagination.test.tsx src/components/Tab.test.tsx src/components/Dialog.test.tsx`

Expected: PASS.

```bash
git add src/components/Pagination.tsx src/components/Pagination.test.tsx src/components/Tab.test.tsx src/components/Dialog.test.tsx
git commit -m "test: cover component navigation behavior"
```

### Task 4: Add automated accessibility checks

**Files:**
- Modify: `package.json`
- Create: `src/components/accessibility.test.tsx`

**Interfaces:**
- Produces `expect(container).toHaveNoViolations()` for Button, TextField, Dialog, Pagination and TabBar.

- [ ] **Step 1: Install accessibility matchers**

Run:

```bash
npm install --save-dev jest-axe @types/jest-axe
```

- [ ] **Step 2: Register the matcher**

Add to `src/setupTests.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);
```

- [ ] **Step 3: Write failing accessibility tests**

```tsx
it("has no detectable violations in the Dialog composition", async () => {
  const { container } = render(<Dialog title="삭제 확인" messages="되돌릴 수 없습니다" btns={[{ text: "취소" }]} />);
  expect(await axe(container)).toHaveNoViolations();
});
```

- [ ] **Step 4: Fix only reported semantic issues**

Use native buttons, labels, input identifiers and `aria-label` values. Do not silence axe rules without documenting a false-positive reason in the test.

- [ ] **Step 5: Run and commit**

Run: `npm run test -- src/components/accessibility.test.tsx`

Expected: PASS.

```bash
git add package.json package-lock.json src/setupTests.ts src/components/accessibility.test.tsx src/components
git commit -m "test: add accessibility regression checks"
```

### Task 5: Validate the packed package from a consumer perspective

**Files:**
- Create: `scripts/test-package.mjs`
- Modify: `package.json`
- Modify: `docs/testing.md`

**Interfaces:**
- Produces `npm run test:package`, which runs `npm pack`, installs the tarball in a temporary project and verifies ESM, CJS and CSS exports.

- [ ] **Step 1: Add the package test script**

Add:

```json
"test:package": "npm run build && node scripts/test-package.mjs"
```

- [ ] **Step 2: Implement a temporary-consumer smoke test**

The script must:

```js
// 1. create a temporary directory with fs.mkdtemp
// 2. run `npm pack --json` in the repository and parse the tarball name
// 3. run `npm init -y` and install the tarball plus react/react-dom in the temporary directory
// 4. import the package with Node ESM and require its CJS entry
// 5. assert `Button`, `Dropdown`, and `styles.css` resolve
// 6. remove only the exact temporary directory in a finally block
```

- [ ] **Step 3: Run the package test**

Run: `npm run test:package`

Expected: PASS and no tarball left in the repository root.

- [ ] **Step 4: Commit**

```bash
git add scripts/test-package.mjs package.json docs/testing.md
git commit -m "test: verify packed package consumption"
```

### Task 6: Expand visual regression coverage

**Files:**
- Modify: `src/stories/component/Button.stories.tsx`
- Modify: `src/stories/component/TextField.stories.tsx`
- Modify: `src/stories/component/Dropdown.stories.tsx`
- Modify: `src/stories/component/Dialog.stories.tsx`
- Modify: `src/stories/component/Pagination.stories.tsx`
- Modify: `src/stories/component/Tab.stories.tsx`

**Interfaces:**
- Produces stable default, disabled, error and selected Storybook states for Chromatic snapshots.

- [ ] **Step 1: Add explicit visual states**

Each story must expose named args such as `Default`, `Disabled`, `Error`, `Selected` or `FirstPage`; avoid hooks directly inside the Storybook `render` function by placing state in a capitalized wrapper component.

- [ ] **Step 2: Build Storybook locally**

Run: `npm run build-storybook`

Expected: PASS. The existing documentation-only large-chunk warning is acceptable; record it only if it grows materially.

- [ ] **Step 3: Publish visual snapshots only after review authority is available**

Run: `npm run chromatic`

Expected: Chromatic reports the intentional visual baseline or changes. Do not accept changes automatically.

- [ ] **Step 4: Commit**

```bash
git add src/stories/component
git commit -m "test: add visual regression states"
```

### Task 7: Prepare the first public release without publishing it

**Files:**
- Modify: `README.md`
- Modify: `package.json`
- Modify: `.changeset/fresh-otters-refactor.md` only if the release scope changes

**Interfaces:**
- Consumes the existing Changeset, currently producing version `0.2.0` from `0.1.0`.
- Produces a documented, human-approved release checklist.

- [ ] **Step 1: Confirm the publishing decisions with the repository owner**

Required values: npm package name, scoped or unscoped name, npm account/organization, license, repository URL, and whether the package remains private.

- [ ] **Step 2: Validate release metadata once values are provided**

Add only approved `name`, `license`, `repository`, `bugs`, `homepage` and `publishConfig.access` fields to `package.json`. Remove `private` only when publishing is authorized.

- [ ] **Step 3: Apply the queued version when authorized**

Run:

```bash
npm run version-packages
npm run test:package
npm audit --omit=dev --audit-level=high
```

Expected: version becomes `0.2.0`, `CHANGELOG.md` is created, package test and audit pass.

- [ ] **Step 4: Commit the release version**

```bash
git add package.json package-lock.json CHANGELOG.md .changeset
git commit -m "chore: release v0.2.0"
```

## Self-review

- Spec coverage: Tasks 1–4 cover the proposed unit, behavior and accessibility tests; Task 5 covers package consumption; Task 6 covers visual regressions; Task 7 covers versioning and the remaining publication decision.
- Remaining authority: public package name, npm account, license and publication are intentionally not assumed.
- Type consistency: tests use the current public callback contracts for `DropdownOption`, `PaginationProps`, `TabItem` and `DialogProps`.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-03-test-coverage-and-release-readiness.md`.

1. **Subagent-Driven (recommended)** — dispatch a fresh subagent per task and review between tasks.
2. **Inline Execution** — execute tasks in this session using the execution-plan workflow with checkpoints.
