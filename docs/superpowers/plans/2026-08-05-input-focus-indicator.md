# Input Focus Indicator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore one dark focus border for `TextField` and `Dropdown`.

**Architecture:** Keep the existing components and tokens. Replace only the focus classes introduced by the accessibility update; no API or layout code changes.

**Tech Stack:** React, TypeScript, Tailwind CSS, Vitest.

## Global Constraints

- Use `border-uui-border-tertiary` for the focused or open input state.
- Do not add focus outline utilities or change the `fullWidth` API.

---

### Task 1: Restore the single focus border

**Files:**

- Modify: `src/components/Input.test.tsx`
- Modify: `src/components/Input.tsx`

- [ ] **Step 1: Write the failing test**

Assert that the TextField wrapper uses `focus-within:border-uui-border-tertiary` and has no `outline` or `focus-brand` class. Assert that the Dropdown trigger uses `focus-visible:border-uui-border-tertiary`, has no outline classes, and uses `border-uui-border-tertiary` when open.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- src/components/Input.test.tsx`

Expected: FAIL because the current classes contain `focus-brand` and outline utilities.

- [ ] **Step 3: Write the minimal implementation**

Replace the TextField brand focus border and `has-[:focus-visible]` outline utilities with `focus-within:border-uui-border-tertiary`. Replace the Dropdown brand focus and outline utilities with `focus-visible:border-uui-border-tertiary` and use `border-uui-border-tertiary` while open.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `npm test -- src/components/Input.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src/components/Input.tsx src/components/Input.test.tsx && git commit -m "fix: restore single input focus border"`
