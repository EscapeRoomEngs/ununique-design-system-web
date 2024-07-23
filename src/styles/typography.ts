import { usage, weight } from "../foundation/typography";

export const TYPOGRAPHY = `
  /* Typography */
  ${Object.keys(usage).map(
    (styleNm) => `
    ${styleNm}${Object(usage)[styleNm].classNm ? `, .${Object(usage)[styleNm].classNm}` : ""} {
      font-family: "Pretendard${Object(usage)[styleNm].weight}";
      font-size: ${Object(usage)[styleNm].webSize}px;
      line-height: 130%;
      letter-spacing: 0%;
      @media (width < 800px) {
        font-size: ${Object(usage)[styleNm].mobileSize}px;
      }
    }
  `
  )}
  /* Font Weight */
  ${Object.keys(weight).map(
    (weightNm) => `
    .weight-${Object(weight)[weightNm]} {
      font-family: "${Object(weight)[weightNm]}";
    }
  `
  )}
`;
