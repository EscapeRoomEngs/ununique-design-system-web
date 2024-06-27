import styled from "styled-components";
import { ReactComponent as IconConfirm } from "../../assets/icon/check_circle.svg";
import { ReactComponent as IconNoti } from "../../assets/icon/notifications.svg";
import { color } from "../../styles/color";

interface IconProps {
  iconNm: string;
  iconSize: string;
  iconColor?: "default" | "sub" | "tertiary" | "disabled" | "invert";
  style?: React.CSSProperties;
}
export const Icon = ({
  iconNm = "confirm",
  iconSize = "24px",
  iconColor = "default",
  ...props
}: IconProps) => {
  const IconComponent = iconNm === "confirm" ? IconConfirm : IconNoti;
  const StyledIconWrapper = styled.div`
    width: ${iconSize};
    height: ${iconSize};
    svg {
      fill: ${color.icon[iconColor]?.hex};
    }
  `;
  const StyledIcon = styled(IconComponent)`
    width: ${iconSize};
    height: ${iconSize};
  `;
  return (
    <StyledIconWrapper {...props}>
      <StyledIcon />
    </StyledIconWrapper>
  );
};
