import { access } from 'fs/promises'

/**
 * Asynchronously checks whether a file or directory exists at the specified path.
 *
 * @param path - The path to the file or directory to check.
 * @returns A promise that resolves to true if the file or directory exists, otherwise false.
 *
 * @example
 * // Example of how to use existsAsync to check if a file and a directory exist
 * const filePath = './path/to/your/file.txt';
 * const dirPath = './path/to/your/directory';
 *
 * async function checkExists() {
 *   const fileExists = await existsAsync(filePath);
 *   console.log(fileExists ? 'File exists.' : 'File does not exist.');
 *
 *   const dirExists = await existsAsync(dirPath);
 *   console.log(dirExists ? 'Directory exists.' : 'Directory does not exist.');
 * }
 *
 * checkExists().catch(error => {
 *   console.error('An error occurred:', error);
 * });
 */
export async function existsAsync(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}
