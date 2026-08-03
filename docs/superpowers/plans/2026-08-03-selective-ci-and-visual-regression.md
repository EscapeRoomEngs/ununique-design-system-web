# Selective CI and Visual Regression Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Skip CI for documentation-only changes while retaining fast code checks and Chromatic UI regression checks for UI-affecting changes.

**Architecture:** Replace the push-only Chromatic workflow with a path-filtered workflow for PRs and `main`, and cancel superseded runs for the same PR. Add an independent path-filtered CI workflow for lint, coverage and the package build; keep publishing manual and unchanged.

**Tech Stack:** GitHub Actions, Node.js 20, npm, Vitest, Vite, Storybook, Chromatic.

## Global Constraints

- `docs/**`, root Markdown files and release-plan text changes must not trigger CI or Chromatic.
- `src/stories/**`, `.storybook/**`, `src/**`, `public/**`, package metadata and Vite/Tailwind configuration changes must trigger the appropriate validation.
- Every job must run `npm ci`; do not cache `node_modules` directly.
- GitHub Packages publication remains manual through `publish-package.yml`.

---

### Task 1: Add path-filtered code CI

**Files:**
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Produces `CI` checks for pull requests and `main` pushes that touch package or source files.

- [ ] **Step 1: Add the workflow trigger and concurrency group**

```yaml
on:
  pull_request:
    paths: ["src/**", "public/**", "package.json", "package-lock.json", "vite.config.ts", "vitest.config.ts", "tsconfig*.json"]
  push:
    branches: [main]
    paths: ["src/**", "public/**", "package.json", "package-lock.json", "vite.config.ts", "vitest.config.ts", "tsconfig*.json"]
concurrency:
  group: ci-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true
```

- [ ] **Step 2: Add Node setup and validation steps**

```yaml
- uses: actions/checkout@v4
- uses: actions/setup-node@v4
  with: { node-version: 20, cache: npm }
- run: npm ci
- run: npm run lint
- run: npm run test:coverage
- run: npm run build
```

- [ ] **Step 3: Verify YAML and the local command sequence**

Run: `npm run lint && npm run test:coverage && npm run build`

Expected: PASS.

### Task 2: Restrict and harden Chromatic execution

**Files:**
- Modify: `.github/workflows/chromatic.yml`

**Interfaces:**
- Produces `Storybook Deployment` only for UI-affecting pull requests and `main` updates.

- [ ] **Step 1: Replace unrestricted push trigger**

```yaml
on:
  pull_request:
    paths: ["src/**", ".storybook/**", "public/**", "index.html", "package.json", "package-lock.json", "vite.config.ts", "tsconfig*.json"]
  push:
    branches: [main]
    paths: ["src/**", ".storybook/**", "public/**", "index.html", "package.json", "package-lock.json", "vite.config.ts", "tsconfig*.json"]
  workflow_dispatch:
```

- [ ] **Step 2: Use npm cache and always install dependencies**

```yaml
- uses: actions/setup-node@v4
  with: { node-version: 20, cache: npm }
- run: npm ci
```

- [ ] **Step 3: Cancel superseded visual runs**

```yaml
concurrency:
  group: chromatic-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true
```

- [ ] **Step 4: Verify the Storybook build locally**

Run: `npm run build-storybook`

Expected: PASS.

### Task 3: Document the workflow policy

**Files:**
- Modify: `docs/testing.md`

**Interfaces:**
- Produces a concise explanation of which changes trigger CI, Chromatic or neither.

- [ ] **Step 1: Add the trigger policy**

```markdown
- `docs/**` and root Markdown-only changes: no automatic build.
- `src/**` and package/configuration changes: CI.
- Storybook or UI-affecting changes: CI and Chromatic.
- Package publication: manual workflow dispatch only.
```

- [ ] **Step 2: Check the staged diff**

Run: `git diff --check`

Expected: PASS.
