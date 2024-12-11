import { areGenerationsEqual } from "./are-generations-equal";

describe("areGenerationsEqual", () => {
  it("should return true for two empty generations", () => {
    const prevGeneration = new Map();
    const nextGeneration = new Map();

    expect(areGenerationsEqual(prevGeneration, nextGeneration)).toBe(true);
  });

  it("should return false if the size of the maps is differs", () => {
    const prevGeneration = new Map([["1,1", "#FF0000"]]);
    const nextGeneration = new Map([
      ["1,1", "#FF0000"],
      ["1,2", "#00FF00"],
    ]);

    expect(areGenerationsEqual(prevGeneration, nextGeneration)).toBe(false);
  });

  it("should return false if the keys are the same but the colors are different", () => {
    const prevGeneration = new Map([["1,1", "#FF0000"]]);
    const nextGeneration = new Map([["1,1", "#00FF00"]]);

    expect(areGenerationsEqual(prevGeneration, nextGeneration)).toBe(false);
  });

  it("should return true for generations with identical data", () => {
    const prevGeneration = new Map();
    const nextGeneration = new Map();

    for (let i = 0; i < 1000; i++) {
      const key = `${i},${i}`;
      prevGeneration.set(key, `#FF${i % 100}00`);
      nextGeneration.set(key, `#FF${i % 100}00`);
    }

    expect(areGenerationsEqual(prevGeneration, nextGeneration)).toBe(true);
  });

  it("should return false for generations with differing cells", () => {
    const prevGeneration = new Map();
    const nextGeneration = new Map();

    for (let i = 0; i < 1000; i++) {
      const key = `${i},${i}`;
      prevGeneration.set(key, `#FF${i % 100}00`);
      nextGeneration.set(key, `#FF${i % 100}00`);
    }

    // Change one value in nextGeneration
    nextGeneration.set("500,500", "#00FF00");

    expect(areGenerationsEqual(prevGeneration, nextGeneration)).toBe(false);
  });
});
