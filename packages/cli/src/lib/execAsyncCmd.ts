import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export const execAsyncCmd = async (command: string[], cwd = '.') => {
  try {
    const { stdout, stderr } = await execAsync(command.join(' '), {
      cwd,
    })
    return { stdout, stderr }
  } catch (error) {
    console.error('Error executing command:', error)
    return { stdout: '', stderr: String(error) }
  }
}
