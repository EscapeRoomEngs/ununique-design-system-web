import { describe, expect, it } from "vitest";
import { primitives } from "./color";

describe("orange primitive palette", () => {
  it("exposes the complete Waiting RN-derived scale while preserving its documented anchors", () => {
    expect(primitives.orange).toEqual({
      50: "#fff8f3",
      100: "#fff2e9",
      200: "#ffd8c2",
      300: "#fb974b",
      400: "#ff6a21",
      500: "#ff3d00",
      600: "#e63600",
      700: "#bf2e00",
      800: "#982600",
      900: "#701d00",
    });
  });
});
