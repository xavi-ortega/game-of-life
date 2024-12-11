/**
 * Reads the content of a file as a text string using the FileReader API.
 *
 * @param file - The `File` object to be read.
 * @returns A `Promise` that resolves with the file content as a string
 */
export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result;

      if (text) {
        resolve(text.toString());
      } else {
        reject();
      }
    };

    reader.readAsText(file);
  });
}
