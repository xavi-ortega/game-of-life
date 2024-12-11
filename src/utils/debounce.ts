/**
 * Creates a debounced version of a function that delays its execution
 * until after a specified delay time has elapsed since the last time it was invoked.
 *
 * @typeParam TArgs - The arguments type of the function being debounced.
 * @typeParam TResult - The return type of the function being debounced.
 * @param func - The function to debounce.
 * @param delay - The delay in milliseconds for debouncing.
 * @returns A debounced version of the provided function.
 */
export function debounce<TArgs extends unknown[], TResult>(
  func: (...args: TArgs) => TResult,
  delay: number,
): (...args: TArgs) => void {
  let timeout: NodeJS.Timeout;

  return (...args: TArgs): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
