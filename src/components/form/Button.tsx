import styled from "styled-components";
import { color } from "../../styles/color";
import { layout } from "../../styles/layout";
import { Icon, IconProps } from "../image/Icon";
import { Body, fontColor } from "../layout/Typography";

interface ButtonProps {
  /**
   * 버튼의 타입을 지정합니다.
   */
  btnType: "button" | "toggle";
  /**
   * 버튼 텍스트를 지정합니다.
   */
  btnText?: string;
  /**
   * 버튼 텍스트를 지정합니다.
   */
  btnTextColor?: fontColor;
  /**
   * 버튼의 radius를 지정합니다. (기본값 4px)
   */
  btnRadius: 0 | 4 | 8;
  /**
   * 버튼의 색상을 지정합니다.
   */
  btnColor?: "primary" | "secondary" | "tertiary" | "invert" | "brand";
  /**
   * 버튼의 아웃라인 색상을 지정합니다.
   */
  borderColor?: "default" | "hover" | "focused" | "disabled" | "error";
  /**
   * 버튼 내 아이콘 옵션을 지정합니다.
   */
  iconOption?: IconProps;
  /**
   * 버튼 상호작용 비활성화 여부를 지정합니다. (기본값 false)
   */
  disabled: boolean;
  /**
   * 버튼의 상호작용 이벤트를 지정합니다.
   * @returns
   */
  onClick?: () => void;
}

/**
 * 버튼은 사용자가 동작을 가능하게 할 때 사용합니다.
 * 물리적 터치가 일어나는 디바이스의 경우 높이는 48px로 고정합니다.
 * 버튼 타입의 종류로 Button(Contained, Outlined, Text), Toggle이 있습니다.
 */
export function Button({
  btnType = "button",
  btnText,
  btnTextColor = "secondary",
  btnRadius = 4,
  btnColor,
  borderColor,
  iconOption,
  disabled = false,
  ...props
}: ButtonProps) {
  const StyledButton = styled.button`
    cursor: pointer;
    min-height: 48px;
    padding: 0 ${btnType === "toggle" ? 14 : 32}px;
    border-radius: ${btnRadius}px;
    background-color: ${btnColor ? color.surface[btnColor].hex : "transparent"};
    border: 1px solid ${borderColor ? color.border[borderColor].hex : "transparent"};
    ${layout.flex({ justify: "center", align: "center", spacing: "8px" })}
  `;
  return (
    <StyledButton className={btnType} type="button" {...props} disabled>
      {iconOption && (
        <Icon {...iconOption} iconColor={disabled ? "invert" : iconOption.iconColor} />
      )}
      <Body weight={600} fontColor={btnTextColor}>
        {btnText}
      </Body>
    </StyledButton>
  );
}

interface ButtonGroupProps {
  /**
   * 버튼 그룹의 버튼 타입을 하나로 지정합니다.
   */
  btnsType: "button" | "toggle";
  /**
   * 버튼 사이의 간격을 지정합니다. (기본값 16px)
   */
  spacing?: 0 | 4 | 8 | 16;
  /**
   * 버튼의 각 특성을 지정합니다.
   */
  btnList: ButtonProps[];
}
export function ButtonGroup({ btnsType = "button", spacing, btnList = [] }: ButtonGroupProps) {
  const StyledButtonWrapper = styled.div`
    ${layout.flex({ justify: "center", align: "center" })}
    gap: ${btnsType === "toggle" ? 0 : spacing}px;
    > .toggle:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    > .toggle:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  `;
  return (
    <StyledButtonWrapper className={`${btnsType}-list-wrapper`}>
      {btnList.map((btnProps, idx) => (
        <Button
          key={idx}
          {...btnProps}
          btnType={btnsType}
          btnRadius={btnsType === "toggle" ? 0 : btnProps.btnRadius}
        />
      ))}
    </StyledButtonWrapper>
  );
}
