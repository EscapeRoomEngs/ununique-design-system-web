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
  size: "S" | "M" | "L";
  /**
   * 버튼의 radius를 지정합니다. (단위 px)
   */
  radius: 0 | 4 | 8;
  /**
   * 버튼 속성을 지정합니다.
   */
  property: "Contained" | "Outlined" | "Text";
  /**
   * 버튼 속성 스타일을 지정합니다.
   */
  propertyStyle: Omit<ButtonPropertyStyle, "Contained" | "Outlined" | "Text">;
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
  disabled: boolean;
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
    Contained: `
        background-color: ${disabled ? palette.gray[200] : color.surface[propertyStyle === "Brand" ? "brand" : "invert"].hex};
        > div > .body { color: ${disabled ? color.text.placeholder.hex : color.text.invert.hex}; }
      `,
    Outlined: `
        background-color: ${propertyStyle === "GrayLine" ? color.surface.primary.hex : disabled ? color.surface.secondary.hex : color.surface.tertiary.hex};
        border: ${propertyStyle === "GrayLine" ? `1px solid ${disabled ? color.border.disabled.hex : color.border.default.hex}` : ""};
        > div > .body { color: ${disabled ? color.text.placeholder.hex : color.text.secondary.hex}; }
        `,
    Text: `
        background-color: ${color.surface.primary.hex};
        > div > .body { color: ${propertyStyle === "Brand" ? color.text.positive.hex : color.text.secondary.hex}; }
      `,
  };
  const BTN_SIZES = {
    S: "padding: 7px 24px; height: 40px; > div > .body { font-size: 14px; }",
    M: "padding: 14px 32px; height: 48px; > div > .body { font-size: 16px; }",
    L: "padding: 16px 32px; height: 54px; > div > .body { font-size: 18px; }",
  };
  const StyledButton = styled.button`
    cursor: pointer;
    ${BTN_SIZES[size]}
    ${BTN_STYLES[property]}
    border-radius: ${radius}px;
    ${layout.flex({ justify: "center", align: "center", spacing: "8px" })}
  `;
  return (
    <StyledButton type="button" {...props} disabled>
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
