import { useEffect, useRef } from "react";
import { setupCanvas } from "../utils/setup-canvas";
import { calculateGridDimensions } from "../utils/calculate-grid-dimensions";
import { renderAliveCells } from "../utils/render-alive-cells";
import { useGameController } from "../hooks/useGameController";
import { renderGridLines } from "../utils/render-grid-lines";
import { usePointerInteractionTracker } from "../hooks/usePointerInteractionTracker";
import { getRandomColor } from "../utils/get-random-color";
import { extractNeighbors } from "../utils/extract-neighbors";
import { findMostPrevalentString } from "../utils/find-most-prevalent-string";
import "./Board.css";

export const Board = () => {
  const { rows, columns, drawGrid, aliveCells, setAliveCells } =
    useGameController();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    setupCanvas(canvas);

    const { cellSize, offsetX, offsetY, gridWidth, gridHeight } =
      calculateGridDimensions(canvas, rows, columns);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderAliveCells(ctx, offsetX, offsetY, cellSize, aliveCells.entries());

    if (drawGrid) {
      renderGridLines(
        ctx,
        cellSize,
        offsetX,
        offsetY,
        gridWidth,
        gridHeight,
        rows,
        columns,
      );
    }
  }, [aliveCells, drawGrid, rows, columns]);

  const handleCoordinateToggle = (key: string) => {
    const newCells = new Map(aliveCells);

    if (newCells.has(key)) {
      newCells.delete(key);
    } else {
      const neighbors = extractNeighbors(newCells, key);

      if (neighbors.size === 0) {
        newCells.set(key, getRandomColor());
      } else {
        const colors = Array.from(neighbors.values());

        newCells.set(key, findMostPrevalentString(colors));
      }
    }

    setAliveCells(newCells);
  };

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = usePointerInteractionTracker({
    onCoordinateToggle: handleCoordinateToggle,
  });

  return (
    <div className="board">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};
