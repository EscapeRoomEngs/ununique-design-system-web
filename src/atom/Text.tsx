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
  weight?: 400 | 600;
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
  weight = 600,
  fontStyle: style = "Medium",
  fontColor,
  children: value,
}: TypographyProps) => {
  const fontSize = style === "Large" ? "48px" : style === "Medium" ? "44px" : "40px";
  const DisplayContainer = styled.p`
    ${getTypoStyleProps({ fontSize, weight, fontColor })}
  `;
  return <DisplayContainer className="display">{value}</DisplayContainer>;
};
export const Heading = ({
  weight = 600,
  fontStyle: style = "Large",
  fontColor,
  children: value,
}: TypographyProps) => {
  const fontSize = style === "Large" ? "36px" : style === "Medium" ? "33px" : "30px";
  const HeadingContainer = (style === "Large"
    ? styled.h1
    : style === "Medium"
      ? styled.h2
      : styled.h3)`${getTypoStyleProps({ fontSize, weight, fontColor })}`;
  return <HeadingContainer className="heading">{value}</HeadingContainer>;
};
export const Title = ({
  weight = 600,
  fontStyle: style = "Medium",
  fontColor,
  children: value,
}: TypographyProps) => {
  const fontSize = style === "Large" ? "27px" : style === "Medium" ? "24px" : "21px";
  const TitleContainer = (style === "Large"
    ? styled.h4
    : style === "Medium"
      ? styled.h5
      : styled.h6)`${getTypoStyleProps({ fontSize, weight, fontColor })}`;
  return <TitleContainer className="title">{value}</TitleContainer>;
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
  const BodyContainer = styled.p`
    ${getTypoStyleProps({ fontSize: getBodyFontSize(), weight, fontColor })}
  `;
  return (
    <div>
      {typeof children === "string"
        ? children?.split("\n")?.map(
            (line, idx) =>
              (
                <BodyContainer key={idx} className={`body ${weight}`}>
                  {line}
                </BodyContainer>
              ) || <br />
          )
        : children}
    </div>
  );
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
  const LableContainer = styled.div`
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
    <LableContainer className="label-container">
      <label className={required ? "essential" : ""}>{value}</label>
    </LableContainer>
  );
};
