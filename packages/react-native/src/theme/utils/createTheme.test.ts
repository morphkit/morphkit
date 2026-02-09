import { createTheme } from "./createTheme";
import { themes, type Theme } from "../theme";
import * as primitive from "../tokens/primitive/typography";

describe("createTheme", () => {
  it("returns light and dark themes when called with no overrides", () => {
    const result = createTheme();
    expect(result).toHaveProperty("light");
    expect(result).toHaveProperty("dark");
  });

  it("returns themes matching base themes when no overrides provided", () => {
    const result = createTheme({});
    expect(result.light.semantic.colors).toEqual(themes.light.semantic.colors);
    expect(result.dark.semantic.colors).toEqual(themes.dark.semantic.colors);
  });

  it("preserves primitive tokens in both themes", () => {
    const result = createTheme();
    expect(result.light.primitive.fontSize).toEqual(
      themes.light.primitive.fontSize,
    );
    expect(result.dark.primitive.fontSize).toEqual(
      themes.dark.primitive.fontSize,
    );
  });

  it("preserves component tokens in both themes", () => {
    const result = createTheme();
    expect(result.light.component).toEqual(themes.light.component);
    expect(result.dark.component).toEqual(themes.dark.component);
  });

  describe("font overrides", () => {
    it("applies display font from largeTitle override", () => {
      const result = createTheme({
        fonts: { largeTitle: "CustomDisplay" },
      });
      expect(result.light.semantic.fontFamilies.display).toBe("CustomDisplay");
      expect(result.dark.semantic.fontFamilies.display).toBe("CustomDisplay");
    });

    it("applies body font family override", () => {
      const result = createTheme({
        fonts: { body: "CustomBody" },
      });
      expect(result.light.semantic.fontFamilies.body).toBe("CustomBody");
      expect(result.dark.semantic.fontFamilies.body).toBe("CustomBody");
    });

    it("applies mono font family override", () => {
      const result = createTheme({
        fonts: { mono: "CustomMono" },
      });
      expect(result.light.semantic.fontFamilies.mono).toBe("CustomMono");
      expect(result.dark.semantic.fontFamilies.mono).toBe("CustomMono");
    });

    it("applies variant-specific font to text styles", () => {
      const result = createTheme({
        fonts: { heading: "HeadingFont" },
      });
      expect(result.light.semantic.textStyles.heading.fontFamily).toBe(
        "HeadingFont",
      );
      expect(result.dark.semantic.textStyles.heading.fontFamily).toBe(
        "HeadingFont",
      );
    });

    it("applies font override to each typography variant", () => {
      const fonts = {
        largeTitle: "LargeTitleFont",
        title1: "Title1Font",
        title2: "Title2Font",
        title3: "Title3Font",
        heading: "HeadingFont",
        body: "BodyFont",
        callout: "CalloutFont",
        subhead: "SubheadFont",
        footnote: "FootnoteFont",
        caption1: "Caption1Font",
        caption2: "Caption2Font",
      };
      const result = createTheme({ fonts });

      expect(result.light.semantic.textStyles.largeTitle.fontFamily).toBe(
        "LargeTitleFont",
      );
      expect(result.light.semantic.textStyles.title1.fontFamily).toBe(
        "Title1Font",
      );
      expect(result.light.semantic.textStyles.title2.fontFamily).toBe(
        "Title2Font",
      );
      expect(result.light.semantic.textStyles.title3.fontFamily).toBe(
        "Title3Font",
      );
      expect(result.light.semantic.textStyles.heading.fontFamily).toBe(
        "HeadingFont",
      );
      expect(result.light.semantic.textStyles.body.fontFamily).toBe("BodyFont");
      expect(result.light.semantic.textStyles.callout.fontFamily).toBe(
        "CalloutFont",
      );
      expect(result.light.semantic.textStyles.subhead.fontFamily).toBe(
        "SubheadFont",
      );
      expect(result.light.semantic.textStyles.footnote.fontFamily).toBe(
        "FootnoteFont",
      );
      expect(result.light.semantic.textStyles.caption1.fontFamily).toBe(
        "Caption1Font",
      );
      expect(result.light.semantic.textStyles.caption2.fontFamily).toBe(
        "Caption2Font",
      );
    });

    it("uses default font when variant-specific font is not provided", () => {
      const result = createTheme({
        fonts: { body: "CustomBody" },
      });
      expect(result.light.semantic.textStyles.largeTitle.fontFamily).toBe(
        themes.light.semantic.textStyles.largeTitle.fontFamily,
      );
    });

    it("preserves text style metrics when applying font overrides", () => {
      const result = createTheme({
        fonts: { body: "CustomBody" },
      });
      expect(result.light.semantic.textStyles.body.fontSize).toBe(
        primitive.fontSize.xl,
      );
      expect(result.light.semantic.textStyles.body.fontWeight).toBe(
        primitive.fontWeight.regular,
      );
      expect(result.light.semantic.textStyles.body.lineHeight).toBe(
        primitive.fontSize.xl * primitive.lineHeight.relaxed,
      );
    });
  });

  describe("light theme overrides", () => {
    it("applies partial light theme color overrides", () => {
      const customColor = "#FF0000";
      const result = createTheme({
        light: {
          semantic: {
            colors: {
              action: { primary: customColor },
            },
          },
        },
      });
      expect(
        (result.light.semantic.colors as Record<string, Record<string, string>>)
          .action.primary,
      ).toBe(customColor);
    });

    it("does not affect dark theme when only light overrides provided", () => {
      const result = createTheme({
        light: {
          semantic: {
            colors: {
              action: { primary: "#FF0000" },
            },
          },
        },
      });
      expect(result.dark.semantic.colors).toEqual(themes.dark.semantic.colors);
    });
  });

  describe("dark theme overrides", () => {
    it("applies partial dark theme overrides", () => {
      const customColor = "#00FF00";
      const result = createTheme({
        dark: {
          semantic: {
            colors: {
              action: { primary: customColor },
            },
          },
        },
      });
      expect(
        (result.dark.semantic.colors as Record<string, Record<string, string>>)
          .action.primary,
      ).toBe(customColor);
    });

    it("does not affect light theme when only dark overrides provided", () => {
      const result = createTheme({
        dark: {
          semantic: {
            colors: {
              action: { primary: "#00FF00" },
            },
          },
        },
      });
      expect(result.light.semantic.colors).toEqual(
        themes.light.semantic.colors,
      );
    });
  });

  describe("combined overrides", () => {
    it("applies fonts, light, and dark overrides together", () => {
      const result = createTheme({
        fonts: { body: "Inter" },
        light: {
          semantic: {
            colors: {
              action: { primary: "#AAAAAA" },
            },
          },
        },
        dark: {
          semantic: {
            colors: {
              action: { primary: "#BBBBBB" },
            },
          },
        },
      });

      expect(result.light.semantic.fontFamilies.body).toBe("Inter");
      expect(result.dark.semantic.fontFamilies.body).toBe("Inter");
      expect(
        (result.light.semantic.colors as Record<string, Record<string, string>>)
          .action.primary,
      ).toBe("#AAAAAA");
      expect(
        (result.dark.semantic.colors as Record<string, Record<string, string>>)
          .action.primary,
      ).toBe("#BBBBBB");
    });
  });

  describe("no fonts provided", () => {
    it("does not modify text styles when fonts is undefined", () => {
      const result = createTheme({ light: {}, dark: {} });
      expect(result.light.semantic.textStyles).toEqual(
        themes.light.semantic.textStyles,
      );
      expect(result.dark.semantic.textStyles).toEqual(
        themes.dark.semantic.textStyles,
      );
    });

    it("does not modify font families when fonts is undefined", () => {
      const result = createTheme({});
      expect(result.light.semantic.fontFamilies).toEqual(
        themes.light.semantic.fontFamilies,
      );
    });
  });
});
