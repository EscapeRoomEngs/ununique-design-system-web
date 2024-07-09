import styled from "styled-components";
import { color } from "../foundation/color";

export type fontColor =
  | "primary"
  | "secondary"
  | "placeholder"
  | "invert"
  | "negative"
  | "positive";
export interface TypographyProps {
  weight?: 300 | 400 | 500 | 600;
  fontStyle?: "Large" | "Medium" | "Small" | "ExtraSmall";
  fontColor?: fontColor;
  style?: React.CSSProperties;
  children?: any;
}
const getTypoStyleProps = (props: { fontSize: string; weight: number; fontColor?: fontColor }) =>
  `font-size: ${props.fontSize};
    font-family: "Pretendard${props.weight}";
    color: ${props.fontColor ? color.text[props.fontColor]?.hex : "inherit"};
    margin: 0;`;

export const Display = ({
  weight = 500,
  fontStyle: style = "Medium",
  fontColor,
  children: value,
}: TypographyProps) => {
  const fontSize = style === "Large" ? "48px" : style === "Medium" ? "44px" : "40px";
  const StyledDisplay = styled.p`
    ${getTypoStyleProps({ fontSize, weight, fontColor })}
  `;
  return <StyledDisplay className="display">{value}</StyledDisplay>;
};
export const Heading = ({
  weight = 500,
  fontStyle: style = "Large",
  fontColor,
  children: value,
}: TypographyProps) => {
  const fontSize = style === "Large" ? "36px" : style === "Medium" ? "33px" : "30px";
  const StyledHeading = (style === "Large"
    ? styled.h1
    : style === "Medium"
      ? styled.h2
      : styled.h3)`${getTypoStyleProps({ fontSize, weight, fontColor })}`;
  return <StyledHeading className="heading">{value}</StyledHeading>;
};
export const Title = ({
  weight = 500,
  fontStyle: style = "Medium",
  fontColor,
  children: value,
}: TypographyProps) => {
  const fontSize = style === "Large" ? "27px" : style === "Medium" ? "24px" : "21px";
  const StyledTitle = (style === "Large"
    ? styled.h4
    : style === "Medium"
      ? styled.h5
      : styled.h6)`${getTypoStyleProps({ fontSize, weight, fontColor })}`;
  return <StyledTitle className="title">{value}</StyledTitle>;
};
export const Body = ({
  weight = 400,
  fontStyle: style = "Small",
  fontColor,
  children,
}: TypographyProps) => {
  const getBodyFontSize = () => {
    switch (style) {
      case "Large":
        return "19px";
      case "Medium":
        return "17px";
      case "ExtraSmall":
        return "13px";
      case "Small":
      default:
        return "15px";
    }
  };
  const StyledBody = styled.p`
    ${getTypoStyleProps({ fontSize: getBodyFontSize(), weight, fontColor })}
  `;
  return <StyledBody className={`body ${weight}`}>{children}</StyledBody>;
};
export interface LableProps extends TypographyProps {
  required?: boolean;
}
export const Lable = ({
  weight = 500,
  fontStyle: style = "Medium",
  fontColor,
  children: value,
  required = false,
}: LableProps) => {
  const getLabelFontSize = () => {
    switch (style) {
      case "Large":
        return "19px";
      case "Small":
        return "15px";
      case "Medium":
      default:
        return "17px";
    }
  };
  const StyledLable = styled.div`
    > label {
      ${getTypoStyleProps({ fontSize: getLabelFontSize(), weight, fontColor })}
    }
    label.essential::after {
      content: "*";
      color: ${color.text.negative.hex};
      padding-left: 2px;
    }
  `;
  return (
    <StyledLable className="label-container">
      <label className={required ? "essential" : ""}>{value}</label>
    </StyledLable>
  );
};
