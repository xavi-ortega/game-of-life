import { identifyCoordinateFromPosition } from "./identify-coordinate-from-position";

describe("identifyCoordinateFromPosition", () => {
  const offsetX = 50;
  const offsetY = 0;
  const coordinateSize = 25;
  const rows = 10;
  const columns = 6;

  it("should correctly identify the coordinate based on mouse position", () => {
    const mouseX = 50; // left edge of the board
    const mouseY = 100; // 4 coordinates from top

    const result = identifyCoordinateFromPosition(
      mouseX,
      mouseY,
      offsetX,
      offsetY,
      coordinateSize,
      rows,
      columns,
    );

    expect(result).toBe("4,0");
  });

  it("should handle edge cases on the grid boundaries", () => {
    const mouseX = 199; // 200 is out of bounds on the right
    const mouseY = 249; // 250 is out of bounds on the bottom

    const result = identifyCoordinateFromPosition(
      mouseX,
      mouseY,
      offsetX,
      offsetY,
      coordinateSize,
      rows,
      columns,
    );

    expect(result).toBe("9,5");
  });

  it("should return null if mouse is outside the grid", () => {
    const mouseX = 200;
    const mouseY = 250;

    const result = identifyCoordinateFromPosition(
      mouseX,
      mouseY,
      offsetX,
      offsetY,
      coordinateSize,
      rows,
      columns,
    );

    expect(result).toBeUndefined();
  });
});
