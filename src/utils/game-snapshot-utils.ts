interface GameState {
  rows: number;
  columns: number;
  aliveCells: Array<[string, string]>;
}

/**
 * Serializes the current game state into a JSON object.
 * @param state - The game state object.
 * @returns A serialized JSON object representing the game state.
 */
export function serializeGameState(state: GameState): string {
  return JSON.stringify(state, null, 2);
}

/**
 * Deserializes a JSON object into the game state.
 * @param rawData - The serialized game state
 * @returns A deserialized game state.
 * @throws Error if the JSON format is invalid.
 */
export function deserializeGameState(rawData: string): GameState {
  const data = JSON.parse(rawData);

  if (
    typeof data.rows !== "number" ||
    typeof data.columns !== "number" ||
    !Array.isArray(data.aliveCells)
  ) {
    throw new Error("Invalid game state format");
  }

  return data;
}
