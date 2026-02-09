import { getThemeColor, getThemeSpacing } from "./types";
import { themes } from "./theme";

describe("getThemeColor", () => {
  it("retrieves a top-level color", () => {
    const result = getThemeColor(themes.light, "text", "primary");
    expect(typeof result).toBe("string");
    expect(result).toBeTruthy();
  });

  it("retrieves a nested color path", () => {
    const result = getThemeColor(themes.light, "border", "primary");
    expect(typeof result).toBe("string");
  });

  it("retrieves action primary color", () => {
    const result = getThemeColor(themes.light, "action", "primary");
    expect(typeof result).toBe("string");
  });

  it("retrieves different values for light and dark themes", () => {
    const lightColor = getThemeColor(themes.light, "text", "primary");
    const darkColor = getThemeColor(themes.dark, "text", "primary");
    expect(lightColor).not.toBe(darkColor);
  });
});

describe("getThemeSpacing", () => {
  it("retrieves spacing by key", () => {
    const result = getThemeSpacing(themes.light, 4);
    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThan(0);
  });

  it("retrieves different spacing values for different keys", () => {
    const small = getThemeSpacing(themes.light, 1);
    const large = getThemeSpacing(themes.light, 8);
    expect(large).toBeGreaterThan(small);
  });

  it("returns zero for key 0", () => {
    const result = getThemeSpacing(themes.light, 0);
    expect(result).toBe(0);
  });
});
