import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { Icon } from "../atom/Icon";
import { Body } from "../atom/Text";
import { cn } from "../lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed",
  {
    variants: {
      size: { Small: "h-10 px-6", Medium: "h-12 px-8", Large: "h-[54px] px-8" },
      radius: { 0: "rounded-none", 4: "rounded", 8: "rounded-lg" },
      property: {
        outlined: "border border-uui-border-default bg-uui-surface-primary text-uui-text-secondary",
        brand: "bg-uui-surface-brand text-uui-text-invert",
        negative: "bg-red-50 text-red-500", positive: "bg-blue-50 text-blue-500",
        info: "bg-slate-50 text-slate-500", invert: "bg-[#232527] text-uui-text-invert",
      },
    },
    defaultVariants: { size: "Small", radius: 4, property: "outlined" },
  }
);

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "property">, VariantProps<typeof buttonVariants> {
  text?: string;
  icon?: string;
}

export function Button({ text, size = "Small", radius = 4, property = "outlined", icon, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ size, radius, property }), className)} {...props}>
    {icon && <Icon iconNm={icon} iconSize={20} iconColor={props.disabled ? "tertiary" : "invert"} />}
    {text && <Body fontStyle={(size ?? "Small") as "Small" | "Medium" | "Large"} weight={600}>{text}</Body>}
  </button>;
}
