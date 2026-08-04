# Brand Theme and Interactive Accessibility Design

## Goal

Make the package ready for release by providing typed brand-theme management, consistent interactive states, accessible interaction behavior, and Storybook stories whose args match the public component APIs.

## Scope

The work covers every public interactive component: `Button`, `TextField`, `Dropdown`, `Radio`, `Checkbox`, `Dialog`, `TabBar`, and `Pagination`. It also updates the supporting `Icon` behavior, semantic tokens, and their Storybook stories.

## Theme architecture

- Keep `data-uui-theme="red" | "orange"` as the CSS integration point for consumers that cannot use React helpers.
- Export a typed `ThemeName` union and `ThemeProvider` wrapper. The provider renders an ordinary element with `data-uui-theme`, so theme inheritance remains CSS-native and nested providers work naturally.
- Keep primitive scales internal. Components and consumers use only `uui`-namespaced semantic utility classes and public component props.
- Add semantic brand tokens for default, hover, active, and focus. Red remains the default theme. Orange uses the approved Orange scale, with the documented pressed value (`orange.600`) as its active state.
- Brand foreground text uses the primary foreground token rather than white, so the normal Button label size has sufficient contrast on both Red and Orange backgrounds.

## Component behavior

### Shared interactions

- Interactive controls have a visible 2px focus indicator driven by the semantic brand focus token.
- Hover and active styles are present only for enabled controls. Disabled controls suppress pointer affordance and retain clear disabled styling.
- Decorative SVG icons are hidden from the accessibility tree. Icon-only Buttons require an accessible name through the native `aria-label` prop; stories demonstrate that use.

### Button

- Preserve existing `size`, `radius`, `property`, `text`, `icon`, and native button props.
- Give each visual property an enabled hover/active/focus-visible/disabled state. `brand` consumes the theme-aware tokens; semantic negative/positive/info behavior remains independent of the selected brand.
- Retain `type="button"` as the default and allow all native button attributes.

### TextField and Dropdown

- TextField uses a 2px border in default, focus, error, and disabled states. The internal clear/password controls are transparent, have no inherited gray surface, and receive accessible focus styling.
- TextField forwards native ARIA attributes and sets `aria-invalid` when its error state is true without overriding a consumer-provided `aria-describedby`.
- Dropdown uses the select-only combobox/listbox pattern: a labelled toggle with `aria-expanded`, `aria-controls`, and active option state; options use `role="option"` and `aria-selected`.
- Dropdown supports ArrowUp/ArrowDown, Home, End, Enter/Space, and Escape. Selecting an option closes the popup and returns focus to the toggle. Disabled and empty option lists cannot open.

### Radio, Checkbox, TabBar, and Pagination

- Radio and Checkbox retain native input semantics, use the brand semantic color for their selected indicator by default, and show a focus indicator on the visible label/control.
- TabBar exposes the tab/list pattern (`tablist`, `tab`, `aria-selected`, `aria-controls` when supplied) and supports ArrowLeft/ArrowRight, Home, and End selection while preserving the existing controlled `selected`/`onSelect` API.
- Pagination retains its zero-based public index, provides a labelled navigation landmark, keeps disabled next/previous controls inaccessible to activation, and commits a numeric page when Enter is pressed or focus leaves the input.

### Dialog

- Preserve current rendering compatibility: a Dialog without `open` renders open.
- Add optional `open`, `onClose`, and `closeOnOverlayClick` props. When an `onClose` callback exists, Escape and enabled overlay clicks request closure; they never mutate a controlled prop themselves.
- Use `aria-labelledby` and `aria-describedby`, focus the first actionable element on open, restore focus after close, and trap Tab/Shift+Tab while open.

## Storybook contract

- Every story uses `Meta<typeof Component>` and only declared component props in `args`.
- Controlled examples synchronize local state when controls change their initial prop, but do not invent unsupported props such as Dropdown `value`.
- Every interactive component gets a representative default, disabled/error or selected state, keyboard-relevant state where applicable, and a Red/Orange parity view whenever it consumes brand semantics.
- Stories avoid `console.log` event placeholders and use Storybook actions for observable callbacks.

## Verification

- Unit tests cover typed ThemeProvider output, semantic token contracts, and Button state classes.
- Interaction tests use Testing Library keyboard events for Dropdown, Dialog, TabBar, and Pagination.
- `jest-axe` coverage includes all public interactive components, including an open Dialog and open Dropdown.
- Story compilation is verified with `npm run build-storybook`; library output is verified with `npm run build`; lint and the full Vitest suite must pass.

## Compatibility constraints

- `uui` prefixes remain mandatory for public CSS variables, utility classes, and the theme data attribute because package CSS is global.
- Existing consumer props remain valid; new props are optional except that icon-only Button examples must supply an accessible name.
- No primitive color scale becomes a package-root export in this work.
