import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export const execSyncCmd = async (command: string[], cwd = '.') => {
  try {
    const { stdout, stderr } = await execAsync(command.join(' '), {
      cwd,
    })
    console.log(stdout)
    if (stderr) {
      console.error(stderr)
    }
    return { stdout, stderr }
  } catch (error) {
    console.error('Error executing command:', error)
    return { stdout: '', stderr: String(error) }
  }
}
