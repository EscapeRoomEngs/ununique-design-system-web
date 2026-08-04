import { HTMLAttributes, useRef } from "react";
import { Container } from "../atom/Container";

export interface TabItem { text: string; [key: string]: unknown }
export interface TabProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  tabList?: TabItem[];
  selected?: TabItem;
  onSelect?: (value: TabItem) => void;
}
export function TabBar({ tabList = [], selected, onSelect, ...props }: TabProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = tabList.findIndex((tab) => tab.text === selected?.text);
  const activeIndex = selectedIndex >= 0 ? selectedIndex : 0;

  function selectTab(index: number) {
    const tab = tabList[index];
    if (!tab) return;

    tabRefs.current[index]?.focus();
    onSelect?.(tab);
  }

  function onTabKeyDown(index: number, event: React.KeyboardEvent<HTMLButtonElement>) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabList.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabList.length) % tabList.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabList.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      selectTab(nextIndex);
    }
  }

  return (
    <Container display="flex" spacing={0} {...props} role="tablist">
      {tabList.map((tab, tidx) => (
        <button
          key={tidx}
          type="button"
          ref={(element) => { tabRefs.current[tidx] = element; }}
          role="tab"
          aria-selected={tidx === activeIndex}
          tabIndex={tidx === activeIndex ? 0 : -1}
          onClick={() => onSelect?.(tab)}
          onKeyDown={(event) => onTabKeyDown(tidx, event)}
          className={`w-full cursor-pointer border-b-2 bg-uui-surface-primary px-6 py-3.5 text-center font-[family-name:var(--uui-font-sans)] text-lg font-semibold leading-[1.3] focus-visible:outline-2 focus-visible:outline-uui-focus-brand ${tidx === activeIndex ? "border-uui-surface-brand text-uui-text-brand" : "border-uui-border-default text-uui-text-tertiary"}`}
        >
          {tab.text}
        </button>
      ))}
    </Container>
  );
}
