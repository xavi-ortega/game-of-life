import { COLOR_PALETTE } from "../constants";

const usedColors = new Set<string>();

/**
 * Returns a random color from the `COLOR_PALETTE` array, ensuring that colors
 * are not repeated until all colors in the palette have been used.
 * Once all colors are used, it resets and starts cycling again.
 *
 * @returns A random color from the palette.
 */
export function getRandomColor(): string {
  if (usedColors.size === COLOR_PALETTE.length) {
    usedColors.clear();
  }

  const availableColors = COLOR_PALETTE.filter(
    (color) => !usedColors.has(color),
  );

  const randomColor =
    availableColors[Math.floor(Math.random() * availableColors.length)];

  usedColors.add(randomColor);

  return randomColor;
}

/**
 * @internal - only used for testing purposes
 */
export function _resetCache() {
  usedColors.clear();
}
