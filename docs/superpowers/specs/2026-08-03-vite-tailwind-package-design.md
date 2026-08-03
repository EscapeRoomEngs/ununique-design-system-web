# Vite Tailwind Package Design

## Goal

Replace the Create React App and styled-components based proof of concept with a secure, publishable React design-system package. Consumers must be able to use the package without Tailwind CSS.

## Scope

- Replace CRA/Webpack tooling with Vite.
- Upgrade Storybook to the current React-Vite framework.
- Replace styled-components and runtime style injection with Tailwind CSS v4 at build time.
- Ship ESM, CommonJS, declarations, fonts, SVG assets, and precompiled CSS.
- Add component behavior tests, package smoke tests, and a Changesets release workflow.

## Non-goals

- A monorepo or multiple public packages.
- Publishing to npm during this refactor.
- Adding new product components beyond the current public set.

## Architecture

The source package exposes its public API from `src/index.ts`. Vite library mode builds JavaScript and the CSS imported by that entry; `tsc` emits declarations. `react` and `react-dom` remain peer dependencies. Consumers import `@ununique/ui/styles.css`; Tailwind itself is only a development dependency.

Design values are authored in `src/tokens` and emitted as `--uui-*` custom properties. Tailwind v4 uses those values during library compilation. The distributed stylesheet excludes Preflight and uses a `uui` prefix for generated utilities, so it does not reset or collide with a consuming application's styles.

## Public API

```ts
import "@ununique/ui/styles.css";
import { Button, TextField, tokens } from "@ununique/ui";
```

The initial package exports `Button`, `Text`, `Display`, `Heading`, `Title`, `Body`, `Label`, `Container`, `Icon`, `TextField`, `Dropdown`, `Radio`, `Checkbox`, `Dialog`, `TabBar`, `Pagination`, and typed tokens. `Lable` remains a deprecated alias until the next breaking release.

## Quality Gates

- `npm run lint`, `npm run test`, `npm run build`, and `npm run build-storybook` pass.
- `npm audit --omit=dev --audit-level=high` has no findings.
- A fixture that has no Tailwind dependency can install the generated tarball, import CSS, and render a Button.
- Component interactions are covered with Vitest and Testing Library.

## Compatibility

- Node.js: use the supported Vite floor at the time dependencies are resolved; the local runtime is Node 24.18.0.
- Browsers: Vite's default modern-browser baseline.
- React: peer range supports React 18.3+ and React 19.
