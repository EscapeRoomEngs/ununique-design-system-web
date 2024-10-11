import type { Preview } from "@storybook/react";

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
