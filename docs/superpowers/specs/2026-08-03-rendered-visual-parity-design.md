# Rendered Visual Parity Design

## Goal

Restore the `v0.1.0` Storybook appearance by removing Tailwind/legacy CSS selector collisions and reproducing component dimensions, typography and state styles from the original CSS declarations. The static Tailwind v4 architecture remains in place; `styled-components` does not return.

## Root cause

The previous migration replaced component-scoped styled-components rules with approximate Tailwind utilities, then added a global Storybook compatibility stylesheet. Its `.grid` selector is loaded after Tailwind utilities and overrides Tailwind's `.grid`, `justify-*` and `gap-*` behavior inside current components. The affected layer therefore changes layout beyond the Foundation documentation it was intended to repair.

## Architecture

### Storybook documentation isolation

Remove generic legacy utility selectors (`.grid`, `.text-*`, `.border-*`) from the global Storybook compatibility stylesheet. Use namespaced `uui-legacy-*` selectors only for Foundation MDX and update every affected MDX/story reference. The compatibility stylesheet must not override a Tailwind utility used by a component.

### Exact component CSS mapping

For each component, use the `v0.1.0` stylesheet as the source of truth. Convert each declaration into a static Tailwind utility or a narrow semantic class only when its computed value is identical.

- Button: 40/48/54px height, 7/14/16px vertical padding, 24/32px horizontal padding, 8px gap, semantic border/color states and disabled treatment.
- TextField and Dropdown: 328/440/672px widths, 44px height, 12px 15px padding, 4px radius, 16px gap, semantic focus/error/disabled/open states and option dimensions.
- Typography: original desktop font sizes, 130% line height, exact weight family and legacy fallback behavior.
- Tab, Dialog, Container, Radio and Checkbox: original spacing, border, radius, layout and typography declarations.

Components must not rely on Storybook-only styles for their visual output.

### Rendered visual verification

Render a fixed set of representative stories from `v0.1.0` and the current code at the same viewport. Store comparison screenshots outside published package files. A component is accepted only after its default, semantic variant and interactive/disabled/error/selected state visibly match the baseline or has an explicitly reviewed intentional difference.

## Scope

- Correct the global selector collision first.
- Restore component styles in the order: Foundation/Container/Typography, Button, Input controls, Tab/Dialog/Pagination.
- Add deterministic Storybook stories only when existing stories cannot expose a required baseline state.
- Retain existing behavior and accessibility fixes unless they force an observable visual difference; document such a difference.

## Acceptance criteria

1. The Storybook compatibility stylesheet contains no unnamespaced selector that collides with a Tailwind utility used in `src/atom` or `src/components`.
2. Computed dimensions and semantic colors for the affected component states equal their `v0.1.0` values.
3. Each representative Storybook state has a current/baseline screenshot comparison.
4. Existing unit/accessibility tests, package build, Storybook build and package-consumer test pass.
5. `styled-components` remains absent from source and dependencies.
