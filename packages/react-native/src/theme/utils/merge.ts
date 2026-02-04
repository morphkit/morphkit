import type { DeepPartial } from "./types";

type UnknownRecord = Record<string, unknown>;

const isPlainObject = (value: unknown): value is UnknownRecord => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};

export const merge = <T extends UnknownRecord>(
  ...sources: Array<DeepPartial<T> | Partial<T>>
): T => {
  const result: UnknownRecord = {};

  for (const source of sources) {
    for (const key in source) {
      const sourceValue = source[key];
      const resultValue = result[key];

      if (isPlainObject(sourceValue) && isPlainObject(resultValue)) {
        result[key] = merge(resultValue, sourceValue);
      } else if (sourceValue !== undefined) {
        result[key] = sourceValue;
      }
    }
  }

  return result as T;
};
