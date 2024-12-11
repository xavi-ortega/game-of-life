import { findMostPrevalentString } from "./find-most-prevalent-string";

describe("findMostPrevalentString", () => {
  it("should return the most prevalent string in a basic array", () => {
    const colors = ["red", "blue", "red", "green", "red"];
    const result = findMostPrevalentString(colors);
    expect(result).toBe("red");
  });

  it("should handle an array with one string", () => {
    const colors = ["purple"];
    const result = findMostPrevalentString(colors);
    expect(result).toBe("purple");
  });

  it("should handle an array with a tie for the most prevalent string", () => {
    const colors = ["orange", "orange", "pink", "pink"];
    const result = findMostPrevalentString(colors);
    expect("orange").toContain(result); // the first one is chosen
  });

  it("should throw error when the array is empty", () => {
    const colors: string[] = [];
    expect(() => findMostPrevalentString(colors)).toThrow("The array is empty");
  });
});
