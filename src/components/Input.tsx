import { ButtonHTMLAttributes, InputHTMLAttributes, KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { Icon } from "../atom/Icon";
import { Body, Lable } from "../atom/Text";

const widths = { Small: "w-[328px]", Medium: "w-[440px]", Large: "w-[672px]" };
type InputSize = keyof typeof widths;

export interface TextFieldsProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
  value: string;
  onChange?: (value: string) => void;
  isError?: () => boolean;
  size?: InputSize;
}

export function TextField({ size = "Small", type = "text", placeholder = "입력", disabled = false, value = "", maxLength = 1000, onChange, isError, "aria-invalid": ariaInvalid, ...props }: TextFieldsProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const textType = type === "password" && isPasswordVisible ? "text" : type;
  const error = isError?.() ?? false;

  return <div className={`${widths[size]} flex h-11 items-center gap-4 rounded border bg-uui-surface-primary px-[15px] py-3 ${error ? "border-uui-border-negative" : "border-uui-border-default focus-within:border-uui-focus-brand has-[:focus-visible]:outline-solid has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-uui-focus-brand"} ${disabled ? "bg-uui-surface-tertiary" : ""}`}>
    <input {...props} aria-invalid={error ? true : ariaInvalid} type={textType} value={value} disabled={disabled} placeholder={placeholder} className="min-w-0 flex-1 border-0 bg-transparent text-sm leading-[1.3] text-uui-text-primary outline-none placeholder:text-uui-text-tertiary disabled:text-uui-text-secondary" onChange={(event) => onChange?.(event.target.value.slice(0, maxLength))} />
    {!disabled && value && <div className="flex items-center gap-1">
      {type === "password" && <button aria-label="비밀번호 표시 전환" type="button" className="grid size-5 cursor-pointer place-items-center rounded bg-transparent focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-uui-focus-brand" onMouseDown={(event) => event.preventDefault()} onClick={() => setPasswordVisible((visible) => !visible)}><Icon iconNm={isPasswordVisible ? "visible" : "invisible"} iconSize={16} iconColor="tertiary" /></button>}
      <button aria-label="입력 지우기" type="button" className="grid size-5 cursor-pointer place-items-center rounded bg-transparent focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-uui-focus-brand" onMouseDown={(event) => event.preventDefault()} onClick={() => onChange?.("")}><Icon iconNm="close" iconSize={16} iconColor="tertiary" /></button>
    </div>}
  </div>;
}

export type DropdownOption = Record<string, string | number>;
export interface DropdownProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  keyValue?: { id: string; name: string };
  optionList?: DropdownOption[];
  selected?: DropdownOption;
  onChange?: (value: DropdownOption) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: InputSize;
}

export function Dropdown({ size = "Small", selected = {}, placeholder = "선택", keyValue = { id: "id", name: "name" }, optionList = [], disabled = false, onChange, onClick, onKeyDown, className, id, ...props }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const generatedId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const triggerId = id ?? `${generatedId}-trigger`;
  const listboxId = `${generatedId}-listbox`;
  const label = selected[keyValue.name];
  const accessibleLabel = props["aria-label"] ?? (props["aria-labelledby"] ? undefined : String(label ?? placeholder));
  const isUnavailable = disabled || !optionList.length;
  const selectedIndex = optionList.findIndex((option) => option[keyValue.id] === selected[keyValue.id]);
  const initialIndex = selectedIndex >= 0 ? selectedIndex : 0;

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    optionRefs.current[activeIndex]?.scrollIntoView?.({ block: "nearest" });
  }, [activeIndex, open]);

  const openListbox = (index = initialIndex) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const selectOption = (index: number, restoreFocus = true) => {
    const option = optionList[index];
    if (!option) return;
    onChange?.(option);
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openListbox();
        else setActiveIndex((current) => (current + 1) % optionList.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openListbox(optionList.length - 1);
        else setActiveIndex((current) => (current - 1 + optionList.length) % optionList.length);
        break;
      case "Home":
        event.preventDefault();
        if (!open) openListbox(0);
        else setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        if (!open) openListbox(optionList.length - 1);
        else setActiveIndex(optionList.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) selectOption(activeIndex);
        else openListbox();
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        if (open) selectOption(activeIndex, false);
        break;
    }
  };

  return <div className={`${widths[size]} relative`}>
    <button {...props} ref={triggerRef} id={triggerId} role="combobox" type="button" disabled={isUnavailable} aria-label={accessibleLabel} aria-expanded={open} aria-haspopup="listbox" aria-controls={listboxId} aria-activedescendant={open && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined} className={`${widths[size]} flex h-11 items-center justify-between rounded border ${open ? "border-uui-focus-brand" : "border-uui-border-default"} bg-uui-surface-primary px-[15px] py-3 focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-uui-focus-brand ${isUnavailable ? "bg-uui-surface-tertiary text-uui-text-secondary" : "cursor-pointer"} ${className ?? ""}`} onClick={(event) => {
      onClick?.(event);
      if (!event.defaultPrevented) {
        if (open) setOpen(false);
        else openListbox();
      }
    }} onKeyDown={handleKeyDown}>
      <Body fontColor={label === undefined ? "tertiary" : undefined}>{label ?? placeholder}</Body>
      <span aria-hidden="true" className="grid size-5 place-items-center rounded bg-transparent"><Icon iconNm={open ? "chevronLess" : "chevronMore"} iconSize={16} iconColor="secondary" /></span>
    </button>
    {open && <div id={listboxId} role="listbox" className="absolute top-12 left-0 z-10 max-h-52 w-full overflow-auto rounded border border-uui-border-tertiary bg-uui-surface-primary">{optionList.map((option, index) => <div ref={(element) => { optionRefs.current[index] = element; }} id={`${listboxId}-option-${index}`} role="option" aria-selected={selectedIndex === index} className={`block h-11 w-full cursor-pointer px-[15px] py-3 text-left hover:bg-uui-surface-secondary active:bg-uui-surface-tertiary focus-visible:outline-2 focus-visible:outline-uui-focus-brand ${activeIndex === index ? "bg-uui-surface-secondary" : "bg-transparent"}`} key={String(option[keyValue.id])} onMouseEnter={() => setActiveIndex(index)} onMouseDown={(event) => event.preventDefault()} onClick={() => selectOption(index)}><Body>{option[keyValue.name] ?? "-"}</Body></div>)}</div>}
  </div>;
}

export interface ChoiceProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> { id: string; value: string; checked: boolean; onChange?: (value: string) => void; color?: string; required?: boolean; }
export function Radio({ value, checked, disabled, color = "negative", required, onChange, ...props }: ChoiceProps) { return <label className={`flex cursor-pointer items-center gap-2 py-2.5 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-uui-focus-brand ${disabled ? "cursor-not-allowed" : ""}`}><input className="sr-only" type="radio" checked={checked} disabled={disabled} onChange={() => onChange?.(value)} {...props}/><Icon iconNm={checked ? "radio" : "unchecked"} iconColor={color} iconColorHex={color}/><Lable weight={400} required={required}>{value}</Lable></label>; }
export function Checkbox({ value, checked, disabled, color = "negative", required, onChange, isSquared = false, ...props }: ChoiceProps & { isSquared?: boolean }) { return <label className={`flex cursor-pointer items-center gap-2 py-2.5 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-uui-focus-brand ${disabled ? "cursor-not-allowed" : ""}`}><input className="sr-only" type="checkbox" checked={checked} disabled={disabled} onChange={() => onChange?.(value)} {...props}/><Icon iconNm={isSquared ? (checked ? "checkedSquare" : "uncheckedSquare") : (checked ? "checked" : "unchecked")} iconColor={color} iconColorHex={color}/><Lable weight={400} required={required}>{value}</Lable></label>; }
