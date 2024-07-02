import styled from "styled-components";
import { color } from "../foundation/color";
import { layout } from "../foundation/layout";
import { Body, Heading, Title, TypographyProps } from "./Text";

interface ContainerProps {
  display?: "grid" | "flex";
  direction?: "row" | "column";
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-evenly" | "stretch";
  align?: "flex-start" | "center" | "flex-end" | "space-between" | "space-evenly" | "stretch";
  spacing?: string;
  radius?: number;
  bgColor?: "primary" | "secondary" | "tertiary" | "invert" | "brand";
  borderColor?: "default" | "hover" | "focused" | "disabled" | "error";
  children?: any;
}

export const Container = ({
  display = "grid",
  direction,
  justify = "flex-start",
  align = "center",
  spacing = "16px",
  radius,
  bgColor,
  ...props
}: ContainerProps) => {
  const StyledContainer = styled.div`
    ${display === "grid"
      ? layout.grid({ justify, align, spacing })
      : layout.flex({ justify, align, spacing, direction })}
    background-color: ${bgColor ? color.surface[bgColor]?.hex : "transparent"};
    border-radius: ${radius || 0}px;
    font-family: "Pretendard400";
  `;
  return (
    <StyledContainer className="grid-container" {...props}>
      {props.children}
    </StyledContainer>
  );
};
// TODO: Example 삭제 예정
export interface CardProps extends ContainerProps {
  heading?: TypographyProps;
  title?: TypographyProps;
  subTitle?: TypographyProps;
  body?: TypographyProps;
  children?: any;
}
export const CardTemplate = ({ heading, title, subTitle, body, ...props }: CardProps) => {
  return (
    <Container spacing="80px" {...props}>
      <Heading>{heading?.children}</Heading>
      <Container spacing="40px">
        <Heading fontStyle={title?.fontStyle}>{title?.children}</Heading>
        <Container spacing="32px">
          <Title fontStyle={subTitle?.fontStyle}>{subTitle?.children}</Title>
          <Container spacing="24px">
            <Body fontStyle={body?.fontStyle}>{body?.children}</Body>
            {props.children}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
