# Testing

## Commands

- `npm run test`: fast component and package-entry tests
- `npm run test:coverage`: component coverage report in `coverage/`
- `npm run test:package`: builds, packs and installs the package in an isolated consumer project
- `npm run build-storybook`: static component documentation build

## Coverage policy

The initial target after the interactive-component tests are complete is at least 70% lines, functions and statements, and 60% branches across `src/atom` and `src/components`. New interactive components must include a user-facing behavior test and must not lower the configured threshold.

## Test layers

Use Vitest and React Testing Library for component behavior, `jest-axe` for automatically detectable accessibility issues, and Chromatic stories for visual regressions. `test:package` is the release gate for package entry points; it checks ESM, CJS and CSS imports from a clean consumer install.

## GitHub Actions policy

- Documentation-only changes do not start CI or Chromatic automatically. Use `workflow_dispatch` when an explicit verification run is useful.
- Source, package configuration, public assets and build/test configuration changes run CI (lint, coverage and package build).
- UI and Storybook-related changes also run Chromatic on pull requests and on `main`. Newer runs cancel obsolete runs for the same pull request or branch, and Chromatic snapshots only affected stories.
- The organization-package publish workflow stays manual and remains the release gate for `test:package` and `npm publish`.

## Visual parity review

For a UI component change, review the Chromatic diff for its default state, semantic color variants and the relevant disabled, error or selected state. Do not accept a new baseline until it has been compared with the `v0.1.0` Storybook appearance.

Storybook-only compatibility helpers must use the `uui-legacy-*` namespace. Do not add generic selectors such as `.grid`, `.text-*` or `.border-*`: they can override Tailwind utilities in rendered component stories. Class assertions protect source mappings, but visual approval still requires reviewing the rendered parity stories at the target viewport.
