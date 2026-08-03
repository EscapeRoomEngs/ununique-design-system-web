# Vite Tailwind Package Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the CRA proof of concept into a secure, Tailwind-independent React design-system package.

**Architecture:** Vite builds a library entry and precompiled CSS. Tailwind v4 remains a build-only dependency; consumers import emitted CSS and require only React peer dependencies. Tokens are shared through CSS custom properties and TypeScript exports.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS v4, Storybook React-Vite, Vitest, Testing Library, Changesets.

## Global Constraints

- Do not ship Tailwind Preflight or require consumer Tailwind configuration.
- Use static variant class maps; do not construct utility names dynamically.
- Keep React and React DOM in peer dependencies.
- Do not publish the package as part of this branch.

---

### Task 1: Replace the CRA build chain

**Files:**
- Modify: `package.json`, `package-lock.json`, `tsconfig.json`, `.storybook/main.ts`, `.storybook/preview.ts`
- Create: `vite.config.ts`, `vitest.config.ts`, `src/vite-env.d.ts`
- Delete: CRA-only entry and configuration files after replacement

- [ ] Add a failing build smoke test that imports the library entry.
- [ ] Install Vite, React Vite plugin, Tailwind v4, Vitest, and current Storybook React-Vite packages.
- [ ] Replace CRA and Webpack scripts/configuration with Vite equivalents.
- [ ] Run `npm run build` and `npm run build-storybook`.
- [ ] Commit the toolchain migration.

### Task 2: Establish package exports and CSS entry points

**Files:**
- Create: `src/index.ts`, `src/styles/index.css`, `src/styles/tokens.css`, `src/styles/fonts.css`
- Modify: `package.json`, `src/foundation/color.ts`, `src/foundation/typography.ts`, `src/foundation/layout.ts`

- [ ] Write failing package-entry tests that import Button and CSS from public paths.
- [ ] Define the `exports` map for JS, types, CSS, and token CSS.
- [ ] Create typed token exports and `--uui-*` CSS variables.
- [ ] Configure Vite library mode and declaration generation.
- [ ] Run package build and inspect `npm pack --dry-run`.
- [ ] Commit package boundary changes.

### Task 3: Convert primitives to static Tailwind styles

**Files:**
- Modify: `src/atom/Text.tsx`, `src/atom/Container.tsx`, `src/atom/Icon.tsx`, `src/components/Button.tsx`
- Create: `src/lib/cn.ts`
- Test: `src/atom/*.test.tsx`, `src/components/Button.test.tsx`

- [ ] Write failing tests for Button variants, disabled state, and user-provided className.
- [ ] Implement `cn` with clsx and tailwind-merge.
- [ ] Replace runtime styled components with static Tailwind classes and CVA variants.
- [ ] Preserve the old `Lable` export as a deprecated alias for `Label`.
- [ ] Run focused tests, then the full test suite.
- [ ] Commit primitive conversion.

### Task 4: Convert form and composite components

**Files:**
- Modify: `src/components/Input.tsx`, `src/components/Dialog.tsx`, `src/components/Tab.tsx`, `src/components/Pagination.tsx`
- Test: `src/components/*.test.tsx`

- [ ] Write failing interaction tests for each component's existing public behavior.
- [ ] Remove inline style tags and styled-components use.
- [ ] Use native controls, focus-visible states, typed callbacks, and static classes.
- [ ] Add keyboard and disabled-state tests.
- [ ] Run tests and Storybook build.
- [ ] Commit composite conversion.

### Task 5: Documentation, release, and consumer verification

**Files:**
- Create: `.changeset/README.md`, `.changeset/config.json`, `.github/workflows/ci.yml`, `examples/no-tailwind-consumer/*`
- Modify: `README.md`, Storybook stories

- [ ] Add a failing no-Tailwind fixture import test against a packed tarball.
- [ ] Configure Changesets and CI quality gates.
- [ ] Update usage documentation with the required CSS import.
- [ ] Run audit, lint, test, build, Storybook build, and package fixture verification.
- [ ] Commit release readiness changes.
