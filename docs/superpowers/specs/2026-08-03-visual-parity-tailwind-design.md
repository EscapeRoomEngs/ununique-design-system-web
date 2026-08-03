# Visual Parity Tailwind Design

## Goal

Restore the visual output of the `v0.1.0` Storybook while retaining the Vite, Tailwind v4, static-class and package architecture introduced in `v1.0.0`. `styled-components` must not return.

## Scope

- Preserve the existing public component APIs and the behavioral/accessibility fixes already made in v1.
- Restore legacy design-token values for color, typography, borders, surfaces and icons.
- Restore the static Storybook documentation utility classes and global reset that were previously injected through Storybook's `previewHead`.
- Correct the component-level visual differences in `Container`, typography, `Button`, input controls and `TabBar`.
- Add deterministic visual-regression coverage for representative component states.

## Non-goals

- Do not reintroduce runtime CSS-in-JS or `styled-components`.
- Do not redesign components, change public props, or replace the Tailwind v4 package pipeline.
- Do not change release or publishing behavior.

## Architecture

### Design tokens

`src/styles/tokens.css` becomes the single CSS source of truth for the legacy token values. Tailwind v4 theme aliases reference these values for static utility use. The semantic values remain exactly those exported by `src/foundation/color.ts`:

- surface: primary, secondary, tertiary, invert, brand, negative, positive, info
- text and icon: primary, secondary, tertiary, invert, negative, positive, info
- border: default, hover, tertiary, invert, negative

This removes all substitutions with Tailwind's default `red`, `blue`, and `slate` palette.

### Storybook compatibility stylesheet

A static CSS compatibility layer replaces the deleted runtime `previewHead` output. It provides:

- the original reset and default Pretendard font;
- legacy typography helper classes (`weight-*`);
- legacy surface, text, border, icon and layout helper classes used by Foundation MDX;
- the existing documentation-table presentation rules.

Storybook imports this layer once through `preview.ts`; package consumers receive only the design-system CSS entry, without Storybook documentation rules.

### Component parity

- `Container` maps every supported surface and border token to its original value. Its layout mapping remains static Tailwind classes, while runtime numeric gap and radius remain inline styles as before.
- Typography keeps its legacy defaults and exact desktop sizes/130% line height. `Body` defaults to Small (14px), not Medium (15px).
- `Button` restores disabled surface/text/icon values and resolves the icon color from its semantic property.
- Input controls, `TabBar` and `Dialog` use semantic token aliases and legacy sizing/line-height values rather than Tailwind default palette or type metrics.

## Visual regression strategy

Storybook stories are the source of visual baselines. Chromatic runs for UI-affecting changes and compares representative states: default, semantic color variants, disabled, focused/error and selected states. Existing path filtering and cancellation remain unchanged.

For any changed component, the implementation must verify its Storybook build and request visual review of Chromatic changes instead of accepting a new baseline silently.

## Acceptance criteria

1. Foundation MDX helper classes render as they did in `v0.1.0`.
2. Semantic colors match the legacy HEX values; no component uses substitute Tailwind palette colors for a legacy semantic token.
3. Typography, Button, Container and Tab representative stories match their `v0.1.0` sizing, color and state treatment.
4. `styled-components` remains absent from the dependency graph and source code.
5. Lint, unit/accessibility tests, package build and Storybook build pass.
