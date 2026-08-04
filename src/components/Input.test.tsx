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

  it("keeps the legacy one-pixel field border and uses a thin keyboard focus indicator", () => {
    render(<TextField aria-label="비밀번호" type="password" value="abc" />);

    const input = screen.getByLabelText("비밀번호");
    const field = input.parentElement;

    expect(input).toHaveClass("border-0", "outline-none");
    expect(field).toHaveClass(
      "border",
      "focus-within:border-uui-focus-brand",
      "has-[:focus-visible]:outline-solid",
      "has-[:focus-visible]:outline-1",
      "has-[:focus-visible]:outline-uui-focus-brand",
    );
    expect(screen.getByRole("button", { name: "비밀번호 표시 전환" })).toHaveClass(
      "bg-transparent",
      "rounded",
      "focus-visible:outline-solid",
      "focus-visible:outline-1",
      "focus-visible:outline-uui-focus-brand",
    );
  });

  it("sets error semantics while preserving described-by references", () => {
    render(<TextField aria-describedby="email-help" aria-invalid="grammar" aria-label="오류 입력" value="" isError={() => true} />);

    expect(screen.getByLabelText("오류 입력")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("오류 입력")).toHaveAttribute("aria-describedby", "email-help");
  });

  it("preserves consumer aria-invalid values when the field has no error", () => {
    render(
      <>
        <TextField aria-invalid aria-label="검증 입력" value="" />
        <TextField aria-invalid="grammar" aria-label="문법 입력" value="" />
      </>,
    );

    expect(screen.getByLabelText("검증 입력")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("문법 입력")).toHaveAttribute("aria-invalid", "grammar");
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
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "서울" }));

    expect(onChange).toHaveBeenCalledWith(option);
  });

  it("selects the active dropdown option with the keyboard", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Dropdown aria-label="도시" optionList={[{ id: 1, name: "서울" }, { id: 2, name: "부산" }]} onChange={onChange} />);
    const trigger = screen.getByRole("combobox", { name: "도시" });

    await user.click(trigger);
    await user.keyboard("{ArrowDown}{Enter}");

    expect(onChange).toHaveBeenCalledWith({ id: 2, name: "부산" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("moves the active dropdown option upward and applies semantic active styling", async () => {
    const user = userEvent.setup();
    render(<Dropdown aria-label="도시" optionList={[{ id: 1, name: "서울" }, { id: 2, name: "부산" }]} />);
    const trigger = screen.getByRole("combobox", { name: "도시" });

    await user.click(trigger);
    await user.keyboard("{ArrowUp}");

    const first = screen.getByRole("option", { name: "서울" });
    const active = screen.getByRole("option", { name: "부산" });
    expect(trigger).toHaveAttribute("aria-activedescendant", active.id);
    expect(active).toHaveClass("bg-uui-surface-secondary");
    expect(first).toHaveClass("bg-transparent");
  });

  it("scrolls the keyboard-active dropdown option into view", async () => {
    const user = userEvent.setup();
    render(<Dropdown aria-label="도시" optionList={[{ id: 1, name: "서울" }, { id: 2, name: "부산" }]} />);
    const trigger = screen.getByRole("combobox", { name: "도시" });

    await user.click(trigger);
    const active = screen.getByRole("option", { name: "부산" });
    const scrollIntoView = vi.fn();
    Object.defineProperty(active, "scrollIntoView", { configurable: true, value: scrollIntoView });
    await user.keyboard("{ArrowUp}");

    expect(scrollIntoView).toHaveBeenCalledWith({ block: "nearest" });
  });

  it("connects the combobox to its active listbox option and forwards native labels", async () => {
    const user = userEvent.setup();
    render(<Dropdown id="city" aria-label="도시" aria-describedby="city-help" selected={{ id: 1, name: "서울" }} optionList={[{ id: 1, name: "서울" }, { id: 2, name: "부산" }]} />);
    const trigger = screen.getByRole("combobox", { name: "도시" });

    expect(trigger).toHaveAttribute("id", "city");
    expect(trigger).toHaveAttribute("aria-describedby", "city-help");
    expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
    await user.click(trigger);

    const listbox = screen.getByRole("listbox");
    const selectedOption = screen.getByRole("option", { name: "서울" });
    expect(trigger).toHaveAttribute("aria-controls", listbox.id);
    expect(trigger).toHaveAttribute("aria-activedescendant", selectedOption.id);
    expect(selectedOption).toHaveAttribute("aria-selected", "true");
    expect(trigger).toHaveFocus();
  });

  it("uses the displayed placeholder as its fallback accessible name", () => {
    render(<Dropdown optionList={[{ id: 1, name: "서울" }]} />);

    expect(screen.getByRole("combobox", { name: "선택" })).toBeInTheDocument();
  });

  it("supports Home, End, Space, and Escape while focus remains on the trigger", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Dropdown aria-label="도시" optionList={[{ id: 1, name: "서울" }, { id: 2, name: "부산" }, { id: 3, name: "제주" }]} onChange={onChange} />);
    const trigger = screen.getByRole("combobox", { name: "도시" });

    await user.click(trigger);
    await user.keyboard("{End} ");
    expect(onChange).toHaveBeenLastCalledWith({ id: 3, name: "제주" });
    expect(trigger).toHaveFocus();

    await user.keyboard(" ");
    await user.keyboard("{Home}{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("commits the keyboard-active option on Tab and moves focus forward", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <>
        <Dropdown aria-label="도시" optionList={[{ id: 1, name: "서울" }, { id: 2, name: "부산" }]} onChange={onChange} />
        <button type="button">다음 제어</button>
      </>,
    );
    const trigger = screen.getByRole("combobox", { name: "도시" });

    await user.click(trigger);
    await user.keyboard("{ArrowDown}");
    await user.tab();

    expect(onChange).toHaveBeenCalledWith({ id: 2, name: "부산" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button", { name: "다음 제어" })).toHaveFocus();
  });

  it("uses neutral option hover and semantic focus-visible states", async () => {
    const user = userEvent.setup();
    render(<Dropdown optionList={[{ id: 1, name: "서울" }, { id: 2, name: "부산" }]} />);

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("option", { name: "부산" })).toHaveClass(
      "bg-transparent",
      "hover:bg-uui-surface-secondary",
      "active:bg-uui-surface-tertiary",
      "focus-visible:outline-2",
      "focus-visible:outline-uui-focus-brand",
    );
  });

  it("uses a thin keyboard focus indicator and no thick outline when open", async () => {
    const user = userEvent.setup();
    render(<Dropdown optionList={[{ id: 1, name: "서울" }]} />);
    const trigger = screen.getByRole("combobox");

    expect(trigger).toHaveClass(
      "border",
      "focus-visible:outline-solid",
      "focus-visible:outline-1",
      "focus-visible:outline-offset-1",
      "focus-visible:outline-uui-focus-brand",
    );

    await user.click(trigger);
    expect(trigger).toHaveClass("border-uui-focus-brand");
    expect(trigger).not.toHaveClass("outline-2");
  });

  it("preserves the legacy trigger and option padding", async () => {
    const user = userEvent.setup();
    render(<Dropdown optionList={[{ id: 1, name: "서울" }]} />);

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveClass("w-[328px]", "h-11", "px-[15px]", "py-3", "cursor-pointer");

    await user.click(trigger);
    expect(screen.getByRole("option", { name: "서울" })).toHaveClass("h-11", "px-[15px]", "py-3");
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

  it("keeps the legacy negative defaults and exposes focus-visible styling through choice labels", () => {
    const { container } = render(<><Radio id="radio" value="동의" checked={false} /><Checkbox id="checkbox" value="선택" checked={false} /></>);

    expect(container.querySelectorAll("svg")[0]).toHaveAttribute("fill", "#ff4053");
    expect(container.querySelectorAll("svg")[1]).toHaveAttribute("fill", "#ff4053");
    for (const label of [screen.getByRole("radio").closest("label"), screen.getByRole("checkbox").closest("label")]) {
      expect(label).toHaveClass("has-[:focus-visible]:outline-2", "has-[:focus-visible]:outline-uui-focus-brand");
    }
  });

  it("uses the runtime brand surface only when a choice explicitly requests brand color", () => {
    const { container } = render(<><Radio id="radio-brand" value="브랜드 선택" checked color="brand" /><Checkbox id="checkbox-brand" value="브랜드 확인" checked color="brand" /></>);

    expect(container.querySelectorAll("svg")[0]).toHaveAttribute("fill", "var(--uui-semantic-surface-brand)");
    expect(container.querySelectorAll("svg")[1]).toHaveAttribute("fill", "var(--uui-semantic-surface-brand)");
  });
});
