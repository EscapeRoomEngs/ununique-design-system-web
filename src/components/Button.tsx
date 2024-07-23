import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { Icon } from "../atom/Icon";
import { Body } from "../atom/Text";
import { primitives, token } from "../foundation/color";
import { layout } from "../foundation/layout";

export type ButtonPropertyStyle = {
  Contained: "Gray" | "Brand";
  Outlined: "GrayLine" | "GrayFill";
  Text: "Gray" | "Brand";
};
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 텍스트를 지정합니다.
   */
  text?: string;
  /**
   * 버튼의 size를 지정합니다.
   */
  size?: "S" | "M" | "L";
  /**
   * 버튼의 radius를 지정합니다. (단위 px)
   */
  radius?: 0 | 4 | 8;
  /**
   * 버튼 속성을 지정합니다.
   */
  property?: "Contained" | "Outlined" | "Text";
  /**
   * 버튼 속성 스타일을 지정합니다.
   */
  propertyStyle?: ButtonPropertyStyle["Contained" | "Outlined" | "Text"];
  /**
   * 버튼 내 아이콘 옵션을 지정합니다.
   */
  iconOption?: {
    iconNm?: string;
    iconColor?: "primary" | "secondary" | "tertiary" | "invert" | "negative" | "positive" | "info";
  };
  /**
   * 버튼 상호작용 비활성화 여부를 지정합니다.
   */
  disabled?: boolean;
  /**
   * 버튼의 상호작용 이벤트를 지정합니다.
   */
  onClick?: () => void;
}

/**
 * 버튼은 사용자가 동작을 가능하게 할 때 사용합니다.
 *
 * 물리적 터치가 일어나는 디바이스의 경우 높이는 48px로 고정합니다.
 */
export function Button({
  text,
  size = "M",
  radius = 4,
  disabled = false,
  property = "Contained",
  propertyStyle = "Brand",
  iconOption = {},
  ...props
}: ButtonProps) {
  const BTN_STYLES = {
    Contained: {
      Brand: {
        backgroundColor: token.surface.brand.hex,
        color: token.text.invert.hex,
        disabled: `background-color: ${primitives.gray[200]};`,
        hover: `background-color: ${primitives.red[600]};`,
        active: `background-color: ${primitives.red[700]};`,
      },
      Gray: {
        backgroundColor: token.surface.invert.hex,
        color: token.text.invert.hex,
        disabled: `background-color: ${primitives.gray[200]};`,
        hover: `background-color: ${primitives.gray[700]};`,
        active: `background-color: ${primitives.gray[500]};`,
      },
    },
    Outlined: {
      GrayLine: {
        backgroundColor: token.surface.primary.hex,
        border: token.border.default.hex,
        color: token.text.secondary.hex,
        disabled: `background-color: ${token.surface.secondary.hex}; border: 1px solid ${token.border.invert.hex};`,
        hover: `background-color: ${primitives.gray[50]}; border: 1px solid ${token.border.hover.hex}`,
        active: `background-color: ${primitives.gray[100]};`,
      },
      GrayFill: {
        backgroundColor: token.surface.secondary.hex,
        color: token.text.secondary.hex,
        disabled: token.surface.secondary.hex,
        hover: `background-color: ${primitives.gray[200]};`,
        active: `background-color: ${primitives.gray[300]};`,
      },
    },
    Text: {
      Brand: {
        backgroundColor: token.surface.primary.hex,
        color: token.text.negative.hex,
        disabled: `background-color: ${primitives.gray[200]};`,
        hover: `background-color: ${primitives.gray[50]};`,
        active: `background-color: ${primitives.gray[100]};`,
      },
      Gray: {
        backgroundColor: token.surface.primary.hex,
        color: token.text.secondary.hex,
        disabled: `background-color: ${primitives.gray[200]};`,
        hover: `background-color: ${primitives.gray[50]};`,
        active: `background-color: ${primitives.gray[100]};`,
      },
    },
  };
  const getBtnStyle = (btnStyles: {
    disabled?: string;
    backgroundColor: string;
    border?: string;
    color?: string;
    hover?: string;
    active?: string;
  }) =>
    disabled
      ? btnStyles.disabled || `background-color: ${primitives.gray[200]};`
      : `
    background-color: ${btnStyles.backgroundColor};
    border: ${btnStyles?.border ? `1px solid ${btnStyles.border}` : "0"};
    > .body { color: ${btnStyles.color}; }
    ${btnStyles.hover ? `&:hover { ${btnStyles.hover} }` : ""}
    ${btnStyles.active ? `&:active { ${btnStyles.active} }` : ""}
  `;
  const BTN_SIZES = {
    S: "padding: 7px 24px; height: 40px; > .body { font-size: 14px; }",
    M: "padding: 14px 32px; height: 48px; > .body { font-size: 16px; }",
    L: "padding: 16px 32px; height: 54px; > .body { font-size: 18px; }",
  };
  const StyledButton = styled.button`
    cursor: pointer;
    ${BTN_SIZES[size]}
    ${getBtnStyle(Object(BTN_STYLES[property])[propertyStyle] || BTN_STYLES.Outlined.GrayFill)}
    border-radius: ${radius}px;
    ${layout.flex({ justify: "center", align: "center", spacing: 8 })}
    ${disabled ? `cursor: not-allowed; > .body { color: ${token.text.tertiary.hex}; }` : ""}
  `;
  return (
    <StyledButton type="button" disabled={disabled} {...props}>
      {iconOption?.iconNm && (
        <Icon
          {...iconOption}
          iconColor={disabled ? "tertiary" : iconOption.iconColor}
          iconColorHex={
            (Object(BTN_STYLES[property])[propertyStyle] || BTN_STYLES.Outlined.GrayFill)?.color
          }
          iconSize={20}
        />
      )}
      {text && <Body weight={600}>{text}</Body>}
    </StyledButton>
  );
}
