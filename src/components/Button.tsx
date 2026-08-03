import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { Icon } from "../atom/Icon";
import { Body } from "../atom/Text";
import { cn } from "../lib/cn";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed",
  {
    variants: {
      size: { Small: "h-10 px-6 py-[7px]", Medium: "h-12 px-8 py-3.5", Large: "h-[54px] px-8 py-4" },
      radius: { 0: "rounded-none", 4: "rounded", 8: "rounded-lg" },
      property: {
        outlined: "border border-uui-border-default bg-uui-surface-primary text-uui-text-secondary",
        brand: "bg-uui-surface-brand text-uui-text-invert",
        negative: "bg-uui-surface-negative text-uui-text-negative", positive: "bg-uui-surface-positive text-uui-text-positive",
        info: "bg-uui-surface-info text-uui-text-info", invert: "bg-uui-surface-invert text-uui-text-invert",
      },
    },
    defaultVariants: { size: "Small", radius: 4, property: "outlined" },
  }
);

const iconColors = { outlined: "secondary", brand: "invert", negative: "negative", positive: "positive", info: "info", invert: "invert" } as const;

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "property">, VariantProps<typeof buttonVariants> {
  text?: string;
  icon?: string;
}

export function Button({ text, size = "Small", radius = 4, property = "outlined", icon, className, type = "button", ...props }: ButtonProps) {
  const iconColor = props.disabled ? "tertiary" : iconColors[property ?? "outlined"];
  return <button type={type} className={cn(buttonVariants({ size, radius, property }), props.disabled && "bg-uui-surface-tertiary text-uui-text-tertiary", className)} {...props}>
    {icon && <Icon iconNm={icon} iconSize={20} iconColor={iconColor} />}
    {text && <Body fontStyle={(size ?? "Small") as "Small" | "Medium" | "Large"} weight={600}>{text}</Body>}
  </button>;
}
