/**
 * Gray Scales
 */
const gray = {
  0: "#FFFFFF",
  50: "#FAFAFA",
  100: "#F5F5F5",
  200: "#E6E6E6",
  300: "#D1D1D1",
  400: "#BFBFBF",
  500: "#A0A0A0",
  600: "#777777",
  700: "#636363",
  800: "#444444",
  900: "#232527",
  999: "#000000",
};
const navy = {
  50: "#F1F5F9",
  100: "#E2E8F0",
  200: "#CBD5E1",
  300: "#BECAD9",
  400: "#94A3B8",
  500: "#64748B",
  600: "#475569",
  700: "#334155",
  800: "#1E293B",
  900: "#0F172A",
};
const red = {
  50: "#FFEEF0",
  100: "#FFD7D6",
  200: "#FFBABA",
  300: "#FF9195",
  400: "#FF6973",
  500: "#FF4053",
  600: "#FF1836",
  700: "#D9092B",
  800: "#B30024",
  900: "#8C0021",
};
const blue = {
  50: "#DEFFFC",
  100: "#98FDFC",
  200: "#65EFFA",
  300: "#3EDBF5",
  400: "#02BCEF",
  500: "#0192CD",
  600: "#016EAC",
  700: "#004E8A",
  800: "#003872",
  900: "#06213E",
};
export const palette = { gray, navy, red, blue };

const text = {
  primary: {
    styleNm: "Primary",
    palette: "gray",
    depth: 900,
    hex: gray[900],
    description: "기본 텍스트 색상입니다. 콘텐츠에 대해 읽기 쉬운 대비를 제공합니다",
  },
  secondary: {
    styleNm: "Secondary",
    palette: "gray",
    depth: 700,
    hex: gray[700],
    description:
      "두번째 위계의 텍스트 색상입니다. 상대적으로 덜 중요한 정보에 사용합니다.\n또는 정보량이 많아 Font-Weight으로 위계 구분을 할 수 없을 때 사용할 수 있습니다.",
  },
  placeholder: {
    styleNm: "Placeholder",
    palette: "gray",
    depth: 500,
    hex: gray[500],
    description:
      "가장 약한 텍스트 색상입니다.\n상호 작용이 불가능한 비활성화 텍스트 또는 플레이스 홀더, 캡션에 사용합니다.",
  },
  invert: {
    styleNm: "Invert",
    palette: "gray",
    depth: 0,
    hex: gray[0],
    description: "반전 텍스트 색상입니다. 배경이 어두운 경우 사용합니다.",
  },
  negative: {
    styleNm: "Negative",
    palette: "red",
    depth: 500,
    hex: red[500],
    description: "부정의 텍스트 색상입니다.\n경고할 때 사용할 수 있습니다.",
  },
  positive: {
    styleNm: "Positive",
    palette: "blue",
    depth: 500,
    hex: blue[500],
    description: "긍정의 텍스트 색상입니다.\n~할 때 사용할 수 있습니다.",
  },
};
const icon = {
  default: {
    styleNm: "Default",
    palette: "gray",
    depth: 900,
    hex: gray[900],
    description: "기본 아이콘 색상입니다.",
  },
  sub: {
    styleNm: "Sub",
    palette: "gray",
    depth: 600,
    hex: gray[600],
    description: "두 번째 위계의 아이콘 색상입니다.",
  },
  tertiary: {
    styleNm: "Tertiary",
    palette: "gray",
    depth: 300,
    hex: gray[300],
    description: "세 번째 위계의 아이콘 색상입니다.",
  },
  disabled: {
    styleNm: "Disabled",
    palette: "gray",
    depth: 500,
    hex: gray[500],
    description: "상호 작용이 불가능한 비활성화된 아이콘 색상입니다.",
  },
  invert: {
    styleNm: "Invert",
    palette: "gray",
    depth: 0,
    hex: gray[0],
    description: "반전 아이콘 색상입니다.",
  },
};
const border = {
  default: {
    styleNm: "Default",
    palette: "gray",
    depth: 300,
    hex: gray[300],
    description: "기본 테두리 색상입니다.",
  },
  hover: {
    styleNm: "Hover",
    palette: "gray",
    depth: 500,
    hex: gray[500],
    description: "Hover 테두리 색상입니다.(Web에서만 사용)",
  },
  focused: {
    styleNm: "Focused",
    palette: "gray",
    depth: 800,
    hex: gray[800],
    description: "선택된 테두리 색상입니다.",
  },
  disabled: {
    styleNm: "Disabled",
    palette: "gray",
    depth: 200,
    hex: gray[200],
    description: "상호 작용이 불가능한 비활성화된 테두리 색상입니다.",
  },
  error: {
    styleNm: "Error",
    palette: "red",
    depth: 600,
    hex: red[600],
    description: "상호 작용이 불가능한 비활성화된 테두리 색상입니다.",
  },
};
const divider = {
  default: {
    styleNm: "Default",
    palette: "gray",
    depth: 200,
    hex: gray[200],
    description: "기본 구분선 색상입니다.",
  },
  strong: {
    styleNm: "Strong",
    palette: "gray",
    depth: 400,
    hex: gray[400],
    description: "특정 부분을 강조하기 위한 구분선 색상입니다.",
  },
};
const surface = {
  primary: {
    styleNm: "Primary",
    palette: "gray",
    depth: 0,
    hex: gray[0],
    description: "기본 표면 색상입니다.",
  },
  secondary: {
    styleNm: "Secondary",
    palette: "gray",
    depth: 50,
    hex: gray[50],
    description:
      "기본 배경 색상에서 특정 레이어를 분리해야 할 때 사용합니다.\n또는 하나의 레이어에서 정보 그룹 Container로 사용할 수 있습니다.",
  },
  tertiary: {
    styleNm: "Tertiary",
    palette: "gray",
    depth: 100,
    hex: gray[100],
    description:
      "기본 배경 색상에서 특정 레이어를 분리해야 할 때 사용합니다.\nBg_light보다 더 강하게 구분이 필요할 때 사용합니다.",
  },
  invert: {
    styleNm: "Invert",
    palette: "gray",
    depth: 900,
    hex: gray[900],
    description: "-",
  },
  brand: {
    styleNm: "Brand",
    palette: "blue",
    depth: 500,
    hex: blue[500],
    description: "-",
  },
};
export const color = { text, icon, border, divider, surface };
