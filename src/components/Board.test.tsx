import { act, render } from "@testing-library/react";
import { Board } from "./Board";
import { useGameController } from "../hooks/useGameController";
import { usePointerInteractionTracker } from "../hooks/usePointerInteractionTracker";
import { getRandomColor } from "../utils/get-random-color";

jest.mock("../utils/get-random-color", () => ({
  getRandomColor: jest.fn(),
}));

jest.mock("../hooks/useGameController", () => ({
  useGameController: jest.fn(),
}));

jest.mock("../hooks/usePointerInteractionTracker", () => ({
  usePointerInteractionTracker: jest.fn(() => ({
    handleMouseDown: jest.fn(),
    handleMouseMove: jest.fn(),
    handleMouseUp: jest.fn(),
    handleTouchStart: jest.fn(),
    handleTouchMove: jest.fn(),
    handleTouchEnd: jest.fn(),
  })),
}));

describe("Board Component", () => {
  const mockSetAliveCells = jest.fn();

  beforeEach(() => {
    HTMLCanvasElement.prototype.getContext = jest.fn();

    jest.mocked(useGameController).mockReturnValue({
      rows: 10,
      columns: 10,
      drawGrid: true,
      aliveCells: new Map([
        ["1,0", "#FF0000"],
        ["0,1", "#FF0000"],
        ["2,1", "#00FF00"],
      ]),
      setAliveCells: mockSetAliveCells,
    } as unknown as ReturnType<typeof useGameController>);

    render(<Board />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should remove a cell if it was alive", () => {
    const key = "1,0"; // This cell exists in the initial aliveCells state

    const { onCoordinateToggle } = jest.mocked(usePointerInteractionTracker)
      .mock.calls[0][0];

    act(() => {
      onCoordinateToggle(key);
    });

    expect(mockSetAliveCells).toHaveBeenCalledWith(
      new Map([
        ["0,1", "#FF0000"],
        ["2,1", "#00FF00"],
      ]),
    );
  });

  it("should add a new cell with a random color if no neighbors exist", () => {
    const key = "5,5"; // No neighbors
    jest.mocked(getRandomColor).mockReturnValue("purple");

    const { onCoordinateToggle } = jest.mocked(usePointerInteractionTracker)
      .mock.calls[0][0];

    act(() => {
      onCoordinateToggle(key);
    });

    expect(mockSetAliveCells).toHaveBeenCalled();

    const updatedMap = mockSetAliveCells.mock.calls[0][0];
    expect(updatedMap.get(key)).toBe("purple");
  });

  it("should add a new cell with the most prevalent color of the neighbors", () => {
    const key = "1,1"; // This cell has neighbors with colors

    const { onCoordinateToggle } = jest.mocked(usePointerInteractionTracker)
      .mock.calls[0][0];

    act(() => {
      onCoordinateToggle(key);
    });

    expect(mockSetAliveCells).toHaveBeenCalled();

    const updatedMap = mockSetAliveCells.mock.calls[0][0];
    expect(updatedMap.get(key)).toBe("#FF0000"); // Most prevalent color
  });
});
