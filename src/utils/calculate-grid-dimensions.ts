/**
 * Calculates the size of grid cells and determines the dimensions and offsets
 * needed to center a grid within the canvas. This ensures that the grid cells
 * remain square and the grid is properly aligned in the available space.
 *
 * @param canvas - The target HTMLCanvasElement used for drawing the grid.
 * @param rows - The number of rows in the grid.
 * @param columns - The number of columns in the grid.
 * @returns An object containing the calculated sizes of the grid.
 */
export function calculateGridDimensions(
  canvas: HTMLCanvasElement,
  rows: number,
  columns: number,
) {
  const cellWidth = canvas.width / columns;
  const cellHeight = canvas.height / rows;
  const cellSize = Math.min(cellWidth, cellHeight);

  const gridWidth = cellSize * columns;
  const gridHeight = cellSize * rows;

  const offsetX = (canvas.width - gridWidth) / 2;
  const offsetY = (canvas.height - gridHeight) / 2;

  return { cellSize, offsetX, offsetY, gridWidth, gridHeight };
}
