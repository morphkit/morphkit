import { merge } from "./merge";

describe("merge", () => {
  it("returns empty object when called with no sources", () => {
    const result = merge();
    expect(result).toEqual({});
  });

  it("returns shallow copy of single source", () => {
    const source = { a: 1, b: "hello" };
    const result = merge(source);
    expect(result).toEqual({ a: 1, b: "hello" });
  });

  it("merges two flat objects", () => {
    const result = merge({ a: 1, b: 2 }, { b: 3, c: 4 });
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("merges three flat objects left-to-right", () => {
    const result = merge({ a: 1 }, { a: 2, b: 2 }, { a: 3, c: 3 });
    expect(result).toEqual({ a: 3, b: 2, c: 3 });
  });

  it("deep merges nested objects", () => {
    const result = merge(
      { nested: { a: 1, b: 2 } },
      { nested: { b: 3, c: 4 } },
    );
    expect(result).toEqual({ nested: { a: 1, b: 3, c: 4 } });
  });

  it("deep merges multiple levels of nesting", () => {
    const result = merge(
      { level1: { level2: { level3: { a: 1 } } } },
      { level1: { level2: { level3: { b: 2 } } } },
    );
    expect(result).toEqual({
      level1: { level2: { level3: { a: 1, b: 2 } } },
    });
  });

  it("skips undefined values in source", () => {
    const result = merge({ a: 1, b: 2 }, { a: undefined, b: 3 });
    expect(result).toEqual({ a: 1, b: 3 });
  });

  it("overwrites arrays instead of merging them", () => {
    const result = merge({ items: [1, 2, 3] }, { items: [4, 5] });
    expect(result).toEqual({ items: [4, 5] });
  });

  it("overwrites non-plain objects as values", () => {
    const date = new Date("2024-01-01");
    const result = merge({ value: "old" }, { value: date });
    expect(result).toEqual({ value: date });
  });

  it("overwrites plain object with non-plain value", () => {
    const result = merge({ data: { a: 1 } }, { data: [1, 2] });
    expect(result).toEqual({ data: [1, 2] });
  });

  it("overwrites non-plain value with plain object", () => {
    const result = merge({ data: [1, 2] }, { data: { a: 1 } });
    expect(result).toEqual({ data: { a: 1 } });
  });

  it("handles null values as overrides", () => {
    const result = merge({ a: { b: 1 } }, { a: null });
    expect(result).toEqual({ a: null });
  });

  it("does not treat null as a plain object", () => {
    const result = merge({ a: null }, { a: { b: 1 } });
    expect(result).toEqual({ a: { b: 1 } });
  });

  it("preserves keys from base when override has no matching key", () => {
    const result = merge({ a: 1, b: 2 }, { c: 3 });
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("handles empty sources gracefully", () => {
    const result = merge({ a: 1 }, {}, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("handles boolean values", () => {
    const result = merge({ flag: true }, { flag: false });
    expect(result).toEqual({ flag: false });
  });

  it("handles number zero as a valid override", () => {
    const result = merge({ count: 5 }, { count: 0 });
    expect(result).toEqual({ count: 0 });
  });

  it("handles empty string as a valid override", () => {
    const result = merge({ name: "old" }, { name: "" });
    expect(result).toEqual({ name: "" });
  });

  it("handles complex theme-like structure", () => {
    const base = {
      colors: {
        primary: "#000",
        secondary: "#111",
        text: { heading: "#222", body: "#333" },
      },
      spacing: { sm: 4, md: 8 },
    };
    const override = {
      colors: {
        primary: "#FFF",
        text: { heading: "#EEE" },
      },
    };
    const result = merge(base, override);
    expect(result).toEqual({
      colors: {
        primary: "#FFF",
        secondary: "#111",
        text: { heading: "#EEE", body: "#333" },
      },
      spacing: { sm: 4, md: 8 },
    });
  });
});
