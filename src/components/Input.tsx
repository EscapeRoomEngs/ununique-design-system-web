import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Unchecked from "../assets/icon/check_false.svg";
import UncheckedSquare from "../assets/icon/check_square_false.svg";
import CheckedSquare from "../assets/icon/check_square_true.svg";
import Checked from "../assets/icon/check_true.svg";
import RadioActive from "../assets/icon/radio.svg";
import { Container } from "../atom/Container";
import { Icon } from "../atom/Icon";
import { color } from "../foundation/color";
import { layout, radius } from "../foundation/layout";

interface TextFieldsProps {
  type?: "text" | "password";
  value: string;
  onChange?: (value: any) => void;
  isError?: () => boolean;
  placeholder?: string;
  disabled?: boolean;
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
      border-color: ${color.border.focused.hex};
    }
    &:has(input.error) {
      border-color: ${color.border.error.hex};
    }
    ${disabled
      ? `background-color: ${color.surface.tertiary.hex}; 
      &> input {color: ${color.text.secondary.hex};}`
      : ""}
  `;
  const StyledInput = styled.input`
    background: transparent;
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
                iconColor="sub"
              />
            </StyledIconContainer>
          )}
          <StyledIconContainer type="reset" onClick={() => onChange && onChange("")}>
            <Icon iconNm="close" iconSize={16} iconColor="sub" />
          </StyledIconContainer>
        </Container>
      )}
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
    color: ${disabled ? color.text.placeholder.hex : color.text.primary.hex};
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
    color: ${disabled ? color.text.placeholder.hex : color.text.primary.hex};
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
