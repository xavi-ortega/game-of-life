import { isValidInteger } from "./is-valid-integer";

describe("isValidNumber", () => {
  it("should return true for valid numbers", () => {
    expect(isValidInteger("42")).toBe(true);
    expect(isValidInteger("0")).toBe(true);
    expect(isValidInteger("-123.45")).toBe(true);
  });

  it("should return false for non-numbers", () => {
    expect(isValidInteger("12a")).toBe(false);
    expect(isValidInteger("b4c5")).toBe(false);
    expect(isValidInteger(null)).toBe(false);
    expect(isValidInteger(undefined)).toBe(false);
    expect(isValidInteger([])).toBe(false);
    expect(isValidInteger({})).toBe(false);
  });

  it("should return false for NaN and Infinity", () => {
    expect(isValidInteger(NaN)).toBe(false);
    expect(isValidInteger(Infinity)).toBe(false);
    expect(isValidInteger(-Infinity)).toBe(false);
  });
});
