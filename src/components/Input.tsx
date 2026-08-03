import { InputHTMLAttributes, useState } from "react";
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

export function TextField({ size = "Small", type = "text", placeholder = "입력", disabled = false, value = "", maxLength = 1000, onChange, isError, ...props }: TextFieldsProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const textType = type === "password" && isPasswordVisible ? "text" : type;
  const error = isError?.() ?? false;

  return <div className={`${widths[size]} flex h-11 items-center gap-4 rounded border bg-uui-surface-primary px-[15px] py-3 ${error ? "border-uui-border-negative" : "border-uui-border-default focus-within:border-uui-border-tertiary"} ${disabled ? "bg-uui-surface-tertiary" : ""}`}>
    <input {...props} type={textType} value={value} disabled={disabled} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-sm leading-[1.3] text-uui-text-primary outline-none placeholder:text-uui-text-tertiary disabled:text-uui-text-secondary" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={(event) => onChange?.(event.target.value.slice(0, maxLength))} />
    {!disabled && focused && value && <div className="flex items-center gap-1">
      {type === "password" && <button aria-label="비밀번호 표시 전환" type="button" className="grid size-5 cursor-pointer place-items-center" onMouseDown={(event) => event.preventDefault()} onClick={() => setPasswordVisible((visible) => !visible)}><Icon iconNm={isPasswordVisible ? "visible" : "invisible"} iconSize={16} iconColor="tertiary" /></button>}
      <button aria-label="입력 지우기" type="button" className="grid size-5 cursor-pointer place-items-center" onMouseDown={(event) => event.preventDefault()} onClick={() => onChange?.("")}><Icon iconNm="close" iconSize={16} iconColor="tertiary" /></button>
    </div>}
  </div>;
}

export type DropdownOption = Record<string, string | number>;
export interface DropdownProps {
  keyValue?: { id: string; name: string };
  optionList?: DropdownOption[];
  selected?: DropdownOption;
  onChange?: (value: DropdownOption) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: InputSize;
}

export function Dropdown({ size = "Small", selected = {}, placeholder = "선택", keyValue = { id: "id", name: "name" }, optionList = [], disabled = false, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const label = selected[keyValue.name];

  return <div className={`${widths[size]} relative flex h-11 items-center justify-between rounded border ${open ? "border-uui-border-tertiary" : "border-uui-border-default"} bg-uui-surface-primary px-[15px] py-3 ${disabled || !optionList.length ? "bg-uui-surface-tertiary text-uui-text-secondary" : "cursor-pointer"}`}>
    <Body fontColor={label === undefined ? "tertiary" : undefined}>{label ?? placeholder}</Body>
    <button aria-expanded={open} aria-haspopup="listbox" aria-label={open ? "옵션 목록 닫기" : "옵션 목록 열기"} disabled={disabled || !optionList.length} type="button" className="grid size-5 cursor-pointer place-items-center disabled:cursor-not-allowed" onClick={() => setOpen((current) => !current)}><Icon iconNm={open ? "chevronLess" : "chevronMore"} iconSize={16} iconColor="secondary" /></button>
    {open && <div role="listbox" className="absolute top-12 left-0 z-10 max-h-52 w-full overflow-auto rounded border border-uui-border-tertiary bg-uui-surface-primary">{optionList.map((option) => <button type="button" className="block h-11 w-full px-[15px] py-3 text-left hover:bg-uui-surface-negative" key={String(option[keyValue.id])} onClick={() => { onChange?.(option); setOpen(false); }}><Body>{option[keyValue.name] ?? "-"}</Body></button>)}</div>}
  </div>;
}

export interface ChoiceProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> { id: string; value: string; checked: boolean; onChange?: (value: string) => void; color?: string; required?: boolean; }
export function Radio({ value, checked, disabled, color = "negative", required, onChange, ...props }: ChoiceProps) { return <label className={`flex cursor-pointer items-center gap-2 py-2.5 ${disabled ? "cursor-not-allowed" : ""}`}><input className="sr-only" type="radio" checked={checked} disabled={disabled} onChange={() => onChange?.(value)} {...props}/><Icon iconNm={checked ? "radio" : "unchecked"} iconColor={color} iconColorHex={color}/><Lable weight={400} required={required}>{value}</Lable></label>; }
export function Checkbox({ value, checked, disabled, color = "negative", required, onChange, isSquared = false, ...props }: ChoiceProps & { isSquared?: boolean }) { return <label className={`flex cursor-pointer items-center gap-2 py-2.5 ${disabled ? "cursor-not-allowed" : ""}`}><input className="sr-only" type="checkbox" checked={checked} disabled={disabled} onChange={() => onChange?.(value)} {...props}/><Icon iconNm={isSquared ? (checked ? "checkedSquare" : "uncheckedSquare") : (checked ? "checked" : "unchecked")} iconColor={color} iconColorHex={color}/><Lable weight={400} required={required}>{value}</Lable></label>; }
