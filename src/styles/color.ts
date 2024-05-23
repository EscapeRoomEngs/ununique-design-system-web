/**
 * Gray Scales
 */
const gray = {
  0: "#ffffff",
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#e6e6e6",
  300: "#d1d1d1",
  400: "#bfbfbf",
  500: "#a0a0a0",
  600: "#777777",
  700: "#636363",
  800: "#444444",
  900: "#232527",
  999: "#000000",
};
const navy = {
  50: "#f1f5f9",
  100: "#e2e8f0",
  200: "#cbd5e1",
  300: "#becad9",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a",
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
  200: "65EFFA",
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
  primary: gray[900],
  secondary: gray[700],
  placeholder: gray[500],
  invert: gray[0],
  negative: red[500],
  positive: blue[500],
};
const icon = {
  default: gray[900],
  secondary: gray[600],
  tertiary: gray[300],
  disabled: gray[500],
  invert: gray[0],
};
const border = {
  default: gray[300],
  hover: gray[500],
  focused: gray[800],
  disabled: gray[200],
  error: red[600],
};
const divider = {
  default: gray[200],
  strong: gray[400],
};
const surface = {
  primary: gray[0],
  secondary: gray[50],
  tertiary: gray[100],
  invert: gray[900],
  brand: blue[500],
};

export const color = { text, icon, border, divider, surface };
