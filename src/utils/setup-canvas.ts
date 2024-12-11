/**
 * Configures the canvas to match its display size, to ensure sharp rendering on high-DPI screens.
 *
 * @param canvas - The HTMLCanvasElement to configure.
 */
export function setupCanvas(canvas: HTMLCanvasElement) {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
