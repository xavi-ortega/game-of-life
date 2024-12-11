/**
 * Checks whether the given input is a string that can be safely converted to integer
 *
 * @param value - input to be evaluated
 * @returns boolean
 */
export function isValidInteger(value: unknown): value is string {
  try {
    if (typeof value !== "string") {
      return false;
    }

    const castedValue = parseInt(value);

    if (!isFinite(castedValue)) {
      return false;
    }

    const [valueIntegerPart] = value.split(".");

    // Covers the edge case were if the string starts with digits could be parsed as integer
    // e.g '12a' could be parsed as 12 with `parseInt`
    return castedValue.toString() === valueIntegerPart;
  } catch {
    return false;
  }
}
