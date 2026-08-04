# TextField native border reset

## Goal

Prevent browser user-agent `input` borders from appearing alongside the Ununique TextField focus treatment in applications that import the published `styles.css`.

## Scope

- Add a component-local `border-0` reset to the native input rendered by `TextField`.
- Preserve the existing wrapper border and keyboard-only `:focus-visible` outline behavior.
- Cover the reset in the component unit tests.
- Change the Storybook focus example to exercise keyboard tab navigation.
- Confirm the production package stylesheet contains the generated reset utility.

## Non-goals

- Adding global resets to the published stylesheet.
- Changing the public `TextField` API.
- Altering focus styles for Dropdown, Pagination, or other components.

## Design

`TextField` owns the input DOM node, so its class list will explicitly include Tailwind's `border-0`. This removes the native border without relying on Storybook's global reset or consumer CSS.

The wrapper remains the single visual owner of the field boundary. It keeps its semantic default/error borders and its keyboard-only brand outline. The input continues to suppress its own outline, preventing duplicate focus indicators.

The existing class-contract test will assert `border-0` on the input. The `BrandFocusState` Storybook interaction will use keyboard Tab focus rather than a pointer click, so its visual state represents the focus-visible path that consumers encounter.

The package build test will be run after the change, including its check of the emitted `dist/styles.css`, to ensure the production artifact carries the required utility.

## Error handling and compatibility

The change is additive to the input's utility classes and does not modify props, emitted events, accessibility attributes, or wrapper structure. It is therefore a patch-compatible correction for consumers.

## Verification

Run the focused Input tests, the full test suite, lint, and package verification. Inspect the production stylesheet for the generated border reset utility.
