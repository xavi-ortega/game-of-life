import { extractNeighbors } from "./extract-neighbors";

describe("extractNeighbors", () => {
  it("should return neighbors of a cell", () => {
    const cells = new Map([
      ["1,1", "#FF0000"], // Center cell (red)
      ["1,2", "#00FF00"], // Right neighbor (green)
      ["2,1", "#0000FF"], // Bottom neighbor (blue)
    ]);
    const key = "1,1";

    const result = extractNeighbors(cells, key);

    const expected = new Map([
      ["1,2", "#00FF00"], // Green neighbor
      ["2,1", "#0000FF"], // Blue neighbor
    ]);
    expect(result).toEqual(expected);
  });

  it("should return an empty map if there are no neighbors", () => {
    const cells = new Map([
      ["1,1", "#FF0000"], // Center cell (red)
    ]);
    const key = "1,1";

    const result = extractNeighbors(cells, key);
    expect(result.size).toBe(0);
  });
});
