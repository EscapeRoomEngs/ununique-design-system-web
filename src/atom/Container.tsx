import { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  display?: "grid" | "flex";
  direction?: "row" | "column";
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-evenly" | "stretch";
  align?: "flex-start" | "center" | "flex-end" | "space-between" | "space-evenly" | "stretch";
  spacing?: number;
  radius?: number;
  bgColor?: "primary" | "secondary" | "tertiary" | "invert" | "brand" | "negative" | "positive" | "info";
  borderColor?: "default" | "hover" | "tertiary" | "invert" | "negative";
}

const justify = { "flex-start": "justify-start", center: "justify-center", "flex-end": "justify-end", "space-between": "justify-between", "space-evenly": "justify-evenly", stretch: "justify-stretch" };
const align = { "flex-start": "items-start", center: "items-center", "flex-end": "items-end", "space-between": "items-stretch", "space-evenly": "items-stretch", stretch: "items-stretch" };
const surfaces = { primary: "bg-uui-surface-primary", secondary: "bg-uui-surface-secondary", tertiary: "bg-uui-surface-tertiary", invert: "bg-uui-surface-invert", brand: "bg-uui-surface-brand", negative: "bg-uui-surface-negative", positive: "bg-uui-surface-positive", info: "bg-uui-surface-info" };
const borders = { default: "border-uui-border-default", hover: "border-uui-border-hover", tertiary: "border-uui-border-tertiary", invert: "border-uui-border-invert", negative: "border-uui-border-negative" };

export function Container({ display = "grid", direction = "row", justify: justifyValue = "flex-start", align: alignValue = "center", spacing = 16, radius = 0, bgColor, borderColor, className, style, ...props }: ContainerProps) {
  return <div className={cn("font-[family-name:var(--uui-font-sans)] font-light", display, display === "flex" && (direction === "column" ? "flex-col" : "flex-row"), justify[justifyValue], align[alignValue], bgColor && surfaces[bgColor], borderColor && "border", borderColor && borders[borderColor], className)} style={{ gap: spacing, borderRadius: radius, ...style }} {...props} />;
}
