import { calculateNextGeneration } from "./calculate-next-generation";

describe("calculateNextGeneration", () => {
  const rows = 4;
  const columns = 4;

  it("handles a single cell (it should die)", () => {
    const currentCells = new Map([["1,1", "green"]]);
    const nextGeneration = calculateNextGeneration(currentCells, rows, columns);
    expect(nextGeneration.size).toBe(0);
  });

  it("handles a simple birth (three neighbors with the most prevalent color)", () => {
    const currentCells = new Map([
      ["0,1", "red"],
      ["1,0", "blue"],
      ["1,1", "red"],
    ]);

    const nextGeneration = calculateNextGeneration(currentCells, rows, columns);

    expect(nextGeneration.has("0,0")).toBe(true); // Birth
    expect(nextGeneration.get("0,0")).toBe("red"); // Most prevalent color

    expect(nextGeneration.has("0,1")).toBe(true); // Survives
    expect(nextGeneration.get("0,1")).toBe("red"); // Keeps its color

    expect(nextGeneration.has("1,0")).toBe(true); // Survives
    expect(nextGeneration.get("1,0")).toBe("blue"); // Keeps its color

    expect(nextGeneration.has("1,1")).toBe(true); // Survives
    expect(nextGeneration.get("1,1")).toBe("red"); // Keeps its color
  });

  it("handles overpopulation (more than three neighbors)", () => {
    const currentCells = new Map([
      ["1,1", "red"],
      ["1,2", "blue"],
      ["2,1", "green"],
      ["2,2", "blue"],
      ["1,0", "red"],
    ]);

    const nextGeneration = calculateNextGeneration(currentCells, rows, columns);

    // Birth with most prevalent color
    expect(nextGeneration.has("0,1")).toBe(true);
    expect(nextGeneration.get("0,1")).toBe("red"); // Prevalent

    expect(nextGeneration.has("2,0")).toBe(true);
    expect(nextGeneration.get("2,0")).toBe("red"); // Prevalent

    // Death due to overpopulation
    expect(nextGeneration.has("1,1")).toBe(false);
    expect(nextGeneration.has("2,1")).toBe(false);

    // Survival
    expect(nextGeneration.has("1,0")).toBe(true);
    expect(nextGeneration.get("1,0")).toBe("red");

    expect(nextGeneration.has("1,2")).toBe(true);
    expect(nextGeneration.get("1,2")).toBe("blue");

    expect(nextGeneration.has("2,2")).toBe(true);
    expect(nextGeneration.get("2,2")).toBe("blue");
  });

  it("handles edge patterns like Blinker with colors", () => {
    const firstGeneration = new Map([
      ["0,1", "red"],
      ["1,1", "red"],
      ["2,1", "red"],
    ]);

    const secondGeneration = new Map([
      ["1,0", "red"],
      ["1,1", "red"],
      ["1,2", "red"],
    ]);

    expect(calculateNextGeneration(firstGeneration, rows, columns)).toEqual(
      secondGeneration,
    );

    expect(calculateNextGeneration(secondGeneration, rows, columns)).toEqual(
      firstGeneration,
    );
  });
});
