import { Icon } from "../atom/Icon";
import { ChangeEvent, useState } from "react";

export interface PaginationProps {
  currentPageIndex?: number;
  totalPageCnt?: number;
  onPageChange?: (value: number) => void;
}
export default function Pagination({
  currentPageIndex = 0,
  totalPageCnt = 0,
  onPageChange,
}: PaginationProps) {
  const isFirstPage = currentPageIndex <= 0;
  const isLastPage = totalPageCnt === 0 || currentPageIndex >= totalPageCnt - 1;
  const [inputState, setInputState] = useState({ pageIndex: currentPageIndex, value: currentPageIndex + 1 });
  const inputValue = inputState.pageIndex === currentPageIndex ? inputState.value : currentPageIndex + 1;

  function onChangePageIdx(newIdx: number) {
    if (Number.isNaN(newIdx) || totalPageCnt < 1) return;
    let result = newIdx;
    if (newIdx < 1) result = 1;
    else if (newIdx > totalPageCnt) result = totalPageCnt;
    setInputState({ pageIndex: currentPageIndex, value: result });
    if (result - 1 !== currentPageIndex) onPageChange?.(result - 1);
  }
  return (
      <nav aria-label="페이지 탐색" className="flex items-center justify-center gap-4">
        <button aria-label="이전 페이지" disabled={isFirstPage} type="button" className="cursor-pointer focus-visible:outline-2 focus-visible:outline-uui-focus-brand disabled:cursor-not-allowed" onClick={() => onChangePageIdx(inputValue - 1)}>
          <Icon iconNm="chevronLeft" iconColor={currentPageIndex > 0 ? "primary" : "tertiary"} />
        </button>
        <div className="rounded-lg border border-uui-border-default focus-within:border-uui-text-primary">
          <input
            aria-label="현재 페이지" type="text" className="h-10 w-[68px] bg-transparent px-2.5 py-2 text-center outline-none focus-visible:outline-2 focus-visible:outline-uui-focus-brand"
            value={inputValue}
            onChange={(e: ChangeEvent) =>
              setInputState({ pageIndex: currentPageIndex, value: Number((e.target as HTMLInputElement).value.replaceAll(/[^0-9]/g, "")) })
            }
            onKeyDown={(e) => e.key === "Enter" && onChangePageIdx(inputValue)}
            onBlur={() => onChangePageIdx(inputValue)}
          />
        </div>
        <p>/</p>
        <p>{totalPageCnt}</p>
        <button aria-label="다음 페이지" disabled={isLastPage} type="button" className="cursor-pointer focus-visible:outline-2 focus-visible:outline-uui-focus-brand disabled:cursor-not-allowed" onClick={() => onChangePageIdx(inputValue + 1)}>
          <Icon
            iconNm="chevronRight"
            iconColor={totalPageCnt - 1 > currentPageIndex ? "primary" : "tertiary"}
          />
        </button>
      </nav>
  );
}
