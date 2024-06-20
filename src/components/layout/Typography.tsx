import styled from "styled-components";
import { color as palette } from "../../styles/color";

export interface TypographyProps {
  children?: string;
  weight?: 400 | 600;
  style?: "Large" | "Medium" | "Small" | "ExtraSmall";
  color?: "primary" | "secondary" | "placeholder" | "invert" | "negative" | "positive";
}
export const Display = ({
  weight = 600,
  style = "Medium",
  color,
  children: value,
}: TypographyProps) => {
  const DisplayContainer = styled.p`
    font-size: ${style === "Large" ? "48px" : style === "Medium" ? "44px" : "40px"};
    font-family: "Pretendard${weight}";
    color: ${color ? palette.text[color] : "inherit"};
    margin: 0;
  `;
  return <DisplayContainer className="display">{value}</DisplayContainer>;
};
export const Heading = ({
  weight = 600,
  style = "Large",
  color,
  children: text,
}: TypographyProps) => {
  const HeadingContainer = (style === "Large"
    ? styled.h1
    : style === "Medium"
      ? styled.h2
      : styled.h3)`
  font-size: ${style === "Large" ? "36px" : style === "Medium" ? "33px" : "30px"};
  font-family: "Pretendard${weight}"; 
  color: ${color ? palette.text[color] : "inherit"};
  margin: 0;
`;
  return <HeadingContainer className="heading">{text}</HeadingContainer>;
};
export const Title = ({
  weight = 600,
  style = "Medium",
  color,
  children: text,
}: TypographyProps) => {
  const TitleContainer = (style === "Large"
    ? styled.h4
    : style === "Medium"
      ? styled.h5
      : styled.h6)`
  font-size: ${style === "Large" ? "27px" : style === "Medium" ? "24px" : "21px"};
  font-family: "Pretendard${weight}"; 
  color: ${color ? palette.text[color] : "inherit"};
  margin: 0;
`;
  return <TitleContainer className="title">{text}</TitleContainer>;
};
export const Body = ({ weight = 400, style = "Small", color, children: text }: TypographyProps) => {
  const fontSize = () => {
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
  font-size: ${fontSize()}
  font-family: "Pretendard${weight}"; 
  color: ${color ? palette.text[color] : "inherit"};
  margin: 0;
`;
  return <div>{text?.split("\n")?.map((el) => <BodyContainer>{el}</BodyContainer> || <br />)}</div>;
};
export const Lable = ({
  weight = 600,
  style = "Medium",
  color,
  children: text,
}: TypographyProps) => {
  const fontSize = () => {
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
  const LableContainer = styled.label`
  font-size: ${fontSize()}
  font-family: "Pretendard${weight}"; 
  color: ${color ? palette.text[color] : "inherit"};`;
  return <LableContainer>{text}</LableContainer>;
};
