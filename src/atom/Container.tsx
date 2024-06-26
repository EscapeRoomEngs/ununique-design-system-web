import styled from "styled-components";
import { color } from "../foundation/color";
import { layout } from "../foundation/layout";
import { Body, Heading, Title, TypographyProps } from "./Text";

interface ContainerProps {
  direction?: "row" | "column";
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-evenly" | "stretch";
  align?: "flex-start" | "center" | "flex-end" | "space-between" | "space-evenly" | "stretch";
  spacing?: string;
  bgColor?: "primary" | "secondary" | "tertiary" | "invert" | "brand";
  borderColor?: "default" | "hover" | "focused" | "disabled" | "error";
  children?: any;
}
export const GridContainer = ({
  justify = "flex-start",
  align = "center",
  spacing = "16px",
  bgColor,
  ...props
}: ContainerProps) => {
  const StyledGridContainer = styled.div`
    ${layout.grid({ justify, align, spacing })}
    background-color: ${bgColor && color.surface[bgColor]?.hex};
    font-family: "Pretendard400";
  `;
  return (
    <StyledGridContainer className="grid-container" {...props}>
      {props.children}
    </StyledGridContainer>
  );
};
export const FlexContainer = ({
  direction,
  justify = "flex-start",
  align = "center",
  spacing = "16px",
  bgColor,
  ...props
}: ContainerProps) => {
  const StyledFlexContainer = styled.div`
    ${layout.flex({ direction, justify, align, spacing })}
    background-color: ${bgColor && color.surface[bgColor]?.hex};
    font-family: "Pretendard400";
  `;
  return (
    <StyledFlexContainer className="flex-container" {...props}>
      {props.children}
    </StyledFlexContainer>
  );
};

export interface CardProps extends ContainerProps {
  heading?: TypographyProps;
  title?: TypographyProps;
  subTitle?: TypographyProps;
  body?: TypographyProps;
  children?: any;
}
export const CardTemplate = ({ heading, title, subTitle, body, ...props }: CardProps) => {
  return (
    <GridContainer spacing="80px" {...props}>
      <Heading>{heading?.children}</Heading>
      <GridContainer spacing="40px">
        <Heading fontStyle={title?.fontStyle}>{title?.children}</Heading>
        <GridContainer spacing="32px">
          <Title fontStyle={subTitle?.fontStyle}>{subTitle?.children}</Title>
          <GridContainer spacing="24px">
            <Body fontStyle={body?.fontStyle}>{body?.children}</Body>
            {props.children}
          </GridContainer>
        </GridContainer>
      </GridContainer>
    </GridContainer>
  );
};
