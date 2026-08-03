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
const surfaces = { primary: "bg-uui-surface-primary", secondary: "bg-uui-surface-secondary", tertiary: "bg-uui-surface-tertiary", invert: "bg-[#232527]", brand: "bg-uui-surface-brand", negative: "bg-red-50", positive: "bg-blue-50", info: "bg-slate-50" };

export function Container({ display = "grid", direction = "row", justify: justifyValue = "flex-start", align: alignValue = "center", spacing = 16, radius = 0, bgColor, borderColor, className, style, ...props }: ContainerProps) {
  return <div className={cn(display, display === "flex" && (direction === "column" ? "flex-col" : "flex-row"), justify[justifyValue], align[alignValue], bgColor && surfaces[bgColor], borderColor && "border", borderColor === "default" && "border-uui-border-default", borderColor === "tertiary" && "border-uui-border-strong", borderColor === "negative" && "border-red-500", className)} style={{ gap: spacing, borderRadius: radius, ...style }} {...props} />;
}
