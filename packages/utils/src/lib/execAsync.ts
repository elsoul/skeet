import { exec } from 'child_process'
import { promisify } from 'util'

const execAsyncCmd = promisify(exec)

/**
 * Asynchronously executes a shell command in a child process, optionally logs the output, and allows execution in a specific working directory.
 *
 * This function provides an async/await interface for executing shell commands using Node.js's `child_process.exec` method, simplified by `promisify`.
 * It executes the command provided as a string, captures stdout and stderr, and based on the `isLog` parameter, it may log these outputs to the console.
 *
 * @param command - A string representing the command and its arguments to be executed.
 * @param cwd - The current working directory in which the command should be executed. Defaults to '.'.
 * @param isLog - A boolean indicating whether to log stdout and stderr to the console. Defaults to true.
 * @returns A promise that resolves to an object containing `stdout` and `stderr` from the executed command. In case of execution error, `stdout` will be an empty string, and `stderr` will contain the error message.
 *
 * @example
 * // Example of executing a shell command
 * async function runCommand() {
 *   const command = 'ls -l';
 *   const cwd = '/usr';
 *   const isLog = true;
 *
 *   const { stdout, stderr } = await execAsync(command, cwd, isLog);
 *   // Outputs are logged based on the isLog parameter
 * }
 *
 * runCommand().catch(error => {
 *   console.error('Failed to execute command:', error);
 * });
 */

export const execAsync = async (command: string, cwd = '.', isLog = true) => {
  try {
    const { stdout, stderr } = await execAsyncCmd(command, {
      cwd,
    })
    if (isLog) console.log(stdout)
    if (stderr) {
      if (isLog) console.error(stderr)
    }
    return { stdout, stderr }
  } catch (error) {
    if (isLog) console.error('Error executing command:', error)
    return { stdout: '', stderr: String(error) }
  }
}
