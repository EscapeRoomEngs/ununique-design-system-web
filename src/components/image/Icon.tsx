import styled from "styled-components";
import { ReactComponent as IconAdd } from "../../assets/icon/add.svg";
import { ReactComponent as IconConfirm } from "../../assets/icon/check_circle.svg";
import { ReactComponent as IconChevron } from "../../assets/icon/chevron.svg";
import { ReactComponent as IconClose } from "../../assets/icon/close.svg";
import { ReactComponent as IconDownload } from "../../assets/icon/download.svg";
import { ReactComponent as IconNoti } from "../../assets/icon/notifications.svg";
import { ReactComponent as IconRefresh } from "../../assets/icon/refresh.svg";
import { ReactComponent as IconRemove } from "../../assets/icon/remove.svg";
import { ReactComponent as IconSearch } from "../../assets/icon/search.svg";
import { ReactComponent as IconUpload } from "../../assets/icon/upload.svg";
import { color } from "../../styles/color";
import { layout } from "../../styles/layout";

export interface IconProps {
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
  const IconComponent = getIconComponent(iconNm);
  const StyledIconWrapper = styled.div`
    ${layout.flex({ justify: "center", align: "center" })};
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
      <StyledIcon className={iconNm} />
    </StyledIconWrapper>
  );
};
function getIconComponent(iconNm: string) {
  switch (iconNm) {
    case "chevronLess":
    case "chevronRight":
    case "chevronMore":
    case "chevronLeft":
      return IconChevron;
    case "add":
      return IconAdd;
    case "remove":
      return IconRemove;
    case "refresh":
      return IconRefresh;
    case "search":
      return IconSearch;
    case "close":
      return IconClose;
    case "upload":
      return IconUpload;
    case "download":
      return IconDownload;
    case "noti":
      return IconNoti;
    case "confirm":
    default:
      return IconConfirm;
  }
}
