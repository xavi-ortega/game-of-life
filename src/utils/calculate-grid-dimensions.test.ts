import { calculateGridDimensions } from "./calculate-grid-dimensions";

describe("calculateGrid", () => {
  const mockCanvas = {
    width: 1000,
    height: 1000,
  } as HTMLCanvasElement;

  it("should calculate a squared grid when rows and columns are equal", () => {
    const { cellSize, offsetX, offsetY, gridWidth, gridHeight } =
      calculateGridDimensions(mockCanvas, 10, 10);

    expect(cellSize).toBe(100);
    expect(gridWidth).toBe(1000);
    expect(gridHeight).toBe(1000);
    expect(offsetX).toBe(0);
    expect(offsetY).toBe(0);
  });

  it("should calculate a horizontally centered rectangular grid when there are less columns than rows", () => {
    const { cellSize, offsetX, offsetY, gridWidth, gridHeight } =
      calculateGridDimensions(mockCanvas, 10, 5);

    expect(cellSize).toBe(100);
    expect(gridWidth).toBe(500);
    expect(gridHeight).toBe(1000);
    expect(offsetX).toBe(250);
    expect(offsetY).toBe(0);
  });

  it("should calculate a vertically centered rectangular grid when there are less rows than columns", () => {
    const { cellSize, offsetX, offsetY, gridWidth, gridHeight } =
      calculateGridDimensions(mockCanvas, 5, 10);

    expect(cellSize).toBe(100);
    expect(gridWidth).toBe(1000);
    expect(gridHeight).toBe(500);
    expect(offsetX).toBe(0);
    expect(offsetY).toBe(250);
  });
});
