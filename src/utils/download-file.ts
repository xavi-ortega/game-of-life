/**
 * Triggers the download of a file using a Blob and a file name.
 *
 * @param blob - The Blob containing the file data.
 * @param name - The name of the file to be downloaded.
 */
export function downloadFile(blob: Blob, name: string) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
  URL.revokeObjectURL(link.href);
  link.remove();
}
