import { findMostPrevalentString } from "./find-most-prevalent-string";
import { obtainNeighbourRelations } from "./obtain-neighbour-relations";

/**
 * Calculates the next generation of alive cells in a Game of Life grid.
 *
 * This function computes the state of cells in the next generation based on Conway's Game of Life rules:
 * - **Birth**: A dead cell becomes alive if it has exactly 3 alive neighbors.
 * - **Survival**: An alive cell remains alive if it has 2 or 3 alive neighbors.
 *
 * The function also considers the most prevalent color among neighbors for new cells during the "birth" process.
 *
 * @param currentCells - A `Map` representing the current generation of cells.
 * @param rows - The number of rows in the grid.
 * @param columns - The number of columns in the grid.
 * @returns A new `Map` representing the next generation of cells.
 */
export function calculateNextGeneration(
  currentCells: Map<string, string>,
  rows: number,
  columns: number,
) {
  const nextCells = new Map<string, string>();

  const neighborColors = obtainNeighbourRelations(currentCells);

  for (const [key, colors] of neighborColors) {
    const [row, col] = key.split(",").map(Number);

    // if it's in board bounds
    if (row >= 0 && row < rows && col >= 0 && col < columns) {
      const neighborCount = colors.length;
      const color = currentCells.get(key);
      const isAlive = color !== undefined;

      // Birth: exactly 3 neighbors
      if (!isAlive && neighborCount === 3) {
        nextCells.set(key, findMostPrevalentString(colors));
      }

      // Survival: 2 or 3 neighbors
      if (isAlive && (neighborCount === 2 || neighborCount === 3)) {
        nextCells.set(key, color);
      }
    }
  }

  return nextCells;
}
