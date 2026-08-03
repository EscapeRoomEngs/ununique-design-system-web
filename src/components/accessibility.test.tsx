import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Dialog } from "./Dialog";
import { Checkbox, Dropdown, Radio, TextField } from "./Input";
import Pagination from "./Pagination";
import { TabBar } from "./Tab";

describe("design-system accessibility", () => {
  it("has no detectable violations in interactive components", async () => {
    const { container } = render(
      <>
        <TextField aria-label="이름" value="" onChange={() => undefined} />
        <Dropdown optionList={[{ id: 1, name: "서울" }]} />
        <Radio id="radio" value="동의" checked={false} onChange={() => undefined} />
        <Checkbox id="checkbox" value="선택" checked={false} onChange={() => undefined} />
        <Pagination currentPageIndex={0} totalPageCnt={2} />
        <TabBar tabList={[{ text: "상품" }, { text: "후기" }]} selected={{ text: "상품" }} />
        <Dialog title="삭제 확인" messages="되돌릴 수 없습니다" btns={[{ text: "취소" }]} />
      </>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
