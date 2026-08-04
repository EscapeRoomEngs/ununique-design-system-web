# Brand Theme Accessibility Release Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver typed Red/Orange theme management and accessible, state-complete public interactive components before the next package release.

**Architecture:** CSS owns runtime theme inheritance through `data-uui-theme` and semantic custom properties. A small React `ThemeProvider` supplies a typed ergonomic wrapper without introducing React context. Components consume semantic Tailwind utilities, keep their existing public props valid, and add optional state-management props only where necessary for accessibility.

**Tech Stack:** React 18+, TypeScript, Tailwind CSS v4 `@theme inline`, class-variance-authority, Vitest, Testing Library, jest-axe, Storybook 10.

## Global Constraints

- Preserve existing `uui` prefixes for CSS variables, utilities, and `data-uui-theme`.
- Keep palette primitives internal; export semantic APIs and components only.
- Keep `red` as the default theme and keep negative/error colors Red under every theme.
- Use Orange `#FF3D00` for default brand and documented pressed Orange `#E63600` for active state.
- Keep existing component props backwards compatible; all new props are optional.
- Build behavior changes test-first with Vitest and Testing Library.
- Run `npm run lint`, `npm run test`, `npm run build`, and `npm run build-storybook` before the final commit.

---

### Task 1: Theme runtime API and semantic interaction tokens

**Files:**
- Create: `src/theme/ThemeProvider.tsx`
- Create: `src/theme/ThemeProvider.test.tsx`
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/tokens.test.ts`
- Modify: `src/index.ts`
- Modify: `src/atom/Icon.tsx`
- Modify: `src/atom/Icon.test.tsx`

**Interfaces:**
- Produces `ThemeName = "red" | "orange"` and `ThemeProviderProps extends HTMLAttributes<HTMLDivElement> { theme?: ThemeName }`.
- Produces public `ThemeProvider` and `ThemeName` exports from `src/index.ts`.
- Produces semantic utilities `bg-uui-surface-brand-hover`, `bg-uui-surface-brand-active`, `outline-uui-focus-brand`, and `text-uui-icon-brand` backed by runtime variables.
- Consumes existing `data-uui-theme` CSS inheritance and `IconProps.iconColor`.

- [ ] **Step 1: Write failing theme and token contract tests**

```tsx
it("renders a typed orange theme boundary", () => {
  render(<ThemeProvider theme="orange"><span>content</span></ThemeProvider>);
  expect(screen.getByText("content").parentElement).toHaveAttribute("data-uui-theme", "orange");
});

it("maps brand interaction utilities to namespaced runtime variables", () => {
  expect(css).toContain("--color-uui-surface-brand-hover: var(--uui-semantic-surface-brand-hover)");
  expect(css).toContain("--color-uui-surface-brand-active: var(--uui-semantic-surface-brand-active)");
  expect(css).toContain("--color-uui-focus-brand: var(--uui-semantic-focus-brand)");
  expect(css).toContain("--uui-semantic-surface-brand-active: #e63600");
});
```

- [ ] **Step 2: Run the focused tests to verify failure**

Run: `npm run test -- src/theme/ThemeProvider.test.tsx src/styles/tokens.test.ts`

Expected: FAIL because `ThemeProvider` and interaction token declarations do not exist.

- [ ] **Step 3: Implement the minimal typed provider and token mapping**

```tsx
export type ThemeName = "red" | "orange";
export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  theme?: ThemeName;
}
export function ThemeProvider({ theme = "red", ...props }: ThemeProviderProps) {
  return <div {...props} data-uui-theme={theme} />;
}
```

Declare `--color-uui-surface-brand-hover`, `--color-uui-surface-brand-active`, and `--color-uui-focus-brand` in `@theme inline`; set each theme's variables in `:root`, Red, and Orange selectors. Add `brand` to Icon's semantic color map using `var(--uui-semantic-text-brand)`. Extend Icon props with SVG attributes and make decorative SVG output `aria-hidden="true"` with `focusable="false"` unless a consumer explicitly overrides those attributes.

- [ ] **Step 4: Run focused tests to verify pass**

Run: `npm run test -- src/theme/ThemeProvider.test.tsx src/styles/tokens.test.ts src/atom/Icon.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the theme foundation**

```bash
git add src/theme/ThemeProvider.tsx src/theme/ThemeProvider.test.tsx src/styles/tokens.css src/styles/tokens.test.ts src/index.ts src/atom/Icon.tsx src/atom/Icon.test.tsx
git commit -m "feat: add typed semantic theme provider"
```

### Task 2: Button and field/choice visual state contracts

**Files:**
- Modify: `src/components/Button.tsx`
- Modify: `src/components/Button.test.tsx`
- Modify: `src/components/Input.tsx`
- Modify: `src/components/Input.test.tsx`

**Interfaces:**
- Consumes Task 1 semantic brand hover, active, focus, and icon-color utilities.
- Preserves `ButtonProps`, `TextFieldsProps`, `DropdownProps`, and `ChoiceProps` public names.
- Produces consistent enabled hover/active/focus-visible/disabled classes and a 2px TextField outline.

- [ ] **Step 1: Write failing Button and TextField behavior tests**

```tsx
it("uses semantic brand hover, active, and 2px focus classes", () => {
  render(<Button property="brand" text="저장" />);
  expect(screen.getByRole("button", { name: "저장" })).toHaveClass(
    "hover:bg-uui-surface-brand-hover",
    "active:bg-uui-surface-brand-active",
    "focus-visible:outline-uui-focus-brand",
    "text-uui-text-primary",
  );
});

it("uses a two-pixel field border and transparent icon controls", async () => {
  render(<TextField aria-label="비밀번호" type="password" value="abc" />);
  const field = screen.getByLabelText("비밀번호").parentElement;
  expect(field).toHaveClass("border-2");
  expect(screen.getByRole("button", { name: "비밀번호 표시 전환" })).toHaveClass("bg-transparent");
});
```

- [ ] **Step 2: Run focused tests to verify failure**

Run: `npm run test -- src/components/Button.test.tsx src/components/Input.test.tsx`

Expected: FAIL because the interaction classes and 2px field border are absent.

- [ ] **Step 3: Implement semantic visual states without API breakage**

Use `disabled:pointer-events-none` plus `disabled:` utility variants so hover/active states never apply to disabled Buttons. Give every Button property a focus-visible 2px outline; use brand hover/active utilities for `property="brand"`; keep existing semantic negative/positive/info colors independent. Set a default `aria-label` only through the native prop path; do not generate one from an icon name.

Change TextField's wrapper from `border` to `border-2`, add a brand `focus-within` border/outline, and leave error precedence on the negative border. Give clear/password buttons `bg-transparent`, `rounded`, `focus-visible:outline-2`, and semantic focus outline classes. Preserve `aria-invalid={error || undefined}` while allowing caller `aria-describedby` to flow through props. Use `color = "brand"` for Radio/Checkbox defaults and visible `has-[:focus-visible]` label styling.

- [ ] **Step 4: Run focused tests to verify pass**

Run: `npm run test -- src/components/Button.test.tsx src/components/Input.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit visual interaction contracts**

```bash
git add src/components/Button.tsx src/components/Button.test.tsx src/components/Input.tsx src/components/Input.test.tsx
git commit -m "feat: improve interactive control states"
```

### Task 3: Accessible Dropdown and Dialog state management

**Files:**
- Modify: `src/components/Input.tsx`
- Modify: `src/components/Input.test.tsx`
- Modify: `src/components/Dialog.tsx`
- Modify: `src/components/Dialog.test.tsx`

**Interfaces:**
- Extends `DropdownProps` from native button attributes (omitting the incompatible native `onChange`) so `id`, `aria-label`, and `aria-describedby` flow to its trigger without changing existing props.
- Extends `DialogProps` with `open?: boolean`, `onClose?: () => void`, and `closeOnOverlayClick?: boolean`.
- Produces select-only combobox/listbox keyboard behavior and controlled Dialog close/focus behavior.

- [ ] **Step 1: Write failing keyboard and ARIA tests**

```tsx
it("selects the active dropdown option with the keyboard", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<Dropdown aria-label="도시" optionList={[{ id: 1, name: "서울" }, { id: 2, name: "부산" }]} onChange={onChange} />);
  const trigger = screen.getByRole("combobox", { name: "도시" });
  await user.click(trigger);
  await user.keyboard("{ArrowDown}{Enter}");
  expect(onChange).toHaveBeenCalledWith({ id: 2, name: "부산" });
  expect(trigger).toHaveAttribute("aria-expanded", "false");
});

it("requests close on Escape", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();
  render(<><button>열기</button><Dialog title="확인" messages="내용" onClose={onClose} btns={[{ text: "닫기" }]} /></>);
  await user.click(screen.getByRole("button", { name: "닫기" }));
  await user.keyboard("{Escape}");
  expect(onClose).toHaveBeenCalledOnce();
});
```

- [ ] **Step 2: Run focused tests to verify failure**

Run: `npm run test -- src/components/Input.test.tsx src/components/Dialog.test.tsx`

Expected: FAIL because Dropdown is only a labelled button and Dialog has no close API or Escape handler.

- [ ] **Step 3: Implement the APG-aligned interaction behavior**

Make the Dropdown trigger a `role="combobox"` button with `aria-haspopup="listbox"`, `aria-controls`, and `aria-activedescendant`. Keep focus on the trigger, track an active option index, and implement ArrowUp, ArrowDown, Home, End, Enter, Space, and Escape. Render a `role="listbox"` container and `role="option"` rows with `aria-selected`; rows must use transparent backgrounds and semantic hover/active classes rather than the negative surface.

In Dialog, return `null` when `open === false`; default `open` to `true`. Generate stable title/message ids, wire `aria-labelledby` and `aria-describedby`, and focus the first enabled Button after opening. Save the previously focused element, restore it when Dialog closes, and cycle Tab/Shift+Tab among focusable descendants. Call `onClose` for Escape and allowed backdrop clicks without changing a controlled `open` value internally.

- [ ] **Step 4: Run focused tests to verify pass**

Run: `npm run test -- src/components/Input.test.tsx src/components/Dialog.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit accessible composite controls**

```bash
git add src/components/Input.tsx src/components/Input.test.tsx src/components/Dialog.tsx src/components/Dialog.test.tsx
git commit -m "feat: add keyboard accessible dropdown and dialog"
```

### Task 4: Tab and Pagination keyboard/semantic behavior

**Files:**
- Modify: `src/components/Tab.tsx`
- Modify: `src/components/Tab.test.tsx`
- Modify: `src/components/Pagination.tsx`
- Modify: `src/components/Pagination.test.tsx`

**Interfaces:**
- Preserves `TabProps.selected` and `TabProps.onSelect` controlled selection.
- Preserves `PaginationProps.currentPageIndex` as zero-based and `onPageChange` as zero-based.
- Produces tablist/tab ARIA and keyboard selection; produces labelled pagination navigation and blur-to-commit behavior.

- [ ] **Step 1: Write failing Tab and Pagination interaction tests**

```tsx
it("moves controlled tab selection with ArrowRight", async () => {
  const user = userEvent.setup();
  const onSelect = vi.fn();
  const tabs = [{ text: "상품" }, { text: "후기" }];
  render(<TabBar tabList={tabs} selected={tabs[0]} onSelect={onSelect} />);
  await user.click(screen.getByRole("tab", { name: "상품" }));
  await user.keyboard("{ArrowRight}");
  expect(onSelect).toHaveBeenCalledWith(tabs[1]);
});

it("commits a typed page when the page input loses focus", async () => {
  const user = userEvent.setup();
  const onPageChange = vi.fn();
  render(<Pagination currentPageIndex={0} totalPageCnt={5} onPageChange={onPageChange} />);
  await user.clear(screen.getByRole("textbox", { name: "현재 페이지" }));
  await user.type(screen.getByRole("textbox", { name: "현재 페이지" }), "3");
  await user.tab();
  expect(onPageChange).toHaveBeenCalledWith(2);
});
```

- [ ] **Step 2: Run focused tests to verify failure**

Run: `npm run test -- src/components/Tab.test.tsx src/components/Pagination.test.tsx`

Expected: FAIL because TabBar uses buttons with `aria-pressed` and Pagination only commits on Enter.

- [ ] **Step 3: Implement keyboard and ARIA semantics**

Render TabBar's root with `role="tablist"` and each item with `role="tab"`, `aria-selected`, roving `tabIndex`, and `onKeyDown` that wraps ArrowLeft/ArrowRight and supports Home/End. Apply the semantic brand border/text classes to the selected tab.

Wrap Pagination in `<nav aria-label="페이지 탐색">`; keep prior/next native disabled attributes. Call the existing page clamp helper from both Enter and `onBlur`, and add the semantic focus outline to the input and buttons.

- [ ] **Step 4: Run focused tests to verify pass**

Run: `npm run test -- src/components/Tab.test.tsx src/components/Pagination.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit tab and pagination accessibility**

```bash
git add src/components/Tab.tsx src/components/Tab.test.tsx src/components/Pagination.tsx src/components/Pagination.test.tsx
git commit -m "feat: improve tab and pagination accessibility"
```

### Task 5: Story args alignment and release verification coverage

**Files:**
- Modify: `src/stories/component/Button.stories.tsx`
- Modify: `src/stories/component/TextField.stories.tsx`
- Modify: `src/stories/component/Dropdown.stories.tsx`
- Modify: `src/stories/component/Checkbox.stories.tsx`
- Modify: `src/stories/component/Radio.stories.tsx`
- Modify: `src/stories/component/Dialog.stories.tsx`
- Modify: `src/stories/component/Pagination.stories.tsx`
- Modify: `src/stories/component/Tab.stories.tsx`
- Modify: `src/stories/atom/Text.stories.tsx`
- Modify: `src/components/accessibility.test.tsx`
- Modify: `README.md`

**Interfaces:**
- Consumes all public props after Tasks 1–4.
- Produces stories that compile through `Meta<typeof Component>` with only real args and state-synchronized renders.
- Produces `jest-axe` coverage for all public interactive components in their open/active states.

- [ ] **Step 1: Write failing Storybook/type and accessibility tests**

```tsx
it("has no detectable violations for an open dialog and dropdown", async () => {
  const user = userEvent.setup();
  const { container } = render(
    <>
      <Dropdown aria-label="도시" optionList={[{ id: 1, name: "서울" }]} />
      <Dialog title="삭제 확인" messages="되돌릴 수 없습니다" btns={[{ text: "취소" }]} />
    </>,
  );
  await user.click(screen.getByRole("combobox", { name: "도시" }));
  expect(await axe(container)).toHaveNoViolations();
});
```

- [ ] **Step 2: Run the accessibility test to verify failure or reveal the missing contract**

Run: `npm run test -- src/components/accessibility.test.tsx`

Expected: FAIL until all composite controls expose their final roles, labels, and relationships.

- [ ] **Step 3: Correct Story args and add state/theme stories**

Use `Meta<typeof Button>`, `Meta<typeof Dropdown>`, and corresponding generic Meta declarations everywhere. Replace Dropdown `args.value` with `args.selected`; give each Radio id a unique value; replace `console.log` button actions with `fn()` from `storybook/test`; wire Dialog stories through local `open` state and `onClose`.

Add a `ThemeProvider` Red/Orange parity story to every component consuming brand semantics. Add visible focus, hover/active documentation states where Storybook can render them, and icon-only Button stories with `aria-label`. Update README with ThemeProvider usage and the `data-uui-theme` fallback.

- [ ] **Step 4: Run focused checks to verify pass**

Run: `npm run test -- src/components/accessibility.test.tsx && npm run build-storybook`

Expected: PASS; Storybook emits no TypeScript arg errors.

- [ ] **Step 5: Run the release verification suite**

Run: `npm run lint && npm run test && npm run build && npm run build-storybook && npm run test:package && git diff --check`

Expected: every command exits with status 0. Existing Storybook bundle-size warnings may remain warnings only.

- [ ] **Step 6: Commit stories and verification updates**

```bash
git add src/stories src/components/accessibility.test.tsx README.md
git commit -m "docs: align interactive component stories"
```

## Plan self-review

- Spec coverage: Tasks 1–4 implement the complete theme, interaction, keyboard, and ARIA contracts; Task 5 fixes Storybook args and verifies all public interactive surfaces.
- Placeholder scan: no deferred or ambiguous implementation markers are present.
- Type consistency: `ThemeName`, `ThemeProvider`, `open`, `onClose`, `closeOnOverlayClick`, existing `selected/onSelect`, and zero-based pagination names are used consistently across tasks.
