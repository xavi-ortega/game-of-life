import { type ChangeEvent, useState } from "react";
import {
  COLLAPSE_SYMBOL,
  EXPAND_SYMBOL,
  LOAD_SYMBOL,
  MAX_DELAY,
  MIN_DELAY,
  PAUSE_SYMBOL,
  PLAY_SYMBOL,
  RESET_SYMBOL,
  SAVE_SYMBOL,
} from "../constants";
import { toast } from "react-toastify";
import { useGameController } from "../hooks/useGameController";
import { isValidInteger } from "../utils/is-valid-integer";
import {
  deserializeGameState,
  serializeGameState,
} from "../utils/game-snapshot-utils";
import { readFile } from "../utils/read-file";
import { debounce } from "../utils/debounce";
import { useA11yControls } from "../hooks/useA11yControls";
import { downloadFile } from "../utils/download-file";
import "./Controls.css";

const DEBOUNCE_DELAY = 500;

export const Controls = () => {
  const {
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
  } = useGameController();

  useA11yControls();

  const [rowsInputValue, setRowsInputValue] = useState(rows.toString());
  const [columnsInputValue, setColumnsInputValue] = useState(
    columns.toString(),
  );
  const [collapsed, setCollapsed] = useState(false);

  const setRowsDebounced = debounce((value: string) => {
    if (isValidInteger(value)) {
      const inputRows = parseInt(value);

      if (inputRows >= 3 && inputRows <= 1000) {
        setRows(parseInt(value));
        toast.dismiss();
      }
    } else {
      toast.error("Rows must be between 3 and 1000.");
    }
  }, DEBOUNCE_DELAY);

  const setColumnsDebounced = debounce((value: string) => {
    if (isValidInteger(value)) {
      const inputColumns = parseInt(value);

      if (inputColumns >= 3 && inputColumns <= 1000) {
        setColumns(parseInt(value));
        toast.dismiss();
      }
    } else {
      toast.error("Columns must be between 3 and 1000.");
    }
  }, DEBOUNCE_DELAY);

  const handleRowsInput = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsInputValue(event.target.value);
    setRowsDebounced(event.target.value);
  };

  const handleColumnsInput = (event: ChangeEvent<HTMLInputElement>) => {
    setColumnsInputValue(event.target.value);
    setColumnsDebounced(event.target.value);
  };

  const handlePlayPauseClick = () => {
    setPlaying((playing) => !playing);
  };

  const handleReset = () => {
    setAliveCells(new Map());
    setPlaying(false);
    toast.success("Board reset successfully!");
  };

  const handleSaveGame = () => {
    const json = serializeGameState({
      rows,
      columns,
      aliveCells: Array.from(aliveCells),
    });

    const blob = new Blob([json], { type: "application/json" });

    downloadFile(blob, "game-of-life.json");

    toast.success("Game saved successfully!");
  };

  const handleLoadGame = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      toast.error("No file selected!");
      return;
    }

    try {
      const rawData = await readFile(file);
      const gameState = deserializeGameState(rawData);

      setRows(gameState.rows);
      setRowsInputValue(gameState.rows.toString());
      setColumns(gameState.columns);
      setColumnsInputValue(gameState.columns.toString());
      setAliveCells(new Map(gameState.aliveCells));

      toast.success("Game loaded successfully!");
    } catch {
      toast.error("Invalid file format. Please upload a valid JSON file.");
    }

    event.target.value = "";
  };

  const handleDelayChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (isValidInteger(value) && parseInt(value) > 0) {
      setDelay(parseInt(value));
      toast.dismiss();
    } else {
      toast.error("Delay must be a positive integer.");
    }
  };

  const handleDrawGridChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDrawGrid(event.target.checked);
    toast.info(
      `Grid drawing ${event.target.checked ? "enabled" : "disabled"}.`,
    );
  };

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <aside className={collapsed ? "collapsed" : ""}>
      <button
        className="collapse-toggle"
        onClick={toggleCollapsed}
        title={collapsed ? "Hide controls" : "Show controls"}
      >
        {collapsed ? EXPAND_SYMBOL : COLLAPSE_SYMBOL}
      </button>
      <div className="navigation">
        <button
          onClick={handlePlayPauseClick}
          title={playing ? "Pause" : "Play"}
        >
          {playing ? PAUSE_SYMBOL : PLAY_SYMBOL}
        </button>
        <button onClick={handleReset} title="Reset">
          {RESET_SYMBOL}
        </button>
        <button onClick={handleSaveGame} title="Save game">
          {SAVE_SYMBOL}
        </button>
        <label className="button" title="Load game">
          {LOAD_SYMBOL}
          <input
            type="file"
            accept="application/json"
            onChange={handleLoadGame}
          />
        </label>
        <label title="Delay between rounds">
          Delay:
          <input
            type="range"
            min={MIN_DELAY}
            max={MAX_DELAY}
            step="100"
            value={delay}
            onChange={handleDelayChange}
          />
        </label>
        <label htmlFor="toggleGrid">
          Draw Grid
          <input
            id="toggleGrid"
            type="checkbox"
            checked={drawGrid}
            onChange={handleDrawGridChange}
          />
        </label>
        <div>
          <label htmlFor="rows">Rows:</label>
          <input
            id={"rows"}
            type="text"
            placeholder="Rows"
            value={rowsInputValue}
            onChange={handleRowsInput}
          />
        </div>

        <div>
          <label htmlFor="columns">Columns:</label>
          <input
            id={"columns"}
            type="text"
            placeholder="Columns"
            value={columnsInputValue}
            onChange={handleColumnsInput}
          />
        </div>
      </div>
    </aside>
  );
};
