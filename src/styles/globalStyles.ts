import { createGlobalStyle } from "styled-components";
import Pretendard400 from "../assets/fonts/Pretendard-Regular.woff2";
import Pretendard600 from "../assets/fonts/Pretendard-SemiBold.woff2";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    /* font-weight: 400 */
    font-style: normal;
		src: local('Pretendard400'), local('Pretendard400');
    font-family: "Pretendard400";
    src: url(${Pretendard400}) format("woff2");
  }
  @font-face {
    /* font-weight: 600 */
    font-style: normal;
		src: local('Pretendard600'), local('Pretendard600');
    font-family: "Pretendard600";
    src: url(${Pretendard600}) format("woff2");
  }
  :root {
		--primary-red-color: #F64747;
		--secondary-red-color: #ed1d24;
		--white-color-100: #fff;
    --white-color-200: #f4f4f4;
    --white-color-300: #f7f7f7;
    --white-color-400: #ddd;
    --white-color-500: #C0C0C0;
    --white-color-600: #b5b5b5;

		--font-size-title: 4rem;
		--font-size-large: 2.8rem;
		--font-size-medium: 2.2rem;
		--font-size-small: 2rem;
		--font-size-primary: 1.6rem;
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
		vertical-align: baseline;
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
	p.400, span.400 {
		font-family: "Pretendard400";
	}
	p.600, span.600 {
		font-family: "Pretendard600";
	}
`;
