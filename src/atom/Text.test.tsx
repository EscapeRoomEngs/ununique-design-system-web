import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Body, Display, Heading, Title } from "./Text";

describe("Body", () => {
  it("uses static typography utility classes", () => {
    render(<Body fontStyle="Medium">본문</Body>);
    expect(screen.getByText("본문")).toHaveClass("text-[15px]");
  });

  it("keeps the legacy 14px Body default", () => {
    render(<Body>기본 본문</Body>);

    expect(screen.getByText("기본 본문")).toHaveClass("text-sm", "leading-[1.3]");
  });

  it("does not forward typography-only props to the DOM", () => {
    render(<Body fontColor="secondary" weight={500}>본문</Body>);
    const body = screen.getByText("본문");

    expect(body).not.toHaveAttribute("fontcolor");
    expect(body).not.toHaveAttribute("weight");
  });

  it("keeps the legacy Display fallback size for ExtraSmall", () => {
    render(<Display fontStyle="ExtraSmall">디스플레이</Display>);

    expect(screen.getByText("디스플레이")).toHaveClass("text-[44px]");
  });

  it("keeps the legacy Heading fallback size for ExtraSmall", () => {
    render(<Heading fontStyle="ExtraSmall">헤딩</Heading>);

    expect(screen.getByText("헤딩")).toHaveClass("text-4xl");
  });

  it("keeps the legacy Title fallback size for ExtraSmall", () => {
    render(<Title fontStyle="ExtraSmall">타이틀</Title>);

    expect(screen.getByText("타이틀")).toHaveClass("text-2xl");
  });
});
