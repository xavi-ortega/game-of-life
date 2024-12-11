/**
 * Extracts the neighbor cells of a given cell from a map of cells.
 *
 * @param cells - A `Map` where the key represents the coordinates of an alive cell, and the value represents the color.
 * @param key - The key of the cell whose neighbors are to be extracted.
 * @returns A `Map` where the key represents the coordinates of a neighboring cell
 * and the value represents the color.
 */
export function extractNeighbors(cells: Map<string, string>, key: string) {
  const neighbors = new Map<string, string>();
  const [row, col] = key.split(",").map(Number);

  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      if (dRow === 0 && dCol === 0) continue; // Skip the cell itself

      const neighborKey = `${row + dRow},${col + dCol}`;
      const neighborColor = cells.get(neighborKey);

      if (neighborColor !== undefined) {
        neighbors.set(neighborKey, neighborColor);
      }
    }
  }

  return neighbors;
}
