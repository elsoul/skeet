import { StdioOptions, spawnSync } from 'child_process'

export const execSyncCmd = (
  command: Array<string>,
  cwd: string = '.',
  stdio = 'inherit' as StdioOptions,
) => {
  spawnSync(command[0], command.slice(1), {
    cwd,
    stdio,
  })
}
