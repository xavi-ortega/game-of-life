/**
 * Renders all alive cells on the canvas by drawing rectangles for each alive cell.
 *
 * @param ctx - The 2D rendering context of the canvas.
 * @param offsetX - The horizontal offset to start rendering from.
 * @param offsetY - The vertical offset to start rendering from.
 * @param cellSize - The size of each grid cell.
 * @param aliveCells - An iterator of alive cells represented as a Map iterator
 */
export function renderAliveCells(
  ctx: CanvasRenderingContext2D,
  offsetX: number,
  offsetY: number,
  cellSize: number,
  aliveCells: MapIterator<[string, string]>,
) {
  const cellsByColor = new Map<string, string[]>();

  /**
   * Groups alive cells by their respective colors. This approach modifies
   * the existing arrays using `push` to avoid the performance overhead of
   * creating a new array with `concat`. While directly mutating map values
   * like this is generally discouraged, it is necessary here for performance
   * reasons due to the large number of cells being processed.
   *
   * Tested with more than 300k cells:
   *
   * First approach (non-mutating, creating new array):
   *
   * const cells = cellsByColor.get(color);
   *
   * if (cells === undefined) {
   *   cellsByColor.set(color, [cell]);
   * } else {
   *   cellsByColor.set(color, cells.concat(cell));
   * }
   *
   * Result: ~72 seconds
   *
   * Current approach (mutating existing array)
   * Result: ~25 milliseconds (x2800) improvement
   */
  for (const [cell, color] of aliveCells) {
    if (cellsByColor.has(color)) {
      cellsByColor.get(color)!.push(cell);
    } else {
      cellsByColor.set(color, [cell]);
    }
  }

  for (const [color, cells] of cellsByColor.entries()) {
    ctx.fillStyle = color;
    ctx.beginPath();

    for (const cell of cells) {
      const [row, col] = cell.split(",").map(Number);
      const x = offsetX + col * cellSize;
      const y = offsetY + row * cellSize;

      ctx.rect(x, y, cellSize, cellSize);
    }

    ctx.fill();
  }
}
