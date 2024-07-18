import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Unchecked from "../assets/icon/check_false.svg";
import UncheckedSquare from "../assets/icon/check_square_false.svg";
import CheckedSquare from "../assets/icon/check_square_true.svg";
import Checked from "../assets/icon/check_true.svg";
import RadioActive from "../assets/icon/radio.svg";
import { Container } from "../atom/Container";
import { Icon } from "../atom/Icon";
import { Body } from "../atom/Text";
import { color } from "../foundation/color";
import { layout, radius } from "../foundation/layout";

interface TextFieldsProps {
  /**
   * Text Field 타입을 지정합니다.
   */
  type?: "text" | "password";
  /**
   * Text Field 입력값을 연결합니다.
   */
  value: string;
  /**
   * Text Field 입력값 수정 시 이벤트를 연결합니다.
   * @param value
   * @returns
   */
  onChange?: (value: any) => void;
  /**
   * Text Field 에러 표시를 위한 유효성 검사 함수를 연결합니다.
   * @returns {boolean}
   */
  isError?: () => boolean;
  /**
   * Text Field Placeholder를 지정합니다.
   */
  placeholder?: string;
  /**
   * Text Field 비활성화 여부를 지정합니다.
   */
  disabled?: boolean;
  /**
   * Text Field 크기를 지정합니다.
   */
  size?: "Small" | "Medium" | "Large";
}
export function TextField({
  size = "Small",
  type = "text",
  placeholder = "입력",
  disabled = false,
  value = "",
  onChange,
  isError,
  ...props
}: TextFieldsProps) {
  const [textType, setTextType] = useState(type);

  useEffect(() => setTextType(type), [type]);

  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (inputRef.current) setFocused(inputRef.current.contains(e.target as HTMLElement));
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [inputRef]);

  const Sizes = { Small: 328, Medium: 440, Large: 672 };
  const Wrapper = styled.form`
    width: ${Sizes[size]}px;
    height: 44px;
    padding: 12px 15px;
    border-radius: ${radius[1]}px;
    border: 1px solid ${color.border.default.hex};
    background-color: ${color.surface.primary.hex};
    ${layout.flex({ justify: "space-between", spacing: 16 })}
    &> input {
      color: ${color.text.primary.hex};
    }
    &:has(input:focus) {
      border-color: ${color.border.tertiary.hex};
    }
    &:has(input.error) {
      border-color: ${color.border.negative.hex};
    }
    ${disabled
      ? `background-color: ${color.surface.tertiary.hex}; 
      &> input {color: ${color.text.secondary.hex};}`
      : ""}
  `;
  const StyledInput = styled.input`
    background: transparent;
    width: inherit;
    height: 18px;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 14px;
    line-height: 18px; /* 128.571% */
  `;
  const StyledIconContainer = styled.button`
    ${layout.grid({ justify: "center" })}
    border-radius: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: transparent;
  `;
  return (
    <Wrapper onSubmit={(e) => e.preventDefault()} ref={inputRef}>
      <StyledInput
        className={isError && isError() ? "error" : ""}
        {...{ ...props, type: textType, value, placeholder, disabled }}
        onChange={(e) => onChange && onChange(e.target.value)}
        onClick={() => setFocused(true)}
      />
      {!disabled && focused && value?.length > 0 && (
        <Container display="flex">
          {type === "password" && (
            <StyledIconContainer
              type="button"
              onClick={() => setTextType(textType === "text" ? "password" : "text")}
            >
              <Icon
                iconNm={textType === "text" ? "invisible" : "visible"}
                iconSize={16}
                iconColor="secondary"
              />
            </StyledIconContainer>
          )}
          <StyledIconContainer type="reset" onClick={() => onChange && onChange("")}>
            <Icon iconNm="close" iconSize={16} iconColor="secondary" />
          </StyledIconContainer>
        </Container>
      )}
    </Wrapper>
  );
}
interface DropdownProps {
  /**
   * 드롭다운 옵션의 key, value를 지정합니다.
   */
  keyValue?: { id: string; name: string };
  /**
   * 드롭다운 옵션 목록을 지정합니다.
   */
  optionList?: object[];
  /**
   * 드롭다운 선택값을 연결합니다.
   */
  selected?: object;
  /**
   * 드롭다운 선택값 변경 시 이벤트를 지정합니다.
   */
  onChange?: (value: any) => void;
  /**
   * 드롭다운 Placeholder를 지정합니다.
   */
  placeholder?: string;
  /**
   * 드롭다운 비활성화 여부를 지정합니다.
   */
  disabled?: boolean;
  /**
   * 드롭다운 크기를 지정합니다.
   */
  size?: "Small" | "Medium" | "Large";
}
export function Dropdown({
  size = "Small",
  selected = {},
  placeholder = "선택",
  keyValue = { id: "id", name: "name" },
  optionList = [],
  disabled = false,
  onChange,
}: DropdownProps) {
  const [value, setValue] = useState(selected);

  useEffect(() => setValue(selected), [selected]);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current) setIsOpen(dropdownRef.current.contains(e.target as HTMLElement));
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [dropdownRef]);

  const Sizes = { Small: 328, Medium: 440, Large: 672 };
  const Wrapper = styled.div`
    width: ${Sizes[size]}px;
    height: 44px;
    padding: 12px 15px;
    border-radius: ${radius[1]}px;
    border: 1px solid ${color.border[disabled ? "invert" : isOpen ? "tertiary" : "default"].hex};
    background-color: ${color.surface.primary.hex};
    ${layout.flex({ justify: "space-between", spacing: 16 })}
    ${disabled
      ? `background-color: ${color.surface.tertiary.hex}; 
      color: ${color.text.secondary.hex};`
      : ""}
  `;
  const StyledSelect = styled.p`
    background: transparent;
    width: inherit;
    height: 18px;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 14px;
    line-height: 18px; /* 128.571% */
  `;
  const StyledIconContainer = styled.button`
    ${layout.grid({ justify: "center" })}
    border-radius: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: transparent;
  `;
  return (
    <Wrapper onSubmit={(e) => e.preventDefault()} ref={dropdownRef}>
      {Object(value)[keyValue.name] || <Body fontColor="tertiary">{placeholder}</Body>}
      <StyledIconContainer
        type="button"
        onClick={() => optionList?.length > 0 && setIsOpen(!isOpen)}
      >
        <Icon iconNm={isOpen ? "chevronLess" : "chevronMore"} iconSize={16} iconColor="secondary" />
      </StyledIconContainer>
    </Wrapper>
  );
}

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * 해당 input 태그의 ID를 설정합니다.
   */
  id: string;
  /**
   * lable text를 지정합니다.
   */
  value: string;
  /**
   * 체크 여부를 지정합니다.
   */
  checked: boolean;
  /**
   * 체크 여부 변경 시 이벤트를 지정합니다.
   * @param value lable text
   * @returns
   */
  onChange?: (value: any) => void;
  /**
   * 비활성화 여부를 지정합니다.
   */
  disabled?: boolean;
}
export function Radio({
  value: lable,
  checked = false,
  disabled = false,
  onChange,
  ...props
}: RadioProps) {
  function onRadioChange() {
    if (disabled) return;
    onChange && onChange(lable);
  }
  const Wrapper = styled.div`
    padding: 10px 0;
    ${layout.flex({ spacing: 8 })}
    ${disabled ? "cursor: not-allowed;" : "cursor: pointer; > * { cursor: pointer; }"}
  `;
  const StyledInput = styled.input`
    appearance: none;
    margin: 0;
    width: 24px;
    height: 24px;
    background-image: url(${(props) => (props.checked ? RadioActive : Unchecked)});
    &::after {
      content: "";
      display: block;
    }
  `;
  const StyledLabel = styled.label`
    color: ${disabled ? color.text.tertiary.hex : color.text.primary.hex};
    font-family: Pretendard400;
    font-size: 16px;
    line-height: 22px; /* 137.5% */
  `;
  return (
    <Wrapper onClick={onRadioChange}>
      <StyledInput type="radio" {...{ ...props, checked, disabled }} />
      <StyledLabel htmlFor={props.id}>{lable}</StyledLabel>
    </Wrapper>
  );
}
interface CheckboxProps extends RadioProps {
  /**
   * 체크박스의 모양을 설정합니다.
   */
  isSquared?: boolean;
}
export function Checkbox({
  value: lable,
  checked = false,
  isSquared = false,
  disabled = false,
  onChange,
  ...props
}: CheckboxProps) {
  function onCheckboxChange() {
    if (disabled) return;
    onChange && onChange(lable);
  }
  const Wrapper = styled.div`
    padding: 10px 0;
    ${layout.flex({ spacing: 8 })}
    ${disabled ? "cursor: not-allowed;" : "cursor: pointer; > * { cursor: pointer; }"}
  `;
  const StyledInput = styled.input`
    appearance: none;
    margin: 0;
    width: 24px;
    height: 24px;
    background-image: url(${(props) =>
      props.checked
        ? isSquared
          ? CheckedSquare
          : Checked
        : isSquared
          ? UncheckedSquare
          : Unchecked});
    &::after {
      content: "";
      display: block;
    }
  `;
  const StyledLabel = styled.label`
    color: ${disabled ? color.text.tertiary.hex : color.text.primary.hex};
    font-family: Pretendard400;
    font-size: 16px;
    line-height: 22px; /* 137.5% */
  `;
  return (
    <Wrapper onClick={onCheckboxChange}>
      <StyledInput type="checkbox" {...{ ...props, checked, disabled }} />
      <StyledLabel htmlFor={props.id}>{lable}</StyledLabel>
    </Wrapper>
  );
}
