# TextField and Dropdown Full-Width API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a backward-compatible `fullWidth` prop that lets TextField and Dropdown wrappers fill their parent width without consumer DOM selectors.

**Architecture:** Reuse Button's boolean `fullWidth` API. Keep each component's current fixed width preset by default; add `w-full` to TextField's wrapper and substitute it for Dropdown's fixed-width trigger when enabled. The Dropdown listbox already fills its wrapper, so it needs no new API or layout branch.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Vitest, Testing Library, Storybook 10.

## Global Constraints

- Add only `fullWidth?: boolean`; do not add wrapper class/style props or a fluid size variant.
- Default `fullWidth` to `false` and preserve existing preset widths and className forwarding.
- Do not change public accessibility behavior, TextField input forwarding, or Dropdown trigger behavior.
- Use `w-full` on the outer wrapper contract so consumers do not depend on internal DOM selectors.

---

### Task 1: Add and test the full-width component API

**Files:**
- Modify: `src/components/Input.tsx:8-128`
- Modify: `src/components/Input.test.tsx:13-237`

**Interfaces:**
- Consumes: existing `TextFieldsProps` and `DropdownProps` width preset via `size?: "Small" | "Medium" | "Large"`.
- Produces: `fullWidth?: boolean` on both prop types; `fullWidth={true}` gives each outer wrapper the `w-full` class while omitting its fixed-width class where applicable.

- [ ] **Step 1: Write failing class-contract tests**

  Add one TextField test and one Dropdown test that render the component with `fullWidth` and assert the outer wrapper is full width. Confirm default rendering preserves the Small preset.

  ```tsx
  render(<TextField aria-label="전체 폭 입력" value="" fullWidth />);
  const field = screen.getByLabelText("전체 폭 입력").parentElement;
  expect(field).toHaveClass("w-full");
  expect(field).not.toHaveClass("w-[328px]");

  render(<Dropdown aria-label="전체 폭 선택" fullWidth optionList={[{ id: 1, name: "서울" }]} />);
  const trigger = screen.getByRole("combobox", { name: "전체 폭 선택" });
  expect(trigger.parentElement).toHaveClass("w-full");
  expect(trigger).toHaveClass("w-full");
  expect(trigger).not.toHaveClass("w-[328px]");
  ```

- [ ] **Step 2: Run the focused test file to verify failure**

  Run: `npm test -- src/components/Input.test.tsx`

  Expected: FAIL because neither public prop exists and wrappers retain `w-[328px]`.

- [ ] **Step 3: Implement the minimal full-width API**

  Add `fullWidth?: boolean` to `TextFieldsProps` and `DropdownProps`, default it to `false` in each component, and apply the class condition to the outer layout owner:

  ```tsx
  export function TextField({ size = "Small", fullWidth = false, /* existing props */ }: TextFieldsProps) {
    return <div className={`${fullWidth ? "w-full" : widths[size]} flex /* existing classes */`}>
  }

  export function Dropdown({ size = "Small", fullWidth = false, /* existing props */ }: DropdownProps) {
    const width = fullWidth ? "w-full" : widths[size];
    return <div className={`${width} relative`}>
      <button className={`${width} flex /* existing classes */`}>
  }
  ```

  Keep the native TextField input `className` forwarding and Dropdown trigger `className` interpolation unchanged.

- [ ] **Step 4: Run focused and full tests**

  Run: `npm test -- src/components/Input.test.tsx && npm test`

  Expected: PASS; full-width assertions and all existing interaction, accessibility, and legacy-width tests remain green.

- [ ] **Step 5: Commit the API and tests**

  ```bash
  git add src/components/Input.tsx src/components/Input.test.tsx
  git commit -m "feat: add full-width input APIs"
  ```

### Task 2: Document responsive usage in Storybook and verify the package

**Files:**
- Modify: `src/stories/component/TextField.stories.tsx:18-75`
- Modify: `src/stories/component/Dropdown.stories.tsx:20-91`

**Interfaces:**
- Consumes: `TextField` and `Dropdown` with the new `fullWidth` prop.
- Produces: one Storybook example per component that constrains a parent and renders the component with `fullWidth`.

- [ ] **Step 1: Add full-width Storybook examples**

  Add `FullWidthTextField` and `FullWidthDropdown` stories. Each uses a width-constrained parent and the public prop rather than a DOM selector:

  ```tsx
  export const FullWidthTextField: Story = {
    args: { "aria-label": "전체 폭 입력", value: "", fullWidth: true },
    render: (args) => <div className="w-[400px]"><TextField {...args} /></div>,
  };

  export const FullWidthDropdown: Story = {
    args: { "aria-label": "전체 폭 선택", fullWidth: true, optionList: [{ id: 1, name: "서울" }] },
    render: (args) => <div className="w-[400px]"><Dropdown {...args} /></div>,
  };
  ```

  Use the existing controlled render pattern only if the story accepts user selection; a static selected state is sufficient for the responsive layout example.

- [ ] **Step 2: Typecheck Storybook**

  Run: `npm run typecheck:storybook`

  Expected: PASS; both prop types are exposed to Storybook and each story is valid.

- [ ] **Step 3: Verify the distributable and repository**

  Run: `npm run lint && env NPM_CONFIG_CACHE=/private/tmp/ununique-design-system-web-npm-cache npm run test:package`

  Expected: PASS; the compiled stylesheet includes `w-full`, and ESM/CJS/CSS package entry checks remain green.

- [ ] **Step 4: Commit Storybook coverage**

  ```bash
  git add src/stories/component/TextField.stories.tsx src/stories/component/Dropdown.stories.tsx
  git commit -m "docs: show full-width input usage"
  ```
