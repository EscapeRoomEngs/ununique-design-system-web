import IconAdd from "../assets/icon/add.svg?react";
import IconConfirm from "../assets/icon/check_circle.svg?react";
import Unchecked from "../assets/icon/check_false.svg?react";
import UncheckedSquare from "../assets/icon/check_square_false.svg?react";
import CheckedSquare from "../assets/icon/check_square_true.svg?react";
import Checked from "../assets/icon/check_true.svg?react";
import IconChevron from "../assets/icon/chevron.svg?react";
import IconClose from "../assets/icon/close.svg?react";
import IconDownload from "../assets/icon/download.svg?react";
import IconNoti from "../assets/icon/notifications.svg?react";
import RadioActive from "../assets/icon/radio.svg?react";
import IconRefresh from "../assets/icon/refresh.svg?react";
import IconRemove from "../assets/icon/remove.svg?react";
import IconSearch from "../assets/icon/search.svg?react";
import IconUpload from "../assets/icon/upload.svg?react";
import IconVisible from "../assets/icon/visibility.svg?react";
import IconInvisible from "../assets/icon/visibility_off.svg?react";
import { token } from "../foundation/color";

/**
 * 아이콘명에 따른 아이콘 컴포넌트 및 회전 각도 지정
 */
export const IconObj = {
  chevronLess: { component: IconChevron, rotate: 0 },
  chevronRight: { component: IconChevron, rotate: 90 },
  chevronMore: { component: IconChevron, rotate: 180 },
  chevronLeft: { component: IconChevron, rotate: 270 },
  add: { component: IconAdd },
  remove: { component: IconRemove },
  refresh: { component: IconRefresh },
  search: { component: IconSearch },
  close: { component: IconClose },
  upload: { component: IconUpload },
  download: { component: IconDownload },
  noti: { component: IconNoti },
  confirm: { component: IconConfirm },
  visible: { component: IconVisible },
  invisible: { component: IconInvisible },
  radio: { component: RadioActive },
  unchecked: { component: Unchecked },
  checked: { component: Checked },
  uncheckedSquare: { component: UncheckedSquare },
  checkedSquare: { component: CheckedSquare },
};

export interface IconProps {
  /**
   * 아이콘 명을 지정합니다.
   */
  iconNm?: string;
  /**
   * 아이콘의 크기를 지정합니다.
   */
  iconSize?: number;
  /**
   * 아이콘 색상 토큰을 지정합니다.
   */
  iconColor?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "invert"
    | "negative"
    | "positive"
    | "info"
    | string;
  /**
   * 아이콘 색상을 직접 지정합니다.
   */
  iconColorHex?: string;
  /**
   * 기타 아이콘 스타일을 특정하는 경우 사용합니다. (ex. border 등)
   */
  style?: React.CSSProperties;
}
export const Icon = ({
  iconNm = "confirm",
  iconSize = 24,
  iconColor,
  iconColorHex,
  ...props
}: IconProps) => {
  const icon = IconObj[iconNm as keyof typeof IconObj];
  if (!icon) return null;
  const Component = icon.component;
  const fill = (iconColor && token.icon[iconColor as keyof typeof token.icon]?.hex) || iconColorHex || token.icon.primary.hex;
  const rotation = "rotate" in icon ? icon.rotate : 0;
  return <Component className={iconNm} width={iconSize} height={iconSize} fill={fill} style={{ transform: `rotate(${rotation}deg)`, ...props.style }} {...props} />;
};
