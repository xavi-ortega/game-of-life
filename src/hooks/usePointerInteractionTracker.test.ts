import { type MouseEvent } from "react";
import { act, renderHook } from "@testing-library/react";
import { usePointerInteractionTracker } from "./usePointerInteractionTracker";
import { identifyCoordinateFromPosition } from "../utils/identify-coordinate-from-position";

jest.mock("../utils/identify-coordinate-from-position", () => ({
  identifyCoordinateFromPosition: jest.fn(),
}));

jest.mock("../utils/calculate-grid-dimensions", () => ({
  calculateGridDimensions: jest.fn(() => ({
    cellSize: 10,
    offsetX: 0,
    offsetY: 0,
  })),
}));

jest.mock("./useGameController", () => ({
  useGameController: jest.fn(() => ({
    rows: 10,
    columns: 10,
  })),
}));

const onCoordinateToggle = jest.fn();

const mockCanvas = document.createElement("canvas");

const mockMouseEvent = (clientX: number, clientY: number) => {
  return {
    currentTarget: mockCanvas,
    clientX,
    clientY,
    preventDefault: () => {
      //
    },
  } as MouseEvent<HTMLCanvasElement>;
};

describe("usePointerInteractionTracker", () => {
  afterEach(() => {
    onCoordinateToggle.mockClear();
  });

  it("should not toggle any coordinates initially", () => {
    renderHook(() =>
      usePointerInteractionTracker({
        onCoordinateToggle,
      }),
    );

    expect(onCoordinateToggle).not.toHaveBeenCalled();
  });

  it("should toggle the correct coordinate on mouse down", () => {
    jest.mocked(identifyCoordinateFromPosition).mockReturnValue("1,2");

    const { result } = renderHook(() =>
      usePointerInteractionTracker({
        onCoordinateToggle,
      }),
    );

    act(() => {
      result.current.handleMouseDown(mockMouseEvent(15, 25));
    });

    expect(onCoordinateToggle).toHaveBeenCalledTimes(1);
    expect(onCoordinateToggle).toHaveBeenCalledWith("1,2");
  });

  it("should toggle the correct coordinate on touch start", () => {
    jest.mocked(identifyCoordinateFromPosition).mockReturnValue("1,2");

    const { result } = renderHook(() =>
      usePointerInteractionTracker({
        onCoordinateToggle,
      }),
    );

    act(() => {
      result.current.handleTouchStart(mockMouseEvent(15, 25));
    });

    expect(onCoordinateToggle).toHaveBeenCalledTimes(1);
    expect(onCoordinateToggle).toHaveBeenCalledWith("1,2");
  });

  it("should not toggle any coordinates if not dragging", () => {
    const { result } = renderHook(() =>
      usePointerInteractionTracker({
        onCoordinateToggle,
      }),
    );

    act(() => {
      result.current.handleMouseMove(mockMouseEvent(15, 25));
    });

    expect(onCoordinateToggle).not.toHaveBeenCalled();
  });

  it("should toggle multiple coordinates during a drag interaction", () => {
    const mockCoordinates = ["1,2", "1,3", "2,3"];
    let callIndex = 0;

    jest
      .mocked(identifyCoordinateFromPosition)
      .mockImplementation(() => mockCoordinates[callIndex++]);

    const { result } = renderHook(() =>
      usePointerInteractionTracker({
        onCoordinateToggle,
      }),
    );

    act(() => {
      result.current.handleMouseDown(mockMouseEvent(15, 25));
      result.current.handleMouseMove(mockMouseEvent(25, 35));
      result.current.handleMouseMove(mockMouseEvent(35, 45));
    });

    expect(onCoordinateToggle).toHaveBeenCalledTimes(3);
    expect(onCoordinateToggle).toHaveBeenCalledWith("1,2");
    expect(onCoordinateToggle).toHaveBeenCalledWith("1,3");
    expect(onCoordinateToggle).toHaveBeenCalledWith("2,3");
  });

  it("should not toggle the same coordinate more than once during a drag", () => {
    jest.mocked(identifyCoordinateFromPosition).mockReturnValue("1,2");

    const { result } = renderHook(() =>
      usePointerInteractionTracker({
        onCoordinateToggle,
      }),
    );

    act(() => {
      result.current.handleMouseDown(mockMouseEvent(15, 25));
      result.current.handleMouseMove(mockMouseEvent(15, 25));
    });

    expect(onCoordinateToggle).toHaveBeenCalledTimes(1);
  });

  it("should reset visited coordinates after mouse up", () => {
    jest.mocked(identifyCoordinateFromPosition).mockReturnValue("1,2");

    const { result } = renderHook(() =>
      usePointerInteractionTracker({
        onCoordinateToggle,
      }),
    );

    act(() => {
      result.current.handleMouseDown(mockMouseEvent(15, 25));
      result.current.handleMouseMove(mockMouseEvent(25, 35));

      result.current.handleMouseUp(mockMouseEvent(25, 35));

      result.current.handleMouseMove(mockMouseEvent(25, 35));
    });

    expect(onCoordinateToggle).toHaveBeenCalledTimes(1); // No additional toggles after reset
  });
});
