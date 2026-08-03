import { HTMLAttributes } from "react";
import { Container } from "../atom/Container";

export interface TabItem { text: string; [key: string]: unknown }
export interface TabProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  tabList?: TabItem[];
  selected?: TabItem;
  onSelect?: (value: TabItem) => void;
}
export function TabBar({ tabList = [], selected, onSelect, ...props }: TabProps) {
  return (
    <Container display="flex" spacing={0} {...props}>
      {tabList.map((tab, tidx) => (
        <button
          key={tidx}
          type="button"
          aria-pressed={tab.text === selected?.text}
          onClick={() => onSelect?.(tab)}
          className={`w-full cursor-pointer border-b-2 bg-uui-surface-primary px-6 py-3.5 text-center text-lg font-semibold ${tab.text === selected?.text ? "border-uui-border-strong text-uui-text-primary" : "border-uui-border-default text-uui-text-tertiary"}`}
        >
          {tab.text}
        </button>
      ))}
    </Container>
  );
}
