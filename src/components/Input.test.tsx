import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox, Dropdown, Radio, TextField } from "./Input";

function TextFieldHarness() {
  const [value, setValue] = useState("");

  return <TextField aria-label="비밀번호" type="password" value={value} maxLength={3} onChange={setValue} />;
}

describe("TextField", () => {
  it("limits input, toggles password visibility, and clears the value", async () => {
    const user = userEvent.setup();
    render(<TextFieldHarness />);
    const input = screen.getByLabelText("비밀번호");

    await user.type(input, "abcd");
    expect(input).toHaveValue("abc");

    await user.click(screen.getByRole("button", { name: "비밀번호 표시 전환" }));
    expect(input).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: "입력 지우기" }));
    expect(input).toHaveValue("");
  });

  it("uses the negative border token for errors", () => {
    render(<TextField aria-label="오류 입력" value="" isError={() => true} />);

    expect(screen.getByLabelText("오류 입력").parentElement).toHaveClass("border-uui-border-negative");
  });
});

describe("Dropdown", () => {
  it("opens options and emits the selected value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const option = { id: 1, name: "서울" };

    render(<Dropdown optionList={[option]} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "옵션 목록 열기" }));
    await user.click(screen.getByRole("button", { name: "서울" }));

    expect(onChange).toHaveBeenCalledWith(option);
  });

  it("uses the negative surface token for option hover", async () => {
    const user = userEvent.setup();
    render(<Dropdown optionList={[{ id: 1, name: "서울" }]} />);

    await user.click(screen.getByRole("button", { name: "옵션 목록 열기" }));
    expect(screen.getByRole("button", { name: "서울" })).toHaveClass("hover:bg-uui-surface-negative");
  });
});

describe("Radio and Checkbox", () => {
  it("emits selection changes and keeps disabled controls unavailable", async () => {
    const user = userEvent.setup();
    const onRadioChange = vi.fn();

    render(<><Radio id="radio" value="동의" checked={false} onChange={onRadioChange} /><Checkbox id="checkbox" value="선택" checked={false} disabled onChange={vi.fn()} /></>);
    await user.click(screen.getByRole("radio", { name: "동의" }));

    expect(onRadioChange).toHaveBeenCalledWith("동의");
    expect(screen.getByRole("checkbox", { name: "선택" })).toBeDisabled();
  });
});
