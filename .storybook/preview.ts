import type { Preview } from "@storybook/react";
import "../src/styles/index.css";
import "../src/styles/fonts.css";

const preview: Preview = {
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
