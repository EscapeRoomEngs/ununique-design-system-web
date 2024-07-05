import styled from "styled-components";
import { Icon, IconNmType } from "../atom/Icon";
import { Body } from "../atom/Text";
import { color, palette } from "../foundation/color";
import { layout } from "../foundation/layout";

export type ButtonPropertyStyle = {
  Contained: "Gray" | "Brand";
  Outlined: "GrayLine" | "GrayFill";
  Text: "Gray" | "Brand";
};
interface ButtonProps {
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
  propertyStyle?: Omit<ButtonPropertyStyle, "Contained" | "Outlined" | "Text">;
  /**
   * 버튼 내 아이콘 옵션을 지정합니다.
   */
  iconOption?: {
    iconNm?: IconNmType;
    iconColor?: "default" | "sub" | "tertiary" | "disabled" | "invert";
  };
  /**
   * 버튼 상호작용 비활성화 여부를 지정합니다.
   */
  disabled?: boolean;
  /**
   * 버튼의 상호작용 이벤트를 지정합니다.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
    Contained: disabled
      ? `background-color: ${palette.gray[200]};`
      : `
      background-color: ${color.surface[propertyStyle === "Brand" ? "brand" : "invert"].hex};
      > .body { color: ${color.text.invert.hex}; }
      &:hover {
        background-color: ${propertyStyle === "Brand" ? palette.blue[600] : palette.gray[700]};
      }
      &:active {
        background-color: ${propertyStyle === "Brand" ? palette.blue[700] : palette.gray[500]};
      }
      `,
    Outlined: disabled
      ? `background-color: ${color.surface.secondary.hex}; border: 1px solid ${color.border.disabled.hex};`
      : `
      background-color: ${propertyStyle === "GrayLine" ? color.surface.primary.hex : color.surface.secondary.hex};
      border: ${propertyStyle === "GrayLine" ? `1px solid ${color.border.default.hex}` : ""};
      > .body { color: ${color.text.secondary.hex}; }
      &:hover {
        background-color: ${propertyStyle === "GrayLine" ? palette.gray[50] : palette.gray[100]};
        border: ${propertyStyle === "GrayLine" ? `1px solid ${color.border.hover.hex}` : ""};
      }
      &:active {
        background-color: ${propertyStyle === "GrayLine" ? palette.gray[100] : palette.gray[200]};
      }
      `,
    Text: `
        background-color: ${color.surface.primary.hex};
        > .body { color: ${propertyStyle === "Brand" ? color.text.positive.hex : color.text.secondary.hex}; }
        `,
  };
  const BTN_SIZES = {
    S: "padding: 7px 24px; height: 40px; > .body { font-size: 14px; }",
    M: "padding: 14px 32px; height: 48px; > .body { font-size: 16px; }",
    L: "padding: 16px 32px; height: 54px; > .body { font-size: 18px; }",
  };
  const StyledButton = styled.button`
    cursor: pointer;
    ${BTN_SIZES[size]}
    ${BTN_STYLES[property]}
    border-radius: ${radius}px;
    ${layout.flex({ justify: "center", align: "center", spacing: 8 })}
    ${disabled ? `cursor: not-allowed; > .body { color: ${color.text.placeholder.hex}; }` : ""}
  `;
  return (
    <StyledButton type="button" {...props} onClick={props.onClick} disabled>
      {iconOption?.iconNm && (
        <Icon
          {...iconOption}
          iconColor={disabled ? "disabled" : iconOption.iconColor}
          iconSize={20}
        />
      )}
      {text && <Body weight={600}>{text}</Body>}
    </StyledButton>
  );
}
