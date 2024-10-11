import styled from "styled-components";
import { Container } from "../atom/Container";
import { Icon } from "../atom/Icon";

export interface PaginationProps {
  currentPageIndex?: number;
  totalPageCnt?: number;
  onPageChange?: (v: any) => void;
}
export default function Pagination({
  currentPageIndex = 0,
  totalPageCnt = 0,
  onPageChange,
}: PaginationProps) {
  // const [inputValue, setValue] = useState(currentPageIndex.toString());
  const IconWrapper = styled(Container)`
    cursor: pointer;
  `;
  // const PageInputWrapper = styled.div`
  //   :not(:focus-within) {
  //     border-radius: 8px;
  //     border: 1px solid var(--gray-300, #d1d1d1);
  //   }
  //   :focus-within {
  //     border-radius: 8px;
  //     border: 1px solid var(--gray-900, #232527);
  //   }
  // `;
  // const PageInput = styled.input`
  //   background-color: transparent;
  //   text-align: center;
  //   padding: 8px 10px;
  //   height: 40px;
  //   width: 68px;
  //   outline: 0;
  // `;
  function onChangePageIdx(newIdx: any) {
    if (isNaN(newIdx) || !onPageChange) return;
    if (newIdx < 0) onPageChange(0);
    else if (newIdx >= totalPageCnt) onPageChange(totalPageCnt - 1);
    else onPageChange(newIdx);
  }
  return (
    <Container display="flex" spacing={16} align="center">
      <IconWrapper
        display="flex"
        align="center"
        onClick={() => onChangePageIdx(currentPageIndex - 1)}
      >
        <Icon iconNm="chevronLeft" iconColor={currentPageIndex > 0 ? "primary" : "tertiary"} />
      </IconWrapper>
      {/* <PageInputWrapper>
        <PageInput
          type="number"
          min={1}
          value={Number(inputValue) + 1}
          onChange={(e: ChangeEvent) => setValue((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => e.key === "Enter" && onChangePageIdx(Number(inputValue))}
        />
      </PageInputWrapper> */}
      <p>{currentPageIndex + 1}</p>
      <p>/</p>
      <p>{totalPageCnt}</p>
      <IconWrapper
        display="flex"
        align="center"
        onClick={() => onChangePageIdx(currentPageIndex + 1)}
      >
        <Icon
          iconNm="chevronRight"
          iconColor={totalPageCnt - 1 > currentPageIndex ? "primary" : "tertiary"}
        />
      </IconWrapper>
    </Container>
  );
}
