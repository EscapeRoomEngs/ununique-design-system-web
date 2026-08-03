import { HTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export type FontColor = "primary" | "secondary" | "tertiary" | "invert" | "negative" | "positive" | "info";
type FontStyle = "Large" | "Medium" | "Small" | "ExtraSmall";
type BaseProps = { weight?: 300 | 400 | 500 | 600; fontStyle?: FontStyle; fontColor?: FontColor; children?: ReactNode };
const colors: Record<FontColor, string> = { primary: "text-uui-text-primary", secondary: "text-uui-text-secondary", tertiary: "text-uui-text-tertiary", invert: "text-uui-text-invert", negative: "text-red-500", positive: "text-blue-500", info: "text-slate-500" };
const weights = { 300: "font-light", 400: "font-normal", 500: "font-medium", 600: "font-semibold" };
const sizes = { display: { Large: "text-5xl", Medium: "text-[44px]", Small: "text-[40px]", ExtraSmall: "text-[40px]" }, headline: { Large: "text-4xl", Medium: "text-[33px]", Small: "text-3xl", ExtraSmall: "text-3xl" }, title: { Large: "text-[27px]", Medium: "text-2xl", Small: "text-[21px]", ExtraSmall: "text-[21px]" }, body: { Large: "text-lg", Medium: "text-[15px]", Small: "text-sm", ExtraSmall: "text-[13px]" }, label: { Large: "text-lg", Medium: "text-[15px]", Small: "text-sm", ExtraSmall: "text-[13px]" } };
const textClass = (kind: keyof typeof sizes, { weight = kind === "body" ? 400 : 600, fontStyle = "Medium", fontColor }: BaseProps, className?: string) => cn("leading-[1.3]", sizes[kind][fontStyle], weights[weight], fontColor && colors[fontColor], className);
export interface TypographyProps extends HTMLAttributes<HTMLElement>, BaseProps {}
export const Display = ({ className, weight, fontStyle, fontColor, ...props }: TypographyProps) => <p className={textClass("display", { weight, fontStyle, fontColor }, className)} {...props} />;
export const Heading = ({ fontStyle = "Large", className, weight, fontColor, ...props }: TypographyProps) => { const Tag = fontStyle === "Large" ? "h1" : fontStyle === "Medium" ? "h2" : "h3"; return <Tag className={textClass("headline", { weight, fontStyle, fontColor }, className)} {...props} />; };
export const Title = ({ fontStyle = "Medium", className, weight, fontColor, ...props }: TypographyProps) => { const Tag = fontStyle === "Large" ? "h4" : fontStyle === "Medium" ? "h5" : "h6"; return <Tag className={textClass("title", { weight, fontStyle, fontColor }, className)} {...props} />; };
export const Body = ({ className, weight, fontStyle, fontColor, ...props }: TypographyProps) => <p className={textClass("body", { weight, fontStyle, fontColor }, className)} {...props} />;
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement>, BaseProps { required?: boolean }
export const Label = ({ required, className, weight, fontStyle, fontColor, ...props }: LabelProps) => <label className={cn(textClass("label", { weight, fontStyle, fontColor }, className), required && "after:ml-0.5 after:text-red-500 after:content-['*']")} {...props} />;
/** @deprecated Use Label. */
export const Lable = Label;
export const Text = ({ usage = "body", ...props }: BaseProps & { usage?: "display" | "headline" | "title" | "body" | "lable" }) => usage === "display" ? <Display {...props} /> : usage === "headline" ? <Heading {...props} /> : usage === "title" ? <Title {...props} /> : usage === "lable" ? <Label {...props} /> : <Body {...props} />;
