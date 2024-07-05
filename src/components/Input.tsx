import { InputHTMLAttributes, useState } from "react";
import styled from "styled-components";
import RadioFalse from "../assets/icon/check_false.svg";
import RadioTrue from "../assets/icon/radio.svg";
import { color } from "../foundation/color";
import { layout } from "../foundation/layout";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
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
  const [isChecked, setIsChecked] = useState(checked);
  function onRadioChange() {
    setIsChecked(!isChecked);
    onChange && onChange(isChecked ? undefined : lable);
  }
  const StyledRadioInputWrapper = styled.div`
    padding: 10px 0;
    ${layout.flex({ spacing: 8 })}
    ${disabled ? "cursor: not-allowed;" : "cursor: pointer; > * { cursor: pointer; }"}
  `;
  const StyledInput = styled.input`
    appearance: none;
    margin: 0;
    width: 24px;
    height: 24px;
    background-image: url(${(props) => (props.checked ? RadioTrue : RadioFalse)});
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
    <StyledRadioInputWrapper onClick={onRadioChange}>
      <StyledInput type="radio" checked={isChecked} disabled {...props} />
      <StyledLabel htmlFor="radio-button">{lable}</StyledLabel>
    </StyledRadioInputWrapper>
  );
}
