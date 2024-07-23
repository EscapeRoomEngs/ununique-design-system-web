import type { StorybookConfig } from "@storybook/react-webpack5";
import { COLOR } from "../src/styles/color";
import { LAYOUT } from "../src/styles/layout";
import { TYPOGRAPHY } from "../src/styles/typography";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-controls",
    "@storybook/addon-actions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["../public"],
  previewHead: (head) => `
  ${head}
  <style type="text/css">
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
      overflow-x: hidden;
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
  </style>
  `,
};
export default config;
