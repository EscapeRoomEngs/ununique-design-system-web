# TextField Native Border Reset Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure the published `TextField` removes the native input border so its wrapper is the only field boundary and keyboard focus treatment.

**Architecture:** Make the reset local to the `TextField` native input by adding Tailwind's `border-0` utility. Retain the wrapper's current semantic border and keyboard-only outline behavior. Cover the emitted DOM contract in the unit test and change the Storybook focus example from pointer focus to keyboard tab focus.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Vitest, Testing Library, Storybook 10.

## Global Constraints

- Keep the public `TextField` props, emitted events, accessibility attributes, and wrapper DOM structure unchanged.
- Do not add a global package stylesheet reset or alter non-TextField components.
- Preserve the wrapper's existing `focus-within:border-uui-focus-brand` and `has-[:focus-visible]` outline utilities.
- Use `border-0` on the native input so the correction ships through `dist/styles.css`.

---

### Task 1: Reset the native TextField border and lock its DOM contract

**Files:**
- Modify: `src/components/Input.tsx:15-27`
- Modify: `src/components/Input.test.tsx:35-53`

**Interfaces:**
- Consumes: `TextFieldsProps`, which extends `InputHTMLAttributes<HTMLInputElement>` except its custom `onChange` and `size` members.
- Produces: a `TextField` whose native `<input>` has the `border-0` utility while the existing wrapper focus classes remain unchanged.

- [ ] **Step 1: Add a failing assertion for the native reset**

  In the existing `keeps the legacy one-pixel field border and uses a thin keyboard focus indicator` test, name the native input and assert that it exposes `border-0`:

  ```tsx
  const input = screen.getByLabelText("비밀번호");
  const field = input.parentElement;

  expect(input).toHaveClass("border-0", "outline-none");
  ```

- [ ] **Step 2: Run the focused test to verify it fails**

  Run: `npm test -- src/components/Input.test.tsx`

  Expected: the test fails because the TextField input class list does not yet include `border-0`.

- [ ] **Step 3: Add the component-local border reset**

  In `TextField`, change only the native input class string. Insert `border-0` beside the transparent background and existing outline reset:

  ```tsx
  className="min-w-0 flex-1 border-0 bg-transparent text-sm leading-[1.3] text-uui-text-primary outline-none placeholder:text-uui-text-tertiary disabled:text-uui-text-secondary"
  ```

  Do not change the wrapper string containing `border-uui-border-default`, `focus-within:border-uui-focus-brand`, and the `has-[:focus-visible]` outline utilities.

- [ ] **Step 4: Run the focused test to verify it passes**

  Run: `npm test -- src/components/Input.test.tsx`

  Expected: PASS; all TextField, Dropdown, Radio, and Checkbox tests in the file remain green.

- [ ] **Step 5: Commit the component and unit-test change**

  ```bash
  git add src/components/Input.tsx src/components/Input.test.tsx
  git commit -m "fix: reset TextField native border"
  ```

### Task 2: Exercise keyboard focus in Storybook and verify the distributable

**Files:**
- Modify: `src/stories/component/TextField.stories.tsx:1-75`
- Verify: `dist/styles.css` (generated; do not commit)

**Interfaces:**
- Consumes: Storybook's `userEvent` interaction API and the unchanged `TextField` accessibility name.
- Produces: `BrandFocusState` that reaches `:focus-visible` through keyboard navigation and a built stylesheet containing the native border reset utility.

- [ ] **Step 1: Change the focus story to use keyboard tab navigation**

  Replace the pointer-based interaction with tab navigation and assert the textbox receives focus:

  ```tsx
  import { expect, userEvent, within } from "storybook/test";

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "브랜드 포커스 입력" });

    await userEvent.tab();
    await expect(input).toHaveFocus();
  },
  ```

  Keep `within` because it scopes the query to the story canvas. The `expect` import is required for the focus assertion.

- [ ] **Step 2: Run Storybook type checking**

  Run: `npm run typecheck:storybook`

  Expected: PASS; the interaction is typed and the story has no unresolved imports.

- [ ] **Step 3: Build and inspect the package stylesheet**

  Run: `npm run build && rg -n "border-style:var\\(--tw-border-style\\);border-width:0|border-width:0" dist/styles.css`

  Expected: the build succeeds and the minified stylesheet contains the Tailwind `border-0` declaration used by the package consumer.

- [ ] **Step 4: Run repository verification**

  Run: `npm test && npm run lint && npm run test:package`

  Expected: PASS; unit, lint, typecheck, package build, and package entry checks all pass.

- [ ] **Step 5: Commit the Storybook regression coverage**

  ```bash
  git add src/stories/component/TextField.stories.tsx
  git commit -m "test: cover TextField keyboard focus state"
  ```
