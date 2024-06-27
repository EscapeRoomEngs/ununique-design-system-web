import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Ununique Design System (Web)",
    // brandImage: require("./logo.png"),
    fontBase: "Pretendard400",
    fontCode: "monospace",
  }),
});
