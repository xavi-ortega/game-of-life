import { obtainNeighbourRelations } from "./obtain-neighbour-relations";

describe("obtainNeighbourRelations", () => {
  it("should calculate neighbor colors for a single cell", () => {
    const currentCells = new Map([["1,1", "red"]]);
    const neighborColors = obtainNeighbourRelations(currentCells);

    const expectedColors = new Map([
      ["0,0", ["red"]],
      ["0,1", ["red"]],
      ["0,2", ["red"]],
      ["1,0", ["red"]],
      ["1,2", ["red"]],
      ["2,0", ["red"]],
      ["2,1", ["red"]],
      ["2,2", ["red"]],
    ]);

    expect(neighborColors).toEqual(expectedColors);
  });

  it("should handle multiple cells with different colors", () => {
    const currentCells = new Map([
      ["1,1", "red"],
      ["1,2", "blue"],
    ]);
    const neighborColors = obtainNeighbourRelations(currentCells);

    const expectedColors = new Map([
      ["0,0", ["red"]],
      ["0,1", ["red", "blue"]],
      ["0,2", ["red", "blue"]],
      ["0,3", ["blue"]],
      ["1,0", ["red"]],
      ["1,1", ["blue"]],
      ["1,2", ["red"]],
      ["1,3", ["blue"]],
      ["2,0", ["red"]],
      ["2,1", ["red", "blue"]],
      ["2,2", ["red", "blue"]],
      ["2,3", ["blue"]],
    ]);

    expect(neighborColors).toEqual(expectedColors);
  });

  it("should return an empty map for no alive cells", () => {
    const currentCells = new Map();
    const neighborColors = obtainNeighbourRelations(currentCells);
    expect(neighborColors.size).toBe(0);
  });
});
