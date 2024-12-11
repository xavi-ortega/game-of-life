/**
 * Identifies the cell that was clicked based on mouse position.
 * @param mouseX - The relative X coordinate of the mouse click.
 * @param mouseY - The relative Y coordinate of the mouse click.
 * @param offsetX - The X offset of the grid.
 * @param offsetY - The Y offset of the grid.
 * @param cellSize - The size of each grid cell.
 * @param rows - The number of rows in the grid.
 * @param columns - The number of columns in the grid.
 * @returns The key of the cell
 */
export function identifyCoordinateFromPosition(
  mouseX: number,
  mouseY: number,
  offsetX: number,
  offsetY: number,
  cellSize: number,
  rows: number,
  columns: number,
): string | undefined {
  const col = Math.floor((mouseX - offsetX) / cellSize);
  const row = Math.floor((mouseY - offsetY) / cellSize);

  if (col < 0 || col >= columns || row < 0 || row >= rows) {
    return;
  }

  return [row, col].join(",");
}
