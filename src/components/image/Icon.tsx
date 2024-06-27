import styled from "styled-components";
import { ReactComponent as IconConfirm } from "../../assets/icon/check_circle.svg";
import { color } from "../../styles/color";

interface IconProps {
  iconSize?: string;
  iconColor?: "default" | "sub" | "tertiary" | "disabled" | "invert";
  style?: React.CSSProperties;
}
export const Icon = ({ iconSize = "20px", iconColor = "default", ...props }: IconProps) => {
  const StyledIconWrapper = styled.div`
    width: ${iconSize};
    height: ${iconSize};
    svg {
      fill: ${color.icon[iconColor]?.hex};
    }
  `;
  const StyledIcon = styled(IconConfirm)`
    width: ${iconSize};
    height: ${iconSize};
  `;
  return (
    <StyledIconWrapper {...props}>
      <StyledIcon />
    </StyledIconWrapper>
  );
};
