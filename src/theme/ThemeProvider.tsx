import type { HTMLAttributes } from "react";

export type ThemeName = "red" | "orange";

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  theme?: ThemeName;
}

export function ThemeProvider({ theme = "red", ...props }: ThemeProviderProps) {
  return <div {...props} data-uui-theme={theme} />;
}
