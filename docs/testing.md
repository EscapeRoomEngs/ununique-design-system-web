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
