export const typography = {
  weight: {
    300: "Pretendard300",
    400: "Pretendard400",
    500: "Pretendard500",
    600: "Pretendard600",
  },
  usage: {
    display: {
      styles: {
        display1: { style: "Large", webSize: 48, mobileSize: 38 },
        display2: { style: "Medium", webSize: 44, mobileSize: 35 },
        display3: { style: "Small", webSize: 40, mobileSize: 32 },
      },
      weight: 500,
      lineHeight: "130%",
      letterSpacing: "0%",
      description: "Display는 화면에서 가장 큰 텍스트이며 주로 마케팅 용도로 사용합니다.",
    },
    heading: {
      styles: {
        h1: { style: "Large", webSize: 36, mobileSize: 29 },
        h2: { style: "Medium", webSize: 33, mobileSize: 27 },
        h3: { style: "Small", webSize: 30, mobileSize: 25 },
      },
      weight: 500,
      lineHeight: "130%",
      letterSpacing: "0%",
      description: "Heading은 페이지 단위 타이틀에 사용합니다.",
    },
    title: {
      styles: {
        h4: { style: "Large", webSize: 27, mobileSize: 23 },
        h5: { style: "Medium", webSize: 24, mobileSize: 21 },
        h6: { style: "Small", webSize: 21, mobileSize: 19 },
      },
      weight: 500,
      lineHeight: "130%",
      letterSpacing: "0%",
      description: "Title은 템블릿 단위의 역할 및 기능을 강조할 때 사용합니다.",
    },
    body: {
      styles: {
        p1: { style: "Large", webSize: 18, mobileSize: 17 },
        p2: { style: "Medium", webSize: 15, mobileSize: 15 },
        p3: { style: "Small", webSize: 14, mobileSize: 13 },
        p4: { style: "ExtraSmall", webSize: 13, mobileSize: 12 },
      },
      weight: 400,
      lineHeight: "130%",
      letterSpacing: "0%",
      description: "P/body는 본문 텍스트에 사용합니다.",
    },
    lable: {
      styles: {
        lable1: { style: "Large", webSize: 18, mobileSize: 17 },
        lable2: { style: "Medium", webSize: 15, mobileSize: 15 },
        lable3: { style: "Small", webSize: 13, mobileSize: 13 },
      },
      weight: 500,
      lineHeight: "130%",
      letterSpacing: "0%",
      description: "Lable은 구성요소 내부 텍스트로 사용합니다. (예: Button, Chips ...)",
    },
  },
};
