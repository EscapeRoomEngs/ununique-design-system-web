import { createGlobalStyle } from "styled-components";
import Pretendard300 from "../assets/fonts/Pretendard-Light.woff2";
import Pretendard500 from "../assets/fonts/Pretendard-Medium.woff2";
import Pretendard400 from "../assets/fonts/Pretendard-Regular.woff2";
import Pretendard600 from "../assets/fonts/Pretendard-SemiBold.woff2";
import { primitives, token } from "../foundation/color";
import { layout } from "../foundation/layout";
import { usage, weight } from "../foundation/typography";

export const GlobalStylesCSS = `
  :root {
    ${Object.keys(primitives).map((colorNm) =>
      Object.keys(Object(primitives)[colorNm]).map(
        (depth) => `--${colorNm}-${depth}: ${Object(primitives)[colorNm][depth]};`
      )
    )}
  }
  html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video,
	input, textarea, button {
		margin: 0;
		padding: 0;
		border: 0;
		box-sizing: border-box;
		font-size: 100%;
		line-height: 130%;
		font: inherit;
		vertical-align: middle;
		font-family: "Pretendard400";
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	img {
		width: 100%;
		height: 100%;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
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
  )}
	/* Layout */
	.grid { ${layout.grid({})} }
	.flex-center { ${layout.flex({})} }
	.flex-sides { ${layout.flex({ justify: "space-between" })} }
	.flex-left { ${layout.flex({ justify: "flex-start" })} }
	.flex-right { ${layout.flex({ justify: "flex-end" })} }
	.flex-upper-lower { ${layout.flex({ justify: "space-between", align: "space-between", direction: "column" })} }
	.layout-upper {
		alight-items: start;
	}
	.layout-lower {
		alight-items: end;
	}
	.layout-sides {
		alight-items: space-between;
	}
`;

export const GlobalStyles = createGlobalStyle`
	@font-face {
		/* font-weight: 300 */
		font-style: normal;
		src: local("Pretendard300"), local("Pretendard300");
		font-family: "Pretendard300";
		src: url(${Pretendard300}) format("woff2");
	}
	@font-face {
		/* font-weight: 400 */
		font-style: normal;
		src: local("Pretendard400"), local("Pretendard400");
		font-family: "Pretendard400";
		src: url(${Pretendard400}) format("woff2");
	}
	@font-face {
		/* font-weight: 500 */
		font-style: normal;
		src: local("Pretendard500"), local("Pretendard500");
		font-family: "Pretendard500";
		src: url(${Pretendard500}) format("woff2");
	}
	@font-face {
		/* font-weight: 600 */
		font-style: normal;
		src: local("Pretendard600"), local("Pretendard600");
		font-family: "Pretendard600";
		src: url(${Pretendard600}) format("woff2");
	}
	${GlobalStylesCSS}
`;
