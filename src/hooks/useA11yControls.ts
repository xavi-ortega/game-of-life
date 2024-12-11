import { useGameController } from "./useGameController";
import { useEffect } from "react";

/**
 * Custom hook for handling accessibility keyboard controls in the application.
 *
 * This hook listens for specific keypress events and triggers appropriate game actions,
 * such as toggling the play/pause state when the space bar is pressed.
 * - **Space bar (" ")**: Toggles the play/pause state of the game.
 */
export function useA11yControls() {
  const { setPlaying } = useGameController();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ":
          setPlaying((playing) => !playing);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setPlaying]);
}
