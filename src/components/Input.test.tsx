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

  it("uses a two-pixel field border and transparent icon controls", () => {
    render(<TextField aria-label="비밀번호" type="password" value="abc" />);

    const field = screen.getByLabelText("비밀번호").parentElement;
    expect(field).toHaveClass(
      "border-2",
      "focus-within:border-uui-focus-brand",
      "focus-within:outline-2",
      "focus-within:outline-uui-focus-brand",
    );
    expect(screen.getByRole("button", { name: "비밀번호 표시 전환" })).toHaveClass(
      "bg-transparent",
      "rounded",
      "focus-visible:outline-2",
      "focus-visible:outline-uui-focus-brand",
    );
  });

  it("sets error semantics while preserving described-by references", () => {
    render(<TextField aria-describedby="email-help" aria-label="오류 입력" value="" isError={() => true} />);

    expect(screen.getByLabelText("오류 입력")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("오류 입력")).toHaveAttribute("aria-describedby", "email-help");
  });

  it("preserves the legacy field dimensions and padding", () => {
    render(<TextField aria-label="입력" value="" />);

    expect(screen.getByLabelText("입력").parentElement).toHaveClass("w-[328px]", "h-11", "px-[15px]", "py-3", "rounded", "gap-4");
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

  it("uses neutral option hover and semantic focus-visible states", async () => {
    const user = userEvent.setup();
    render(<Dropdown optionList={[{ id: 1, name: "서울" }]} />);

    await user.click(screen.getByRole("button", { name: "옵션 목록 열기" }));
    expect(screen.getByRole("button", { name: "서울" })).toHaveClass(
      "hover:bg-uui-surface-secondary",
      "active:bg-uui-surface-tertiary",
      "focus-visible:outline-2",
      "focus-visible:outline-uui-focus-brand",
    );
  });

  it("preserves the legacy trigger and option padding", async () => {
    const user = userEvent.setup();
    render(<Dropdown optionList={[{ id: 1, name: "서울" }]} />);

    const trigger = screen.getByRole("button", { name: "옵션 목록 열기" });
    expect(trigger.parentElement).toHaveClass("w-[328px]", "h-11", "px-[15px]", "py-3", "cursor-pointer");

    await user.click(trigger);
    expect(screen.getByRole("button", { name: "서울" })).toHaveClass("h-11", "px-[15px]", "py-3");
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

  it("keeps disabled choices opaque like the legacy controls", () => {
    render(<Checkbox id="checkbox" value="선택" checked={false} disabled onChange={vi.fn()} />);

    expect(screen.getByRole("checkbox", { name: "선택" }).closest("label")).toHaveClass("cursor-not-allowed");
    expect(screen.getByRole("checkbox", { name: "선택" }).closest("label")).not.toHaveClass("opacity-60");
  });

  it("uses brand defaults and exposes focus-visible styling through choice labels", () => {
    const { container } = render(<><Radio id="radio" value="동의" checked={false} /><Checkbox id="checkbox" value="선택" checked={false} /></>);

    expect(container.querySelectorAll("svg")[0]).toHaveAttribute("fill", "var(--uui-semantic-text-brand)");
    expect(container.querySelectorAll("svg")[1]).toHaveAttribute("fill", "var(--uui-semantic-text-brand)");
    for (const label of [screen.getByRole("radio").closest("label"), screen.getByRole("checkbox").closest("label")]) {
      expect(label).toHaveClass("has-[:focus-visible]:outline-2", "has-[:focus-visible]:outline-uui-focus-brand");
    }
  });
});
