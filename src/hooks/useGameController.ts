import { useContext } from "react";
import { GameControllerContext } from "../contexts/GameControllerContext";

/**
 * This hook provides access to the game state and controls, allowing components
 * to interact with the game's grid, alive cells, and play controls.
 */
export function useGameController() {
  const gameController = useContext(GameControllerContext);

  if (gameController === undefined) {
    throw new Error(
      "useGameController must be used within GameControllerProvider",
    );
  }

  return gameController;
}
