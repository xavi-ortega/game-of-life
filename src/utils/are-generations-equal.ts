/**
 * Compares two generations of alive cells to determine if they are equal.
 *
 * @param prevAliveCells - The previous generation of alive cells.
 * @param nextAliveCells - The next generation of alive cells.
 * @returns boolean
 */
export function areGenerationsEqual(
  prevAliveCells: Map<string, string>,
  nextAliveCells: Map<string, string>,
): boolean {
  if (prevAliveCells.size !== nextAliveCells.size) {
    return false;
  }

  for (const [key, color] of prevAliveCells) {
    if (nextAliveCells.get(key) !== color) {
      return false;
    }
  }

  return true;
}
