import styled from "styled-components";
import { color } from "../foundation/color";
import { typography } from "../foundation/typography";

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
const getTypoStyleProps = (props: {
  webSize: number;
  mobileSize: number;
  weight: number;
  fontColor?: fontColor;
}) =>
  `font-size: ${props.webSize}px;
    @media (width < 800) {
      font-size: ${props.mobileSize}px;
    }
    font-family: "Pretendard${props.weight}";
    color: ${props.fontColor ? color.text[props.fontColor]?.hex : "inherit"};
    margin: 0;`;

export const Display = ({
  weight = 600,
  fontStyle: style = "Medium",
  fontColor,
  children: value,
}: TypographyProps) => {
  const fontSizes = Object(typography.display.style)[style];
  const StyledDisplay = styled.p`
    ${getTypoStyleProps({ ...fontSizes, weight, fontColor })}
  `;
  return <StyledDisplay className="display">{value}</StyledDisplay>;
};
export const Heading = ({
  weight = 600,
  fontStyle: style = "Large",
  fontColor,
  children: value,
}: TypographyProps) => {
  const fontSizes = Object(typography.heading.style)[style];
  const StyledHeading = (style === "Large"
    ? styled.h1
    : style === "Medium"
      ? styled.h2
      : styled.h3)`${getTypoStyleProps({ ...fontSizes, weight, fontColor })}`;
  return <StyledHeading className="heading">{value}</StyledHeading>;
};
export const Title = ({
  weight = 600,
  fontStyle: style = "Medium",
  fontColor,
  children: value,
}: TypographyProps) => {
  const fontSizes = Object(typography.title.style)[style];
  const StyledTitle = (style === "Medium"
    ? styled.h5
    : style === "Large"
      ? styled.h4
      : styled.h6)`${getTypoStyleProps({ ...fontSizes, weight, fontColor })}`;
  return <StyledTitle className="title">{value}</StyledTitle>;
};
export const Body = ({
  weight = 400,
  fontStyle: style = "Small",
  fontColor,
  children,
}: TypographyProps) => {
  const fontSizes = Object(typography.body.style)[style];
  const StyledBody = styled.p`
    ${getTypoStyleProps({ ...fontSizes, weight, fontColor })}
  `;
  return <StyledBody className={`body ${weight}`}>{children}</StyledBody>;
};
export interface LableProps extends TypographyProps {
  required?: boolean;
}
export const Lable = ({
  weight = 600,
  fontStyle: style = "Medium",
  fontColor,
  children: value,
  required = false,
}: LableProps) => {
  const fontSizes = Object(typography.lable.style)[style];
  const StyledLable = styled.div`
    > label {
      ${getTypoStyleProps({ ...fontSizes, weight, fontColor })}
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
