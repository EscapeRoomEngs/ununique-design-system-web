import styled from "styled-components";
import { color } from "../../styles/color";
import { layout } from "../../styles/layout";
import { Body, Heading, Title, TypographyProps } from "./Typography";

interface ContainerProps {
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-evenly" | "stretch";
  align?: "flex-start" | "center" | "flex-end" | "space-between" | "space-evenly" | "stretch";
  spacing?: string;
  bgColor?: "primary" | "secondary" | "tertiary" | "invert" | "brand";
  style?: React.CSSProperties;
  children?: any;
}
export const GridContainer = ({
  justify = "flex-start",
  align = "center",
  spacing,
  bgColor,
  ...props
}: ContainerProps) => {
  const StyledGridContainer = styled.div`
    ${layout.grid({ justify, align, spacing })}
    background-color: ${bgColor && color.surface[bgColor]?.hex};
    font-family: "Pretendard400";
  `;
  return (
    <StyledGridContainer className="grid-container" style={props.style}>
      {props.children}
    </StyledGridContainer>
  );
};
export const FlexContainer = ({
  justify = "flex-start",
  align = "center",
  spacing,
  bgColor,
  ...props
}: ContainerProps) => {
  const StyledFlexContainer = styled.div`
    ${layout.flex({ justify, align, spacing })}
    background-color: ${bgColor && color.surface[bgColor]?.hex};
    font-family: "Pretendard400";
  `;
  return (
    <StyledFlexContainer className="flex-container" style={props.style}>
      {props.children}
    </StyledFlexContainer>
  );
};

export interface CardProps {
  heading?: TypographyProps;
  title?: TypographyProps;
  subTitle?: TypographyProps;
  body?: TypographyProps;
  containerStyle?: ContainerProps;
  style?: React.CSSProperties;
  children?: any;
}
export const CardTemplate = ({ heading, title, subTitle, body, ...props }: CardProps) => {
  return (
    <GridContainer {...props.containerStyle} style={props.style} spacing="80px">
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
