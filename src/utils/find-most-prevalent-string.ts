/**
 * Finds the most prevalent (frequent) string in an array of strings.
 *
 * @param strings - The array of strings to search.
 * @returns The most prevalent string in the array. If the array is empty, returns `null`.
 */
export function findMostPrevalentString(strings: string[]) {
  if (strings.length === 0) {
    throw new Error("The array is empty");
  }

  const frequencyMap = new Map<string, number>();

  for (const str of strings) {
    const count = frequencyMap.get(str);

    if (count === undefined) {
      frequencyMap.set(str, 1);
    } else {
      // if frequency is greater than half of the array, the word is the most frequent without doubt
      if (count + 1 > strings.length / 2) {
        return str;
      }

      frequencyMap.set(str, count + 1);
    }
  }

  let mostPrevalent = "";
  let maxFrequency = 0;

  for (const [str, count] of frequencyMap) {
    if (count > maxFrequency) {
      mostPrevalent = str;
      maxFrequency = count;
    }
  }

  return mostPrevalent;
}
