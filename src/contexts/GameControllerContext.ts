import { createContext, type Dispatch, type SetStateAction } from "react";

interface GameControllerContextProps {
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  delay: number;
  setDelay: Dispatch<SetStateAction<number>>;
  rows: number;
  setRows: Dispatch<SetStateAction<number>>;
  columns: number;
  setColumns: Dispatch<SetStateAction<number>>;
  drawGrid: boolean;
  setDrawGrid: Dispatch<SetStateAction<boolean>>;
  aliveCells: Map<string, string>;
  setAliveCells: Dispatch<SetStateAction<Map<string, string>>>;
}

/**
 * Context for managing the state and controls of the Game of Life.
 */
export const GameControllerContext = createContext<
  GameControllerContextProps | undefined
>(undefined);
