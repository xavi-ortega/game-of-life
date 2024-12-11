import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { DEFAULT_COLUMNS, DEFAULT_DELAY, DEFAULT_ROWS } from "../constants";
import { GameControllerContext } from "../contexts/GameControllerContext";
import { calculateNextGeneration } from "../utils/calculate-next-generation";
import { toast } from "react-toastify";
import { areGenerationsEqual } from "../utils/are-generations-equal";

/**
 * A threshold to check for stagnation in cell count.
 * Represents how many iterations of the same population size are allowed before triggering the notification.
 */
const NO_ACTIVITY_THRESHOLD = 5;

/**
 * Provider component for the `GameControllerContext`.
 *
 * This component encapsulates the state management and logic for the Game of Life,
 * including grid configuration, game controls, and game state updates.
 */
export const GameControllerProvider = ({ children }: PropsWithChildren) => {
  const [playing, setPlaying] = useState(false);
  const [delay, setDelay] = useState(DEFAULT_DELAY);
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [drawGrid, setDrawGrid] = useState(true);
  const [aliveCells, setAliveCells] = useState(new Map<string, string>());

  const sameAmountOfCellsCountRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      return;
    }

    const updateGameState = (timestamp: number) => {
      if (lastUpdateTimeRef.current === null) {
        lastUpdateTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastUpdateTimeRef.current;

      if (elapsed >= delay) {
        const nextGeneration = calculateNextGeneration(
          aliveCells,
          rows,
          columns,
        );

        if (nextGeneration.size === 0) {
          toast.info("All the cells have been annihilated. The game is over!");
          setPlaying(false);
          return;
        }

        if (areGenerationsEqual(aliveCells, nextGeneration)) {
          toast.success("The cells have reached a stable, harmonic state!");
          setPlaying(false);
          return;
        }

        if (nextGeneration.size >= aliveCells.size * 1.5) {
          toast.info(
            "The cells are rapidly multiplying! 50% increase detected!",
          );
        }

        if (nextGeneration.size <= aliveCells.size * 0.5) {
          toast.warning("The cells are rapidly dying! 50% decrease detected!");
        }

        if (sameAmountOfCellsCountRef.current === NO_ACTIVITY_THRESHOLD) {
          toast.success(
            "The cells' population is neither increasing nor decreasing but remains dynamic!",
          );
        }

        if (aliveCells.size === nextGeneration.size) {
          sameAmountOfCellsCountRef.current++;
        } else {
          sameAmountOfCellsCountRef.current = 0;
        }

        setAliveCells(nextGeneration);
        lastUpdateTimeRef.current = timestamp;
      }

      if (playing) {
        animationFrameRef.current = requestAnimationFrame(updateGameState);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateGameState);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [playing, delay, rows, columns, aliveCells]);

  return (
    <GameControllerContext.Provider
      value={{
        playing,
        setPlaying,
        delay,
        setDelay,
        rows,
        setRows,
        columns,
        setColumns,
        drawGrid,
        setDrawGrid,
        aliveCells,
        setAliveCells,
      }}
    >
      {children}
    </GameControllerContext.Provider>
  );
};
