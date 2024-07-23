import { createGlobalStyle } from "styled-components";
import Pretendard300 from "../assets/fonts/Pretendard-Light.woff2";
import Pretendard500 from "../assets/fonts/Pretendard-Medium.woff2";
import Pretendard400 from "../assets/fonts/Pretendard-Regular.woff2";
import Pretendard600 from "../assets/fonts/Pretendard-SemiBold.woff2";
import { COLOR } from "./color";
import { LAYOUT } from "./layout";
import { TYPOGRAPHY } from "./typography";

export const GlobalStylesCSS = `
  ${TYPOGRAPHY}
  ${COLOR}
  ${LAYOUT}
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
		overflow-y: auto;
		overflow-x: hidden; /* 가로 스크롤바 제거 */
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
		/* 스크롤바 커스텀 */
		::-webkit-scrollbar {
			width: 20px;
			height: 20px;
		}
		::-webkit-scrollbar-track {
			background-color: white;
		}
		::-webkit-scrollbar-thumb {
			display: block;
			background: #d1d1d1;
			background-clip: padding-box;
			border-radius: 16px;
			border: 8px solid transparent;
		}
		.surface-invert::-webkit-scrollbar-track {
			background-color: transparent;
		}
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
