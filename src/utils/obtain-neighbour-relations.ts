/**
 * Calculates the neighbor cells and their associated colors for a given map of alive cells.
 *
 * @param currentCells - A `Map` representing the current generation of cells.
 * @returns A `Map` where the key represents the coordinates of an alive cell, and the value
 * of all the surrounding cells colors. That allows to calculate the neighbor count and most prevalent color.
 */
export function obtainNeighbourRelations(currentCells: Map<string, string>) {
  const neighborColors = new Map<string, string[]>();

  // Count neighbors for all alive cells and their neighbors
  for (const [key, color] of currentCells) {
    const [row, col] = key.split(",").map(Number);

    for (let dRow = -1; dRow <= 1; dRow++) {
      for (let dCol = -1; dCol <= 1; dCol++) {
        if (dRow === 0 && dCol === 0) continue; // Skip the cell itself

        const neighborKey = `${row + dRow},${col + dCol}`;

        /**
         * Same approach as `renderAliveCells`.
         *
         * Tested with more thn 300k cells, and improves from 1.5 seconds to 1 second
         * by directly modifying the array instead of creating a new one.
         */
        if (neighborColors.has(neighborKey)) {
          neighborColors.get(neighborKey)!.push(color);
        } else {
          neighborColors.set(neighborKey, [color]);
        }
      }
    }
  }

  return neighborColors;
}
