export const fontWeights = {
  300: "Pretendard300",
  400: "Pretendard400",
  500: "Pretendard500",
  600: "Pretendard600",
};
export const typography = {
  display: {
    style: {
      Large: { usageWeb: "display1", usageMobile: "displayLarge", webSize: 48, mobileSize: 38 },
      Medium: { usageWeb: "display2", usageMobile: "displayMedium", webSize: 44, mobileSize: 35 },
      Small: { usageWeb: "display3", usageMobile: "displaySmall", webSize: 40, mobileSize: 32 },
    },
    weight: 600,
    lineHeight: "130%",
    letterSpacing: "0%",
    description: "Display는 화면에서 가장 큰 텍스트이며 주로 마케팅 용도로 사용합니다.",
  },
  heading: {
    style: {
      Large: { usageWeb: "h1", usageMobile: "headlineLarge", webSize: 36, mobileSize: 29 },
      Medium: { usageWeb: "h2", usageMobile: "headlineMedium", webSize: 33, mobileSize: 27 },
      Small: { usageWeb: "h3", usageMobile: "headlineSmall", webSize: 30, mobileSize: 25 },
    },
    weight: 600,
    lineHeight: "130%",
    letterSpacing: "0%",
    description: "Heading은 페이지 단위 타이틀에 사용합니다.",
  },
  title: {
    style: {
      Large: { usageWeb: "h4", usageMobile: "titleLarge", webSize: 27, mobileSize: 23 },
      Medium: { usageWeb: "h5", usageMobile: "titleMedium", webSize: 24, mobileSize: 21 },
      Small: { usageWeb: "h6", usageMobile: "titleSmall", webSize: 21, mobileSize: 19 },
    },
    weight: 600,
    lineHeight: "130%",
    letterSpacing: "0%",
    description: "Title은 템블릿 단위의 역할 및 기능을 강조할 때 사용합니다.",
  },
  body: {
    style: {
      Large: { usageWeb: "p1", usageMobile: "bodyLarge", webSize: 18, mobileSize: 17 },
      Medium: { usageWeb: "p2", usageMobile: "bodyMedium", webSize: 15, mobileSize: 15 },
      Small: { usageWeb: "p3", usageMobile: "bodySmall", webSize: 14, mobileSize: 13 },
      ExtraSmall: { usageWeb: "p4", usageMobile: "bodyExtraSmall", webSize: 13, mobileSize: 12 },
    },
    weight: 400,
    lineHeight: "130%",
    letterSpacing: "0%",
    description: "P/body는 본문 텍스트에 사용합니다.",
  },
  lable: {
    style: {
      Large: { usageWeb: "label1", usageMobile: "labelLarge", webSize: 18, mobileSize: 17 },
      Medium: { usageWeb: "label2", usageMobile: "labelMedium", webSize: 15, mobileSize: 15 },
      Small: { usageWeb: "label3", usageMobile: "labelSmall", webSize: 13, mobileSize: 13 },
    },
    weight: 600,
    lineHeight: "130%",
    letterSpacing: "0%",
    description: "Lable은 구성요소 내부 텍스트로 사용합니다. (예: Button, Chips ...)",
  },
};
