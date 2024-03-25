import { spawn } from 'child_process'

export interface SpawnResult {
  stdout: string
  stderr: string
}

export const spawnAsync = (
  command: string,
  args: string[],
  options: { cwd: string },
): Promise<SpawnResult> =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, options)
    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (data: Buffer) => {
      stdout += data.toString()
    })

    child.stderr.on('data', (data: Buffer) => {
      stderr += data.toString()
    })

    child.on('close', (code: number) => {
      if (code === 0) {
        resolve({ stdout, stderr })
      } else {
        reject(new Error(`Command failed with code ${code}: ${stderr}`))
      }
    })
  })

export const execAsyncCmd = async (
  command: string[],
  cwd: string = '.',
): Promise<SpawnResult> => {
  try {
    const cmd = command[0]
    const args = command.slice(1)
    const { stdout, stderr } = await spawnAsync(cmd, args, { cwd })
    return { stdout, stderr }
  } catch (error) {
    return {
      stdout: '',
      stderr: error instanceof Error ? error.message : String(error),
    }
  }
}
