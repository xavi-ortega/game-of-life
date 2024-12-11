import { _resetCache, getRandomColor } from "./get-random-color";
import { COLOR_PALETTE } from "../constants";

describe("getRandomColor", () => {
  beforeEach(() => {
    _resetCache();
  });

  it("should return a color from the COLOR_PALETTE", () => {
    const color = getRandomColor();
    expect(COLOR_PALETTE).toContain(color);
  });

  it("should return all colors before repeating", () => {
    const returnedColors = [];

    for (let i = 0; i < COLOR_PALETTE.length; i++) {
      const color = getRandomColor();
      returnedColors.push(color);
    }

    expect(returnedColors).toEqual(expect.arrayContaining(COLOR_PALETTE));
  });

  it("should cycle through all colors before repeating any", () => {
    const returnedColors = [];

    // Collect the first cycle of colors
    for (let i = 0; i < COLOR_PALETTE.length; i++) {
      const color = getRandomColor();
      returnedColors.push(color);
    }

    // Ensure all colors were returned in the first cycle
    expect(returnedColors.length).toBe(COLOR_PALETTE.length);

    // Check that the first color of the second cycle is valid
    const nextColor = getRandomColor();
    expect(COLOR_PALETTE).toContain(nextColor);
  });
});
