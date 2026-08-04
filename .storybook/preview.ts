import type { Preview } from "@storybook/react";
import { createElement } from "react";
import { ThemeProvider, type ThemeName } from "../src/theme/ThemeProvider";
import "../src/styles/index.css";
import "../src/styles/fonts.css";
import "../src/stories/legacyStorybook.css";

const preview: Preview = {
  globalTypes: {
    brandTheme: {
      description: "브랜드 테마",
      defaultValue: "red",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "red", title: "Red" },
          { value: "orange", title: "Orange" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => createElement(
      ThemeProvider,
      { theme: context.globals.brandTheme as ThemeName },
      createElement(Story),
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          "Design System",
          [
            "Foundation",
            ["Typography", "Corner Radius", "Spacing", "Hierarchy", "Color"],
            "Atom",
            "Component",
            ["Button", "Checkbox", "Radio", "TextField", "Dropdown", "Dialog", "Tab"],
            "Template",
            "Page",
          ],
        ],
      },
    },
  },
};

export default preview;
