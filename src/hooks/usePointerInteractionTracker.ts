import { type MouseEvent, type TouchEvent, useRef } from "react";
import { calculateGridDimensions } from "../utils/calculate-grid-dimensions";
import { identifyCoordinateFromPosition } from "../utils/identify-coordinate-from-position";
import { useGameController } from "./useGameController";

/**
 * Extracts the (x, y) coordinates from a `MouseEvent` or `TouchEvent`.
 *
 * @param event - the mouse or touch event
 */
function extractCoordinates(
  event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>,
): { x: number; y: number } {
  if ("touches" in event) {
    const touch = event.touches[0];
    return { x: touch.clientX, y: touch.clientY };
  } else {
    return { x: event.clientX, y: event.clientY };
  }
}

interface UsePointerInteractionTrackerProps {
  onCoordinateToggle: (key: string) => void;
}

/**
 * Hook for tracking mouse and touch interactions on a grid and triggering callbacks for coordinate toggles.
 * @param onCoordinateToggle - Callback triggered when a grid coordinate is toggled
 * @returns An object with event handlers for mouse and touch interactions.
 */
export function usePointerInteractionTracker({
  onCoordinateToggle,
}: UsePointerInteractionTrackerProps) {
  const visitedCoordinates = useRef(new Set<string>());
  const draggingRef = useRef(false);

  const { rows, columns } = useGameController();

  /**
   * Handles the `mousedown` or `touchstart` event, starting the drag interaction and processing the initial coordinate toggle.
   */
  const handleStart = (
    event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>,
  ) => {
    draggingRef.current = true;

    const { x, y } = extractCoordinates(event);
    processInteraction(x, y, event.currentTarget);
  };

  /**
   * Handles the `mousemove` or `touchmove` event, processing additional coordinate toggles during a drag interaction.
   */
  const handleMove = (
    event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!draggingRef.current) {
      return;
    }

    const { x, y } = extractCoordinates(event);
    processInteraction(x, y, event.currentTarget);
  };

  /**
   * Handles the `mouseup` or `touchend` event, ending the drag interaction.
   */
  const handleEnd = (
    event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>,
  ) => {
    if (event.cancelable) {
      event.preventDefault();
    }

    draggingRef.current = false;
    visitedCoordinates.current.clear();
  };

  /**
   * Processes interaction at a specific coordinate (x, y) on the canvas.
   */
  const processInteraction = (
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
  ) => {
    const rect = canvas.getBoundingClientRect();
    const { cellSize, offsetX, offsetY } = calculateGridDimensions(
      canvas,
      rows,
      columns,
    );

    const adjustedX = x - rect.left;
    const adjustedY = y - rect.top;

    const key = identifyCoordinateFromPosition(
      adjustedX,
      adjustedY,
      offsetX,
      offsetY,
      cellSize,
      rows,
      columns,
    );

    if (key !== undefined && !visitedCoordinates.current.has(key)) {
      visitedCoordinates.current.add(key);

      onCoordinateToggle(key);
    }
  };

  return {
    handleMouseDown: handleStart,
    handleMouseMove: handleMove,
    handleMouseUp: handleEnd,
    handleTouchStart: handleStart,
    handleTouchMove: handleMove,
    handleTouchEnd: handleEnd,
  };
}
