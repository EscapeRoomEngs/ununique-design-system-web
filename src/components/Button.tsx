import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { Icon } from "../atom/Icon";
import { Body } from "../atom/Text";
import { cn } from "../lib/cn";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 font-semibold transition-colors motion-reduce:transition-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uui-focus-brand disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-uui-surface-tertiary disabled:text-uui-text-tertiary",
  {
    variants: {
      size: { Small: "h-10 px-6 py-[7px]", Medium: "h-12 px-8 py-3.5", Large: "h-[54px] px-8 py-4" },
      radius: { 0: "rounded-none", 4: "rounded", 8: "rounded-lg" },
      property: {
        outlined: "border border-uui-border-default bg-uui-surface-primary text-uui-text-on-neutral hover:border-uui-border-hover hover:bg-uui-surface-secondary active:border-uui-border-tertiary active:bg-uui-surface-tertiary",
        brand: "bg-uui-surface-brand text-uui-text-on-brand hover:bg-uui-surface-brand-hover hover:text-uui-text-on-brand-hover active:bg-uui-surface-brand-active active:text-uui-text-on-brand-active",
        negative: "bg-uui-surface-negative text-uui-text-on-negative hover:bg-uui-surface-negative-hover active:bg-uui-surface-negative-active",
        positive: "bg-uui-surface-positive text-uui-text-on-positive hover:bg-uui-surface-positive-hover active:bg-uui-surface-positive-active",
        info: "bg-uui-surface-info text-uui-text-on-info hover:bg-uui-surface-info-hover active:bg-uui-surface-info-active",
        invert: "bg-uui-surface-invert text-uui-text-on-invert hover:bg-uui-surface-invert-hover active:bg-uui-surface-invert-active",
      },
    },
    defaultVariants: { size: "Small", radius: 4, property: "outlined" },
  }
);

const iconColors = { outlined: "secondary", brand: "invert", negative: "negative", positive: "positive", info: "info", invert: "invert" } as const;

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "property">, VariantProps<typeof buttonVariants> {
  text?: string;
  icon?: string;
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({ text, size = "Small", radius = 4, property = "outlined", icon, iconPosition = "start", fullWidth = false, loading = false, className, type = "button", disabled = false, ...props }: ButtonProps) {
  const isDisabled = disabled || loading;
  const iconColor = isDisabled ? "tertiary" : iconColors[property ?? "outlined"];
  const iconElement = icon && !loading ? <Icon iconNm={icon} iconSize={20} iconColor={iconColor} /> : null;

  return <button type={type} disabled={isDisabled} aria-busy={loading || undefined} className={cn(buttonVariants({ size, radius, property }), isDisabled && "bg-uui-surface-tertiary text-uui-text-tertiary", fullWidth && "w-full", className)} {...props}>
    {loading && <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />}
    {iconPosition === "start" && iconElement}
    {text && <Body fontStyle={(size ?? "Small") as "Small" | "Medium" | "Large"} weight={600}>{text}</Body>}
    {iconPosition === "end" && iconElement}
  </button>;
}
