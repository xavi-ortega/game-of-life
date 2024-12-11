import { type MouseEvent } from "react";
import { CLOSE_SYMBOL } from "../constants";
import "./GuideModal.css";

export const GuideModal = ({ onClose }: { onClose: () => void }) => {
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    // check if the click is triggered in the backdrop and not in its child elements
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="backdrop" onClick={handleBackdropClick}>
      <summary>
        <button className="close-button" onClick={onClose} aria-label="Close">
          {CLOSE_SYMBOL}
        </button>
        <h2>How to play</h2>
        <ol>
          <li>Configure the board: Define the number of rows and columns.</li>
          <li>Toggle all cells you want to be alive by pressing or dragging</li>
          <li>Click the play button or press space</li>
          <li>
            Tweak the delay slider, in order to change the game's velocity. The
            less delay the more velocity
          </li>
        </ol>
      </summary>
    </div>
  );
};
