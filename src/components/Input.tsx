import { InputHTMLAttributes, useState } from "react";
import styled from "styled-components";
import Unchecked from "../assets/icon/check_false.svg";
import UncheckedSquare from "../assets/icon/check_square_false.svg";
import CheckedSquare from "../assets/icon/check_square_true.svg";
import Checked from "../assets/icon/check_true.svg";
import RadioActive from "../assets/icon/radio.svg";
import { color } from "../foundation/color";
import { layout } from "../foundation/layout";

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  checked: boolean;
  onChange?: (newValue: any) => void;
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
interface CheckboxProps {
  id: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: any) => void;
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
  // const [isChecked, setIsChecked] = useState(checked);
  function onCheckboxChange() {
    // setIsChecked(!isChecked);
    onChange && onChange(lable);
  }
  const Wrapper = styled.div`
    padding: 10px 0;
    ${layout.flex({ spacing: 8 })}
    ${disabled ? "cursor: not-allowed;" : "cursor: pointer;"}
  `;
  const StyledInput = styled.input`
    appearance: none;
    width: 24px;
    height: 24px;
    background-image: url(${(props) => (props.checked ? Checked : Unchecked)};
    background-position: center;
    background-repeat: no-repeat;
    background-size: 24px;
    &::after { content: ""; display: block; }
    ${disabled ? "cursor: not-allowed;" : "cursor: pointer; > * { cursor: pointer; }"};;;;;;;;;;
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
