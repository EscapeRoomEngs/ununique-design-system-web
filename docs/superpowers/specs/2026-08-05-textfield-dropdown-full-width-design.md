# TextField and Dropdown full-width API

## Goal

Allow consumers to make `TextField` and `Dropdown` wrappers fill their available width without relying on internal DOM selectors.

## Scope

- Add an optional `fullWidth` boolean prop to `TextFieldsProps` and `DropdownProps`.
- Keep the existing fixed width presets as the default.
- Apply full width to each component's outer wrapper when `fullWidth` is true.
- Verify both wrappers and the Dropdown trigger/listbox continue to follow their wrapper width.
- Document the prop with Storybook examples.

## Non-goals

- Adding arbitrary wrapper class or style props.
- Adding a new size variant or changing existing size preset widths.
- Changing TextField input or Dropdown trigger `className` forwarding behavior.

## Design

`fullWidth` defaults to `false`, matching the existing `Button` API and preserving every current consumer layout. When true, the outer wrapper appends `w-full` after its selected fixed-width utility. Tailwind's utility order causes the full-width utility to take precedence while preserving the selected height and all other layout classes.

For `TextField`, the wrapper owns width and its native input already uses `flex-1`, so the input expands within the full-width field. For `Dropdown`, the wrapper owns width, while the trigger and listbox already use the wrapper's width (`w-full` on the listbox); the trigger will use `w-full` only when `fullWidth` is enabled rather than retaining the fixed preset width.

The implementation is additive and backward compatible. Tests assert default fixed-width classes and the `w-full` wrapper contract. Storybook adds responsive full-width examples for both components.

## Verification

Run the focused Input tests, the full test suite, lint, Storybook type checking, and package verification.
