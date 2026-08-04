import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";
import { Dialog } from "./Dialog";
import { Checkbox, Dropdown, Radio, TextField } from "./Input";
import Pagination from "./Pagination";
import { TabBar } from "./Tab";

describe("design-system accessibility", () => {
  it("has no detectable violations in interactive components", async () => {
    const { container } = render(
      <>
        <Button icon="add" aria-label="항목 추가" property="brand" />
        <TextField aria-label="비밀번호" type="password" value="secret123" onChange={() => undefined} />
        <Dropdown optionList={[{ id: 1, name: "서울" }]} />
        <Radio id="radio" value="동의" checked onChange={() => undefined} />
        <Checkbox id="checkbox" value="선택" checked onChange={() => undefined} />
        <Pagination currentPageIndex={0} totalPageCnt={2} />
        <TabBar tabList={[{ text: "상품" }, { text: "후기" }]} selected={{ text: "상품" }} />
        <Dialog title="삭제 확인" messages="되돌릴 수 없습니다" btns={[{ text: "취소" }]} />
      </>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no detectable violations for an open dialog and dropdown", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <>
        <Dropdown aria-label="도시" optionList={[{ id: 1, name: "서울" }]} />
        <Dialog title="삭제 확인" messages="되돌릴 수 없습니다" btns={[{ text: "취소" }]} />
      </>,
    );

    await user.click(screen.getByRole("combobox", { name: "도시" }));

    expect(await axe(container)).toHaveNoViolations();
  });
});
