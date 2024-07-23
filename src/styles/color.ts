import { primitives, token } from "../foundation/color";

export const COLOR = `
  :root {
    ${Object.keys(primitives).map((colorNm) =>
      Object.keys(Object(primitives)[colorNm]).map(
        (depth) => `--${colorNm}-${depth}: ${Object(primitives)[colorNm][depth]};`
      )
    )}
  }
  /* Color Token - 1. Text */
  ${Object.keys(token.text).map(
    (tokenColor) => `
    .text-${tokenColor} { color: ${Object(token.text)[tokenColor].hex}; }
  `
  )}
  /* Color Token - 2. Surface */
  ${Object.keys(token.surface).map(
    (tokenColor) => `
    .surface-${tokenColor} { background-color: ${Object(token.surface)[tokenColor].hex}; }
  `
  )}
  /* Color Token - 3. Border */
  ${Object.keys(token.border).map(
    (tokenColor) => `
    .border-${tokenColor} { 
      border-style: solid;
      border-color: ${Object(token.border)[tokenColor].hex}; 
    }
  `
  )}
  /* Color Token - 4. Icon */
  ${Object.keys(token.icon).map(
    (tokenColor) => `
    .icon-${tokenColor} > svg{ fill: ${Object(token.icon)[tokenColor].hex}; }
  `
  )}`;
