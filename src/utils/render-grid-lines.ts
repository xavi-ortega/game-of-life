import { GRID_COLOR } from "../constants";

/**
 * Renders a grid in the canvas. The grid is defined by the number of rows and columns,
 * and its position is offset to allow for centering within the canvas.
 *
 * @param ctx - The 2D rendering context of the canvas.
 * @param cellSize - The size of each grid cell.
 * @param offsetX - The horizontal offset to start rendering from.
 * @param offsetY - The vertical offset to start rendering from.
 * @param gridWidth - The total width of the grid.
 * @param gridHeight - The total height of the grid.
 * @param rows - The number of rows in the grid.
 * @param columns - The number of columns in the grid.
 */
export function renderGridLines(
  ctx: CanvasRenderingContext2D,
  cellSize: number,
  offsetX: number,
  offsetY: number,
  gridWidth: number,
  gridHeight: number,
  rows: number,
  columns: number,
) {
  ctx.strokeStyle = GRID_COLOR;
  ctx.beginPath();

  for (let row = 0; row <= rows; row++) {
    const y = offsetY + row * cellSize;
    ctx.moveTo(offsetX, y);
    ctx.lineTo(offsetX + gridWidth, y);
  }

  for (let col = 0; col <= columns; col++) {
    const x = offsetX + col * cellSize;
    ctx.moveTo(x, offsetY);
    ctx.lineTo(x, offsetY + gridHeight);
  }

  ctx.stroke();
}
