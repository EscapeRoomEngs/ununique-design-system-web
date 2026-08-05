# Input Focus Indicator Design

## Goal

Restore the original single, dark focus border for `TextField` and `Dropdown`.

## Cause

The accessibility update introduced a brand-coloured focus border and an offset focus outline. Together they render as two outlines. It also replaced the former `border-uui-border-tertiary` focus state.

## Design

- `TextField` uses `focus-within:border-uui-border-tertiary` and no outer focus outline.
- `Dropdown` uses `focus-visible:border-uui-border-tertiary`; its open state uses the same border token.
- No public API, token, or layout change.
- Tests assert that neither component includes brand focus or outline utility classes.

## Verification

- Focused TextField and Dropdown expose exactly one `border-uui-border-tertiary` state.
- `npm test`, lint, and package verification pass.
